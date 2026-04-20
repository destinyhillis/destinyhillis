/**
 * emoji-icons.js
 *
 * Maps common emojis to inline SVG markup using currentColor.
 * Used by the sync script to replace emojis from Google Docs
 * with styled icons that match the site aesthetic.
 *
 * All SVGs are 24x24 viewBox, rendered at 1em, using currentColor
 * so they inherit the surrounding text color via CSS.
 */

const SVG_ATTRS = 'class="content-icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const EMOJI_MAP = {
  // Nature / growth
  "🌱": `<svg ${SVG_ATTRS}><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12C12 7 7 4 3 5c0 4 2 8 9 7"/><path d="M12 12c0-5 5-8 9-7 0 4-2 8-9 7"/></svg>`,
  "🌿": `<svg ${SVG_ATTRS}><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12C12 7 7 4 3 5c0 4 2 8 9 7"/><path d="M12 12c0-5 5-8 9-7 0 4-2 8-9 7"/></svg>`,
  "🌲": `<svg ${SVG_ATTRS}><path d="M12 2L6 10h3l-2 6h3l-2 6h8l-2-6h3l-2-6h3z"/></svg>`,

  // Books / reading / writing
  "📖": `<svg ${SVG_ATTRS}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  "📚": `<svg ${SVG_ATTRS}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  "📕": `<svg ${SVG_ATTRS}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  "📝": `<svg ${SVG_ATTRS}><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  "✍️": `<svg ${SVG_ATTRS}><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  "✏️": `<svg ${SVG_ATTRS}><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,

  // Coffee / food / drink
  "☕": `<svg ${SVG_ATTRS}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`,
  "🍵": `<svg ${SVG_ATTRS}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/></svg>`,

  // Thinking / ideas
  "💡": `<svg ${SVG_ATTRS}><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>`,
  "🧠": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 0 20"/><path d="M12 2a7 7 0 0 1 0 20"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
  "🤔": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  "❓": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,

  // Stars / sparkle / magic
  "✨": `<svg ${SVG_ATTRS}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  "⭐": `<svg ${SVG_ATTRS}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  "🔮": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M12 2a14.5 14.5 0 0 1 0 20"/></svg>`,

  // Skull / moon / dark
  "💀": `<svg ${SVG_ATTRS}><circle cx="12" cy="10" r="8"/><path d="M12 18v4"/><path d="M8 22h8"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/><path d="M9 15h6"/></svg>`,
  "☠️": `<svg ${SVG_ATTRS}><circle cx="12" cy="10" r="8"/><path d="M12 18v4"/><path d="M8 22h8"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/><path d="M9 15h6"/></svg>`,
  "🌕": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>`,
  "🌑": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="10"/></svg>`,

  // Tools / tech
  "🔧": `<svg ${SVG_ATTRS}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  "🔗": `<svg ${SVG_ATTRS}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  "💻": `<svg ${SVG_ATTRS}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,

  // Music / art
  "🎵": `<svg ${SVG_ATTRS}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  "🎨": `<svg ${SVG_ATTRS}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.75 1.5-1.5 0-.4-.13-.76-.38-1.07-.24-.29-.38-.66-.38-1.07 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.5-9-10-9z"/></svg>`,

  // Heart / love
  "❤️": `<svg ${SVG_ATTRS}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  "💜": `<svg ${SVG_ATTRS}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,

  // Arrows / pointers
  "👉": `<svg ${SVG_ATTRS}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  "➡️": `<svg ${SVG_ATTRS}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,

  // Check / done
  "✅": `<svg ${SVG_ATTRS}><polyline points="20 6 9 17 4 12"/></svg>`,
  "✔️": `<svg ${SVG_ATTRS}><polyline points="20 6 9 17 4 12"/></svg>`,

  // Warning / alert
  "⚠️": `<svg ${SVG_ATTRS}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,

  // Location / map
  "📍": `<svg ${SVG_ATTRS}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,

  // Time / calendar
  "📅": `<svg ${SVG_ATTRS}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  "⏰": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,

  // Fire
  "🔥": `<svg ${SVG_ATTRS}><path d="M12 22c4-4 8-7.5 8-12a8 8 0 0 0-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="12" r="3"/></svg>`,

  // Mushroom
  "🍄": `<svg ${SVG_ATTRS}><path d="M12 2C6.5 2 2 6 2 11h20c0-5-4.5-9-10-9z"/><rect x="10" y="11" width="4" height="9" rx="1"/><line x1="8" y1="22" x2="16" y2="22"/></svg>`,

  // Dead tree
  "🌳": `<svg ${SVG_ATTRS}><path d="M12 22V8"/><path d="M8 22h8"/><path d="M12 8L6 3"/><path d="M12 8l6-3"/><path d="M12 12L7 8"/><path d="M12 12l5-4"/><path d="M12 16l-3-3"/><path d="M12 16l3-3"/></svg>`,
  "🪵": `<svg ${SVG_ATTRS}><path d="M12 22V8"/><path d="M8 22h8"/><path d="M12 8L6 3"/><path d="M12 8l6-3"/><path d="M12 12L7 8"/><path d="M12 12l5-4"/></svg>`,

  // Dog
  "🐕": `<svg ${SVG_ATTRS}><path d="M10 5.5C10 4.12 8.88 3 7.5 3S5 4.12 5 5.5V9h5V5.5z"/><path d="M14 5.5C14 4.12 15.12 3 16.5 3S19 4.12 19 5.5V9h-5V5.5z"/><rect x="5" y="9" width="14" height="8" rx="4"/><circle cx="9" cy="13" r="1" fill="currentColor"/><circle cx="15" cy="13" r="1" fill="currentColor"/><path d="M9 20l-1 2"/><path d="M15 20l1 2"/></svg>`,
  "🐶": `<svg ${SVG_ATTRS}><path d="M10 5.5C10 4.12 8.88 3 7.5 3S5 4.12 5 5.5V9h5V5.5z"/><path d="M14 5.5C14 4.12 15.12 3 16.5 3S19 4.12 19 5.5V9h-5V5.5z"/><rect x="5" y="9" width="14" height="8" rx="4"/><circle cx="9" cy="13" r="1" fill="currentColor"/><circle cx="15" cy="13" r="1" fill="currentColor"/><path d="M9 20l-1 2"/><path d="M15 20l1 2"/></svg>`,

  // Bat
  "🦇": `<svg ${SVG_ATTRS}><path d="M2 10c2-3 5-4 7-2l3 3 3-3c2-2 5-1 7 2"/><path d="M2 10c1 4 3 6 5 7l2-3"/><path d="M22 10c-1 4-3 6-5 7l-2-3"/><circle cx="10" cy="8" r="1" fill="currentColor"/><circle cx="14" cy="8" r="1" fill="currentColor"/></svg>`,

  // Raccoon
  "🦝": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="8"/><path d="M4 4l3 5"/><path d="M20 4l-3 5"/><ellipse cx="9" cy="11" rx="2.5" ry="2" fill="currentColor"/><ellipse cx="15" cy="11" rx="2.5" ry="2" fill="currentColor"/><circle cx="9" cy="11" r="1" stroke="var(--color-bg, #030d1a)" fill="var(--color-bg, #030d1a)"/><circle cx="15" cy="11" r="1" stroke="var(--color-bg, #030d1a)" fill="var(--color-bg, #030d1a)"/><ellipse cx="12" cy="15" rx="1.5" ry="1"/></svg>`,

  // Unicorn
  "🦄": `<svg ${SVG_ATTRS}><path d="M12 2l2 7"/><circle cx="12" cy="14" r="7"/><path d="M5 10c-1-2 0-4 0-4"/><path d="M19 10c1-2 0-4 0-4"/><circle cx="10" cy="13" r="1" fill="currentColor"/><path d="M9 17c1.5 1.5 4.5 1.5 6 0"/></svg>`,

  // Fountain pen
  "🖋️": `<svg ${SVG_ATTRS}><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>`,
  "✒️": `<svg ${SVG_ATTRS}><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>`,

  // Evil eye / nazar
  "🧿": `<svg ${SVG_ATTRS}><ellipse cx="12" cy="12" rx="10" ry="7"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`,
  "👁️": `<svg ${SVG_ATTRS}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>`,

  // Thought bubble
  "💭": `<svg ${SVG_ATTRS}><path d="M4 15c0 3.3 3.6 6 8 6 1.8 0 3.4-.4 4.8-1.1L21 21l-1.3-3.1C20.5 16.8 21 15.5 21 14c0-3.3-3.6-6-8-6H12C7.6 8 4 10.7 4 14v1z"/><circle cx="7" cy="6" r="1.5"/><circle cx="4" cy="3" r="1"/></svg>`,

  // Biohazard
  "☣️": `<svg ${SVG_ATTRS}><circle cx="12" cy="12" r="2"/><path d="M12 2a8.5 8.5 0 0 0-4 7.2 8.5 8.5 0 0 0 8 0A8.5 8.5 0 0 0 12 2z"/><path d="M4.93 19.07a8.5 8.5 0 0 0 4-7.2 8.5 8.5 0 0 0-7.46 3.6 8.5 8.5 0 0 0 3.46 3.6z"/><path d="M19.07 19.07a8.5 8.5 0 0 1-4-7.2 8.5 8.5 0 0 1 7.46 3.6 8.5 8.5 0 0 1-3.46 3.6z"/></svg>`,

  // Candle
  "🕯️": `<svg ${SVG_ATTRS}><rect x="9" y="10" width="6" height="12" rx="1"/><path d="M12 10V7"/><path d="M12 7c-1-2 0-4 0-5 0 1 1 3 0 5"/></svg>`,
};

/**
 * Replace emojis in a string with inline SVG markup.
 * Unrecognized emojis are left as-is.
 */
function replaceEmojis(text) {
  for (const [emoji, svg] of Object.entries(EMOJI_MAP)) {
    text = text.replaceAll(emoji, svg);
  }
  return text;
}

module.exports = { EMOJI_MAP, replaceEmojis };
