#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(process.cwd(), 'public', 'assets');

function getFileSizeInMB(filepath) {
  const stats = fs.statSync(filepath);
  return stats.size / (1024 * 1024);
}

function analyzeImages() {
  console.log('🔍 Analyzing image files...\n');
  
  const imageFiles = [];
  const files = fs.readdirSync(assetsDir);
  
  files.forEach(file => {
    const filepath = path.join(assetsDir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
      const size = getFileSizeInMB(filepath);
      imageFiles.push({ file, size });
    }
  });
  
  // Sort by size (largest first)
  imageFiles.sort((a, b) => b.size - a.size);
  
  console.log('📊 Largest image files:');
  console.log('=====================');
  
  let totalSize = 0;
  const largeFiles = imageFiles.filter(img => img.size > 1); // Files larger than 1MB
  
  largeFiles.forEach((img, index) => {
    totalSize += img.size;
    console.log(`${index + 1}. ${img.file} - ${img.size.toFixed(2)}MB`);
  });
  
  console.log(`\n🚨 Total size of files >1MB: ${totalSize.toFixed(2)}MB`);
  console.log(`📈 Number of large files: ${largeFiles.length}`);
  
  if (largeFiles.length > 0) {
    console.log('\n💡 Recommendations:');
    console.log('- Convert large PNG files to WebP format');
    console.log('- Resize images to appropriate dimensions');
    console.log('- Use next/image with proper sizing');
    console.log('- Consider lazy loading for non-critical images');
    
    console.log('\n🛠️  Priority files to optimize:');
    largeFiles.slice(0, 5).forEach((img, index) => {
      console.log(`${index + 1}. ${img.file} (${img.size.toFixed(2)}MB)`);
    });
  }
}

analyzeImages(); 