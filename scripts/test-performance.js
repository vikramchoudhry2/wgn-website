#!/usr/bin/env node

const http = require('http');

async function testServer() {
  console.log('🧪 Testing WeGotNext Performance...\n');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  };

  // Try different ports that Next.js might use
  const ports = [3000, 3001, 3002, 3003, 3004];
  
  for (const port of ports) {
    try {
      const testPort = { ...options, port };
      console.log(`🔍 Checking port ${port}...`);
      
      const response = await new Promise((resolve, reject) => {
        const req = http.request(testPort, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
        });
        
        req.on('error', reject);
        req.setTimeout(5000, () => reject(new Error('Timeout')));
        req.end();
      });
      
      if (response.status === 200) {
        console.log(`✅ Server running on port ${port}`);
        console.log(`📊 Response size: ${Math.round(response.data.length / 1024)}KB`);
        console.log(`🔧 Content-Type: ${response.headers['content-type']}`);
        
        // Check for optimization indicators
        const hasOptimizedImages = response.data.includes('_next/image');
        const hasWebP = response.data.includes('webp');
        const hasLazyLoading = response.data.includes('loading="lazy"');
        
        console.log('\n🚀 Optimization Status:');
        console.log(`   Image Optimization: ${hasOptimizedImages ? '✅' : '❌'}`);
        console.log(`   WebP Support: ${hasWebP ? '✅' : '❌'}`);
        console.log(`   Lazy Loading: ${hasLazyLoading ? '✅' : '❌'}`);
        
        console.log(`\n🌐 Visit: http://localhost:${port}`);
        return;
      }
    } catch (error) {
      console.log(`❌ Port ${port}: ${error.message}`);
    }
  }
  
  console.log('\n⚠️  No running server found. Please start with: npm run dev');
}

testServer().catch(console.error); 