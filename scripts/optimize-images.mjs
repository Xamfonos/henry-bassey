/**
 * One-off asset build for the story site.
 * Originals live outside the repo (the brief's uploads). Outputs are committed.
 * Run: node scripts/optimize-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const uploads = '/home/ubuntu/.cursor/projects/workspace/uploads';
const shots = '/tmp/gh-shots';
const root = path.resolve(import.meta.dirname, '..');
const pub = path.join(root, 'public/images');

async function ensure(dir) {
  await mkdir(dir, { recursive: true });
}

async function writeResponsive(input, outDir, name, widths, { trim = false } = {}) {
  await ensure(outDir);
  let pipeline = sharp(input, { failOn: 'none' }).rotate();
  if (trim) {
    const trimmed = await pipeline.trim({ threshold: 12 }).png().toBuffer();
    pipeline = sharp(trimmed);
  }
  const meta = await pipeline.metadata();
  const sources = [];
  for (const requested of widths) {
    const width = Math.min(requested, meta.width);
    if (sources.some((s) => s.w === width)) continue;
    const resized = pipeline.clone().resize({ width, withoutEnlargement: true });
    const avifInfo = await resized.clone().avif({ quality: 50, effort: 5 }).toFile(path.join(outDir, `${name}-${width}.avif`));
    const webpInfo = await resized.clone().webp({ quality: 78, effort: 5 }).toFile(path.join(outDir, `${name}-${width}.webp`));
    sources.push({ w: webpInfo.width, h: webpInfo.height, avif: avifInfo.size, webp: webpInfo.size });
  }
  sources.sort((a, b) => a.w - b.w);
  const largest = sources[sources.length - 1];
  return {
    src: `/images/${path.basename(outDir)}/${name}`,
    width: largest.w,
    height: largest.h,
    sources: sources.map(({ w, h }) => ({ w, h })),
    bytes: sources,
  };
}

async function ogImage(heroPath) {
  const out = path.join(pub, 'og');
  await ensure(out);
  const portrait = await sharp(heroPath)
    .trim({ threshold: 12 })
    .resize({ height: 560, fit: 'inside' })
    .png()
    .toBuffer();
  const pMeta = await sharp(portrait).metadata();
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f7f9fc"/>
  <text x="72" y="168" fill="#2455bc" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="2.4">HENRY BASSEY</text>
  <text x="72" y="268" fill="#162b47" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="600">Not just the marketing.</text>
  <text x="72" y="348" fill="#2455bc" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="600">The making.</text>
  <text x="72" y="430" fill="#637185" font-family="Inter, Arial, sans-serif" font-size="24">Developer marketing and AI automation.</text>
  <text x="72" y="468" fill="#637185" font-family="Inter, Arial, sans-serif" font-size="24">Consulting for teams worldwide.</text>
</svg>`;
  const x = 1200 - pMeta.width - 48;
  const y = Math.round((630 - pMeta.height) / 2);
  await sharp(Buffer.from(svg))
    .composite([{ input: portrait, left: Math.max(640, x), top: Math.max(0, y) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(out, 'henry-bassey.jpg'));
}

const images = {};

images.hero = await writeResponsive(
  path.join(uploads, 'hero-cutout-cropped_2e2c.png'),
  path.join(pub, 'hero'),
  'henry-builders-summit',
  [480, 800, 1200],
  { trim: true },
);

images.calculator = await writeResponsive(
  path.join(uploads, 'actian-vector-db-sizing-calculator_faa9.png'),
  path.join(pub, 'chapters'),
  'vector-calculator',
  [800, 1400],
);
images.memoryHub = await writeResponsive(
  path.join(shots, 'agent-memory-hub.png'),
  path.join(pub, 'chapters'),
  'agent-memory-hub',
  [800, 1400],
);
images.awesome = await writeResponsive(
  path.join(shots, 'awesome-selfhosted-ai.png'),
  path.join(pub, 'chapters'),
  'awesome-selfhosted-ai',
  [800, 1400],
);
images.rebrand = await writeResponsive(
  path.join(uploads, 'hackmamba-rebrand-post-full-cycle-growth-agency_5589.png'),
  path.join(pub, 'chapters'),
  'hackmamba-rebrand',
  [800, 1400],
);
images.writingSkill = await writeResponsive(
  path.join(shots, 'technical-writing-best-practices.png'),
  path.join(pub, 'chapters'),
  'writing-skill',
  [800, 1400],
);
images.walkon = await writeResponsive(
  path.join(uploads, 'builders-summit-walkon_aa16.jpg'),
  path.join(pub, 'speaking'),
  'walkon',
  [480, 900],
);
images.devrel = await writeResponsive(
  path.join(uploads, 'devrel-compass-panel-video-thumbnail_7d25.jpg'),
  path.join(pub, 'speaking'),
  'devrel-compass',
  [800, 1400],
);
images.reo = await writeResponsive(
  path.join(uploads, 'reo-devgtm-episode-youtube-thumbnail_984a.jpg'),
  path.join(pub, 'speaking'),
  'reo-dev',
  [640, 1280],
);
images.speakerCard = await writeResponsive(
  path.join(uploads, 'builders-summit-speaker-card-henry-bassey_194b.jpg'),
  path.join(pub, 'speaking'),
  'speaker-card',
  [640, 1080],
);

await ogImage(path.join(uploads, 'hero-cutout-cropped_2e2c.png'));

const manifest = Object.fromEntries(
  Object.entries(images).map(([key, value]) => [
    key,
    { src: value.src, width: value.width, height: value.height, sources: value.sources },
  ]),
);

await mkdir(path.join(root, 'src/data'), { recursive: true });
await writeFile(path.join(root, 'src/data/images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(images, null, 2));
