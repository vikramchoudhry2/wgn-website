#!/usr/bin/env node

/**
 * Image Optimization Script for WeGotNext
 * 
 * This script helps convert large PNG/JPG files to optimized WebP format
 * to improve website loading performance.
 * 
 * Usage:
 * npm install -g sharp-cli
 * node scripts/image-converter.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const assetsDir = path.join(__dirname, '..', 'public', 'assets');
const outputDir = path.join(assetsDir, 'optimized');

// Priority files to convert (largest impact)
const priorityFiles = [
  'ASGposter.png',
  'SACSJ.png', 
  'wgn-dono.png',
  'wgn18-chip.png',
  'black-asg.png',
  'blackstars.png',
  'dono1.png',
  'celebs.png',
  'wgn-white-celebs.png',
  'our-story.jpg'
];

function checkSharpCli() {
  try {
    execSync('sharp --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.log('❌ sharp-cli not found. Installing...');
    try {
      execSync('npm install -g sharp-cli', { stdio: 'inherit' });
      return true;
    } catch (installError) {
      console.log('❌ Failed to install sharp-cli. Please install manually:');
      console.log('npm install -g sharp-cli');
      return false;
    }
  }
}

function createOutputDir() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('✅ Created optimized assets directory');
  }
}

function getFileSizeInMB(filepath) {
  const stats = fs.statSync(filepath);
  return stats.size / (1024 * 1024);
}

function convertImage(filename, maxWidth = 1920, quality = 85) {
  const inputPath = path.join(assetsDir, filename);
  const outputPath = path.join(outputDir, filename.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  File not found: ${filename}`);
    return false;
  }
  
  const originalSize = getFileSizeInMB(inputPath);
  
  try {
    const command = `sharp -i "${inputPath}" -o "${outputPath}" -f webp -q ${quality} resize ${maxWidth}`;
    execSync(command, { stdio: 'pipe' });
    
    const newSize = getFileSizeInMB(outputPath);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${filename} → ${path.basename(outputPath)}`);
    console.log(`   ${originalSize.toFixed(2)}MB → ${newSize.toFixed(2)}MB (${savings}% smaller)`);
    
    return true;
  } catch (error) {
    console.log(`❌ Failed to convert ${filename}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🚀 WeGotNext Image Optimization\n');
  
  // Check dependencies
  if (!checkSharpCli()) {
    process.exit(1);
  }
  
  // Create output directory
  createOutputDir();
  
  console.log('📸 Converting priority images to WebP...\n');
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let successCount = 0;
  
  priorityFiles.forEach(filename => {
    const inputPath = path.join(assetsDir, filename);
    
    if (fs.existsSync(inputPath)) {
      const originalSize = getFileSizeInMB(inputPath);
      totalOriginal += originalSize;
      
      if (convertImage(filename)) {
        const optimizedPath = path.join(outputDir, filename.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        const optimizedSize = getFileSizeInMB(optimizedPath);
        totalOptimized += optimizedSize;
        successCount++;
      }
    } else {
      console.log(`⚠️  Skipping ${filename} (not found)`);
    }
  });
  
  console.log('\n📊 Summary:');
  console.log('==========');
  console.log(`✅ Successfully converted: ${successCount}/${priorityFiles.length} files`);
  console.log(`📉 Total size reduction: ${totalOriginal.toFixed(2)}MB → ${totalOptimized.toFixed(2)}MB`);
  console.log(`💾 Space saved: ${(totalOriginal - totalOptimized).toFixed(2)}MB (${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%)`);
  
  console.log('\n🔧 Next Steps:');
  console.log('1. Update your components to use the optimized images from /assets/optimized/');
  console.log('2. Test the website to ensure images load correctly');
  console.log('3. Remove original files once confirmed working');
  console.log('4. Run npm run dev to see performance improvements');
  
  console.log('\n💡 Pro Tip: Use Next.js Image component with these optimized files for best performance!');
}

if (require.main === module) {
  main();
}

module.exports = { convertImage, priorityFiles };
