// scripts/generate-gallery.js
// Auto-generates the gallery grid in gallery.html from the images/gallery/<category> folders.
// Runs automatically during the Netlify build (see netlify.toml). To add new photos to the
// live gallery, just drop image files into the correct category folder below and commit/push -
// no HTML editing required. Optionally add a friendly alt-text entry to
// images/gallery/gallery-meta.json (key: "<category>/<filename>") for better accessibility/SEO.
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GALLERY_DIR = path.join(ROOT, 'images', 'gallery');
const GALLERY_HTML = path.join(ROOT, 'gallery.html');
const META_FILE = path.join(GALLERY_DIR, 'gallery-meta.json');

// Category slugs must match the data-filter values of the buttons in gallery.html.
const CATEGORIES = [
  { slug: 'cruises', label: 'Cruises' },
  { slug: 'luxury-escapes', label: 'Luxury Escapes' },
  { slug: 'group-travel', label: 'Group Travel' },
  { slug: 'family-trips-weddings', label: 'Family Trips &amp; Weddings' },
  { slug: 'adventure', label: 'Adventure' }
];

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function titleCaseFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  if (/^[a-z0-9-]+$/i.test(base) && base.includes('-')) {
    return base.split('-').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
  }
  return null;
}

function encodePath(category, filename) {
  return 'images/gallery/' + category + '/' + filename.split('/').map(encodeURIComponent).join('/');
}

let meta = {};
if (fs.existsSync(META_FILE)) {
  try {
    meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
  } catch (e) {
    console.warn('Could not parse gallery-meta.json, continuing without overrides:', e.message);
  }
}

let itemsHtml = '';
let count = 0;
for (const cat of CATEGORIES) {
  const dir = path.join(GALLERY_DIR, cat.slug);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir)
    .filter(function (f) { return IMAGE_EXTS.indexOf(path.extname(f).toLowerCase()) !== -1; })
    .sort();
  for (const file of files) {
    const key = cat.slug + '/' + file;
    const override = meta[key] && meta[key].alt;
    const alt = override || titleCaseFromFilename(file) || (cat.label.replace('&amp;', '&') + ' photo');
    const src = encodePath(cat.slug, file);
    itemsHtml += '<div class="gallery-item" data-category="' + cat.slug + '"><img src="' + src + '" alt="' + escapeHtml(alt) + '" loading="lazy"><span class="gallery-caption">' + cat.label + '</span></div>\n';
    count++;
  }
}

let html = fs.readFileSync(GALLERY_HTML, 'utf8');
const startMarker = '<!-- GALLERY-ITEMS-START -->';
const endMarker = '<!-- GALLERY-ITEMS-END -->';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
  console.error('Gallery markers not found in gallery.html - skipping gallery generation.');
  process.exit(1);
}

const before = html.substring(0, startIdx + startMarker.length);
const after = html.substring(endIdx);
html = before + '\n' + itemsHtml + after;

fs.writeFileSync(GALLERY_HTML, html);
console.log('Gallery generated: ' + count + ' image(s) written into gallery.html.');
