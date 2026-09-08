#!/usr/bin/env node
/**
 * build-images.mjs — responsive image derivatives for the Tien Yan static site.
 *
 * WHY THIS EXISTS
 * The site ships hand-written HTML with no bundler, so nothing generates image
 * variants for us. Before this script the homepage shipped a 3.87 MB JPEG into a
 * 737 CSS px box. This turns that into a declared, repeatable step.
 *
 * CONTRACT
 *   node tools/build-images.mjs           regenerate anything stale
 *   node tools/build-images.mjs --check   verify only; non-zero exit if stale (CI)
 *   node tools/build-images.mjs --force   rebuild everything
 *
 * OUTPUT NAMING
 *   <out>-<width>.avif and <out>-<width>.webp, following the convention already
 *   set by assets/figma/hero-bg-1280.webp. The original source file stays in the
 *   repo as the <img src> fallback and as the master for future re-runs.
 *
 * ON THE WIDTH LADDERS
 * Widths are NOT guesses. Each entry records the CSS px the image actually
 * renders at, derived from css/*.css, and the ladder covers 1x and 2x of that.
 * If a layout changes, the note is the thing to re-check. Never add a width
 * larger than the source — upscaling invents detail and inflates bytes.
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* --------------------------------------------------------------------------
   MANIFEST
   -------------------------------------------------------------------------- */

const MANIFEST = [
  {
    src: 'assets/figma/heritage-reference.jpg',
    out: 'assets/figma/heritage-facility',
    widths: [768, 1152, 1536],
    note:
      'index.html "Trusted Heritage". .home-heritage__art is 633fr of a 1132fr ' +
      'grid inside a 1200px .page-wrap, and the img is width:117% of that box ' +
      '=> ~737 CSS px on desktop. 1536 covers 2x; 768 covers 1x and small ' +
      'screens where the grid collapses to one column.',
  },
  {
    src: 'assets/figma/partnership/hero-reference.jpg',
    out: 'assets/figma/partnership/hero-photo',
    widths: [640, 960, 1200],
    note:
      'partnership.html masthead. .pt-hero__photo is aspect 676/505 and the img ' +
      'is width:111.42% => ~753 CSS px on desktop. The source is only 1200px ' +
      'wide, so 1200 is the ceiling: 2x is not achievable without upscaling.',
  },
  {
    src: 'assets/figma/story/characteristics-colour.jpg',
    out: 'assets/figma/story/characteristics-colour',
    widths: [448, 672, 896],
    note:
      'our-story.html "Characteristics of High Quality Bird\'s Nest". ' +
      '.trait__photo is capped at max-width:282px and the img is width:150.56% ' +
      '=> ~425 CSS px, and the cap means it never grows past that on any ' +
      'viewport. 896 covers 2x. This source was 954 KB for a 282px box.',
  },

  /* The enquiry-card icons. 200 CSS px decorative marks that shipped as
     full-resolution PNG exports - gifting.png was 3815x4096 for a 200px box.
     A previous pass generated ic-*.webp at exactly 200px but never wired them
     up; those are superseded by these.

     pricing.png is deliberately ABSENT. It is already 444x380 at 8 KB - flat
     artwork with an alpha channel, which PNG encodes better than lossy AVIF or
     WebP do. Running it through here produced a 12 KB AVIF and a 20 KB WebP,
     i.e. the pipeline made it worse. It ships as-is. The "no gain" guard below
     is what caught that, and will catch the next one. */
  ...['catalogue', 'custom', 'gifting', 'collaboration'].map((name) => ({
    src: `assets/figma/contact/${name}.png`,
    out: `assets/figma/contact/${name}`,
    widths: [160, 240],
    note:
      'contact.html enquiry cards. NOTE the markup declares width="200" but ' +
      'that is not the render size: css/pages.css .speak-card__icon sets ' +
      'width:5rem;height:5rem;object-fit:contain, so the box is 80 CSS px (56px ' +
      'below 40rem). The ladder is therefore 2x and 3x of 80, not of 200. ' +
      'Decorative (alt="", aria-hidden) so these are never the LCP element.',
  })),
];

