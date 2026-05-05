/**
 * Image Optimization Script
 *
 * Optimizes images in the public directory to reduce transfer size.
 *
 * Usage:
 *   1. Install sharp: npm install --save-dev sharp
 *   2. Run: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const IMAGES_TO_OPTIMIZE = ['logo.jpeg', 'pexels-1.jpg', 'pexels-2.jpg', 'hero1.png', 'hero2.png'];

const QUALITY = 85;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;

async function getFileSize(filePath) {
  const stats = await fs.promises.stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

async function optimizeImage(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skipping missing file: ${filename}`);
    return;
  }

  const ext = path.extname(filename).toLowerCase();
  const baseName = path.basename(filename, ext);
  const outputPath = path.join(PUBLIC_DIR, `${baseName}-opt.webp`);

  const inputSize = await getFileSize(inputPath);
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const pipeline = image.resize({
    width: metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined,
    height: metadata.height > MAX_HEIGHT ? MAX_HEIGHT : undefined,
    fit: 'inside',
    withoutEnlargement: true,
  });

  await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

  const outputSize = await getFileSize(outputPath);
  const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

  console.log(
    `\u2713 ${filename}: ${formatBytes(inputSize)} \u2192 ${formatBytes(outputSize)} (${savings}% smaller) \u2192 ${path.basename(outputPath)}`
  );
}

async function main() {
  console.log('Optimizing images in public/\n');
  for (const file of IMAGES_TO_OPTIMIZE) {
    try {
      await optimizeImage(file);
    } catch (err) {
      console.error(`✗ ${file}:`, err.message);
    }
  }
}

main();
