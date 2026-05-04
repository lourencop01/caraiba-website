/**
 * Image Optimization Script
 * 
 * This script optimizes large images in the public directory to reduce
 * Fast Origin Transfer usage on Vercel.
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

// Images to optimize (focusing on images over 300KB)
const IMAGES_TO_OPTIMIZE = [
  'women-balayage-lisbon.webp',          // 1.5MB - CRITICAL
  'female-hairdresser-italian.webp',     // 470KB - HIGH
  'male-hairdresser-lisbon.webp',        // 367KB - MEDIUM
  'woman-hairdresser-highlights.webp',   // 374KB - MEDIUM
  'women-bob-wavy-haircut.webp',         // 341KB - MEDIUM
  'female-hairdresser-lisbon.webp',      // 330KB - MEDIUM
  'bixie-haircut-women.webp',            // 122KB
  'woman-keratin-treatment.webp',        // 94KB
  'women-balayage-haircut.webp',         // 83KB
  'women-blonde-coloring.webp',          // 78KB
  'women-braids-hairdresser.webp',       // 81KB
  'women-bride-hairdresser.webp',        // 83KB
  'women-famous-hairdresser.webp',       // 83KB
];

// Optimization settings
const QUALITY = 85; // WebP quality (80-90 is good balance)
const MAX_WIDTH = 1920; // Maximum width in pixels
const MAX_HEIGHT = 1920; // Maximum height in pixels

async function getFileSize(filePath) {
  const stats = await fs.promises.stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function optimizeImage(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const backupPath = path.join(PUBLIC_DIR, `${filename}.backup`);
  const tempPath = path.join(PUBLIC_DIR, `${filename}.temp`);

  try {
    // Check if file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${filename} - file not found`);
      return;
    }

    // Get original size
    const originalSize = await getFileSize(inputPath);

    // Create backup
    await fs.promises.copyFile(inputPath, backupPath);

    // Optimize image
    await sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: QUALITY,
        effort: 6, // 0-6, higher = better compression but slower
      })
      .toFile(tempPath);

    // Get optimized size
    const optimizedSize = await getFileSize(tempPath);
    const savings = ((originalSize - optimizedSize) / originalSize) * 100;

    // Only replace if we achieved meaningful compression
    if (optimizedSize < originalSize) {
      await fs.promises.rename(tempPath, inputPath);
      console.log(
        `✅ ${filename}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings.toFixed(1)}% smaller)`
      );
    } else {
      // Optimized version is larger, keep original
      await fs.promises.unlink(tempPath);
      console.log(
        `ℹ️  ${filename}: Already optimized (${formatBytes(originalSize)})`
      );
    }

    // Remove backup
    await fs.promises.unlink(backupPath);
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);

    // Restore from backup if it exists
    if (fs.existsSync(backupPath)) {
      await fs.promises.copyFile(backupPath, inputPath);
      await fs.promises.unlink(backupPath);
    }

    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      await fs.promises.unlink(tempPath);
    }
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log(`Quality: ${QUALITY}`);
  console.log(`Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}px\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const filename of IMAGES_TO_OPTIMIZE) {
    const inputPath = path.join(PUBLIC_DIR, filename);
    if (fs.existsSync(inputPath)) {
      const originalSize = await getFileSize(inputPath);
      totalOriginalSize += originalSize;

      await optimizeImage(filename);

      if (fs.existsSync(inputPath)) {
        const optimizedSize = await getFileSize(inputPath);
        totalOptimizedSize += optimizedSize;
      }
    }
  }

  const totalSavings =
    ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100;

  console.log('\n📊 Summary:');
  console.log(`Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`Total optimized size: ${formatBytes(totalOptimizedSize)}`);
  console.log(
    `Total savings: ${formatBytes(totalOriginalSize - totalOptimizedSize)} (${totalSavings.toFixed(1)}%)`
  );
  console.log('\n✨ Optimization complete!');
  console.log(
    '\n💡 Tip: Commit these optimized images to reduce Vercel Fast Origin Transfer usage.'
  );
}

main().catch(console.error);