/* --------------------------------------------------------------------------
   ENCODER SETTINGS
   Quality chosen per format, not shared. AVIF holds detail at a lower number
   than WebP does, so matching the two would overpay for WebP.
   -------------------------------------------------------------------------- */

const FORMATS = {
  avif: { ext: 'avif', options: { quality: 50, effort: 6, chromaSubsampling: '4:2:0' } },
  webp: { ext: 'webp', options: { quality: 78, effort: 5 } },
};

/* -------------------------------------------------------------------------- */

const args = new Set(process.argv.slice(2));
const CHECK = args.has('--check');
const FORCE = args.has('--force');

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const sizeOf = async (p) => (existsSync(p) ? (await stat(p)).size : 0);

/** Rebuild when the output is missing or older than its source. */
async function isStale(srcAbs, outAbs) {
  if (FORCE) return true;
  if (!existsSync(outAbs)) return true;
  const [s, o] = await Promise.all([stat(srcAbs), stat(outAbs)]);
  return s.mtimeMs > o.mtimeMs;
}

async function run() {
  let built = 0;
  let stale = 0;
  let sourceBytes = 0;
  let derivedBytes = 0;
  const problems = [];

  for (const entry of MANIFEST) {
    const srcAbs = path.join(ROOT, entry.src);

    if (!existsSync(srcAbs)) {
      problems.push(`missing source: ${entry.src}`);
      continue;
    }

    const meta = await sharp(srcAbs).metadata();
    const srcBytes = await sizeOf(srcAbs);
    sourceBytes += srcBytes;

    // Guard the rule the manifest states: never upscale.
    const widths = entry.widths.filter((w) => {
      if (w > meta.width) {
        problems.push(
          `${entry.src}: requested ${w}w but source is only ${meta.width}w — skipped (would upscale)`
        );
        return false;
      }
      return true;
    });

    await mkdir(path.dirname(path.join(ROOT, entry.out)), { recursive: true });

    for (const width of widths) {
      for (const [name, fmt] of Object.entries(FORMATS)) {
        const rel = `${entry.out}-${width}.${fmt.ext}`;
        const outAbs = path.join(ROOT, rel);

        if (await isStale(srcAbs, outAbs)) {
          stale++;
          if (CHECK) {
            problems.push(`stale or missing: ${rel}`);
            continue;
          }
          await sharp(srcAbs)
            .resize({ width, withoutEnlargement: true })
            [name](fmt.options)
            .toFile(outAbs);
          built++;
          console.log(`  built  ${rel}  ${kb(await sizeOf(outAbs))}`);
        }

        const outBytes = await sizeOf(outAbs);

        /* NO-GAIN GUARD.
           A derivative that is not smaller than its source is a regression: we
           would be shipping more bytes AND a second file to maintain. It
           happens with flat artwork that has an alpha channel, where PNG beats
           lossy codecs. Surface it loudly rather than let it ship. */
        if (outBytes >= srcBytes) {
          problems.push(
            `no gain: ${rel} is ${kb(outBytes)} but the source ${entry.src} is ` +
              `only ${kb(srcBytes)} — drop this entry from the manifest and ship the source`
          );
        }

        derivedBytes += outBytes;
      }
    }
  }

  console.log('');
  if (CHECK) {
    if (problems.length) {
      console.error('Image derivatives are not up to date:\n');
      for (const p of problems) console.error(`  - ${p}`);
      console.error(`\nRun: npm run images`);
      process.exit(1);
    }
    console.log('All image derivatives are current.');
    return;
  }

  for (const p of problems) console.warn(`  warn   ${p}`);
  console.log(
    `${built} file(s) written from ${MANIFEST.length} source(s).\n` +
      `Sources total ${kb(sourceBytes)}; the full derivative set totals ${kb(derivedBytes)}.\n` +
      `A browser downloads exactly one derivative per image, not the set.`
  );
  if (!built && !stale) console.log('Everything was already current.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
