/**
 * deploy.js
 *
 * Uploads the _site/ directory to Namecheap shared hosting via FTP.
 *
 * Required environment variables:
 *   FTP_HOST     — e.g. ftp.yourdomain.com
 *   FTP_USER     — FTP username
 *   FTP_PASSWORD  — FTP password
 *   FTP_REMOTE_DIR — remote directory, e.g. /public_html
 */

require("dotenv").config();
const ftp = require("basic-ftp");
const path = require("path");

const LOCAL_DIR = path.resolve(__dirname, "../_site");

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true,
      secureOptions: { rejectUnauthorized: false },
    });

    const remoteDir = process.env.FTP_REMOTE_DIR || "/";

    console.log(`Uploading ${LOCAL_DIR} → ${remoteDir}`);

    await client.cd(remoteDir);
    await client.uploadFromDir(LOCAL_DIR);

    console.log("Deploy complete.");
  } catch (err) {
    console.error("Deploy failed:", err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
