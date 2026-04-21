/**
 * sync-google-docs.js
 *
 * Fetches documents from a Google Drive "Publish" folder, converts them to
 * Markdown with frontmatter, and saves them into the Eleventy content folders.
 *
 * Required environment variables:
 *   GOOGLE_CLIENT_EMAIL  — service account email
 *   GOOGLE_PRIVATE_KEY   — service account private key (PEM, with \n)
 *   GOOGLE_DRIVE_FOLDER_ID — ID of the top-level "Publish" folder in Drive
 *
 * Expected Drive folder layout:
 *   Publish/
 *     Notes/    → maps to src/content/notes/
 *     Collections/ → maps to src/content/collections/
 */

require("dotenv").config();
const { google } = require("googleapis");
const TurndownService = require("turndown");
const fs = require("fs");
const path = require("path");
const { replaceEmojis } = require("./emoji-icons");

const CONTENT_DIR = path.resolve(__dirname, "../src/content");
const MANIFEST_PATH = path.resolve(__dirname, "../src/data/sync-manifest.json");

// --- Manifest (tracks Google Doc ID → local file path) ---
function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function saveManifest(manifest) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

// --- Auth ---
function normalizePrivateKey(raw) {
  if (!raw) return raw;

  let key = raw.trim();

  // Strip wrapping quotes if the secret was pasted with them
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }

  // Convert escaped newlines to real newlines
  key = key.replace(/\\n/g, "\n");

  // If it doesn't look like a PEM block, assume base64 and decode
  if (!key.includes("BEGIN PRIVATE KEY")) {
    try {
      const decoded = Buffer.from(key, "base64").toString("utf8");
      if (decoded.includes("BEGIN PRIVATE KEY")) key = decoded;
    } catch {
      // leave as-is
    }
  }

  return key;
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/documents.readonly",
    ],
  });
}

// --- Helpers ---
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildFrontmatter(title, type, date) {
  const tags = [];
  return [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    `type: ${type}`,
    `tags: [${tags.join(", ")}]`,
    `summary: ""`,
    `visibility: public`,
    `layout: ${type === "collection" ? "collection" : type === "note" ? "note" : "page"}.njk`,
    type === "note"
      ? `permalink: /garden/${slugify(title)}/`
      : type === "collection"
        ? `permalink: /collections/${slugify(title)}/`
        : undefined,
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");
}

// --- Main ---
async function main() {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  const docs = google.docs({ version: "v1", auth });
  const turndown = new TurndownService({ headingStyle: "atx" });
  const manifest = loadManifest();

  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) {
    console.error("Missing GOOGLE_DRIVE_FOLDER_ID");
    process.exit(1);
  }
  if (rootFolderId.trim() === "." || rootFolderId.trim() === "/") {
    console.error(`Invalid GOOGLE_DRIVE_FOLDER_ID value: "${rootFolderId}"`);
    process.exit(1);
  }

  // Discover sub-folders (Notes, Collections)
  let foldersRes;
  try {
    foldersRes = await drive.files.list({
      q: `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id, name)",
    });
  } catch (err) {
    console.error("Failed to list publish subfolders.");
    console.error("GOOGLE_DRIVE_FOLDER_ID:", rootFolderId);
    console.error("Drive error:", err?.response?.data || err?.message || err);
    process.exit(1);
  }

  const folderMap = {};
  for (const f of foldersRes.data.files) {
    folderMap[f.name.toLowerCase()] = f.id;
  }

  console.log("Found publish folders:", Object.keys(folderMap).join(", "));
  if (Object.keys(folderMap).length === 0) {
    console.error(
      "No subfolders found under the publish folder. Expected at least Notes/ and Collections/."
    );
    console.error(
      "Check that the folder ID is correct and the service account has access."
    );
    process.exit(1);
  }

  const syncedDocIds = new Set();

  // Process each folder
  for (const [folderName, folderId] of Object.entries(folderMap)) {
    const docsRes = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.document' and trashed = false`,
      fields: "files(id, name, modifiedTime)",
    });

    for (const file of docsRes.data.files) {
      console.log(`Processing: ${folderName}/${file.name}`);

      // Export as HTML
      const exportRes = await drive.files.export({
        fileId: file.id,
        mimeType: "text/html",
      });

      // Convert HTML → Markdown, then replace emojis with SVG icons
      const markdown = replaceEmojis(turndown.turndown(exportRes.data));
      const date = file.modifiedTime.split("T")[0];

      // Determine type + output path
      let type, outputPath;

      if (folderName === "notes") {
        type = "note";
        outputPath = path.join(CONTENT_DIR, "notes", `${slugify(file.name)}.md`);
      } else if (folderName === "collections") {
        type = "collection";
        outputPath = path.join(CONTENT_DIR, "collections", `${slugify(file.name)}.md`);
      } else {
        console.log(`  ⚠ Unknown folder "${folderName}", skipping.`);
        continue;
      }

      // Dedupe: if this doc ID was previously synced to a different file, remove the old one
      const prev = manifest[file.id];
      if (prev && prev.path !== outputPath && fs.existsSync(prev.path)) {
        console.log(`  ⟳ Title changed, removing old file: ${prev.path}`);
        fs.unlinkSync(prev.path);
      }

      const frontmatter = buildFrontmatter(file.name, type, date);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, frontmatter + markdown + "\n", "utf-8");
      console.log(`  → Wrote ${outputPath}`);

      // Update manifest
      manifest[file.id] = { path: outputPath, title: file.name, type };
      syncedDocIds.add(file.id);
    }
  }

  // Remove local files for docs that are no longer in Drive
  for (const [docId, entry] of Object.entries(manifest)) {
    if (!syncedDocIds.has(docId)) {
      if (fs.existsSync(entry.path)) {
        console.log(`  ✕ Removed (no longer in Drive): ${entry.path}`);
        fs.unlinkSync(entry.path);
      }
      delete manifest[docId];
    }
  }

  saveManifest(manifest);
  console.log("\nSync complete.");
}

main().catch((err) => {
  const status = err?.code || err?.response?.status;
  const details = err?.errors || err?.response?.data || err?.message;

  console.error("Sync failed:", {
    status,
    message: err?.message,
    details,
    hint:
      "Check GOOGLE_DRIVE_FOLDER_ID is the correct Drive folder ID and that the folder is shared with GOOGLE_CLIENT_EMAIL (service account).",
  });

  process.exit(1);
});
