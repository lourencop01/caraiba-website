import { generateSitemap } from './generate-sitemap.js';
import { generateRobots } from './generate-robots.js';

console.log('🚀 Generating SEO files...');
console.log('');

try {
  // Generate sitemap with hreflang support
  generateSitemap();
  console.log('');
  
  // Generate robots.txt
  generateRobots();
  console.log('');
  
  console.log('🎉 All SEO files generated successfully!');
  console.log('📋 Summary:');
  console.log('   ✅ Sitemap.xml with hreflang support');
  console.log('   ✅ Robots.txt with locale-specific rules');
  console.log('');
  console.log('💡 These files will help search engines:');
  console.log('   • Discover all your multilingual pages');
  console.log('   • Understand language/region targeting');
  console.log('   • Respect your crawling preferences');
  console.log('');
  
} catch (error) {
  console.error('❌ Error generating SEO files:', error);
  process.exit(1);
} 