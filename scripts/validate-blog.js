#!/usr/bin/env node

/**
 * Blog validation script
 * Validates that all blog posts have proper frontmatter and content structure
 */

import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDir = join(__dirname, '../src/content/blog');

const requiredFields = ['title', 'description', 'publishDate', 'author'];
const optionalFields = ['tags', 'draft'];

async function validateBlogPosts() {
  try {
    const files = await readdir(blogDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`\n📝 Validating ${markdownFiles.length} blog posts...\n`);
    
    let hasErrors = false;
    
    for (const file of markdownFiles) {
      const filePath = join(blogDir, file);
      const content = await readFile(filePath, 'utf-8');
      const { data: frontmatter, content: body } = matter(content);
      
      console.log(`Checking: ${file}`);
      
      // Check required fields
      const missingFields = requiredFields.filter(field => !frontmatter[field]);
      if (missingFields.length > 0) {
        console.error(`  ❌ Missing required fields: ${missingFields.join(', ')}`);
        hasErrors = true;
      }
      
      // Check publishDate format
      if (frontmatter.publishDate) {
        const date = new Date(frontmatter.publishDate);
        if (isNaN(date.getTime())) {
          console.error(`  ❌ Invalid publishDate format: ${frontmatter.publishDate}`);
          hasErrors = true;
        }
      }
      
      // Check content length
      if (body.trim().length < 100) {
        console.warn(`  ⚠️  Content seems very short (${body.trim().length} chars)`);
      }
      
      // Check for proper headings
      if (!body.includes('# ')) {
        console.warn(`  ⚠️  No main heading (h1) found in content`);
      }
      
      if (!hasErrors) {
        console.log(`  ✅ Valid`);
      }
    }
    
    if (hasErrors) {
      console.log(`\n❌ Found validation errors. Please fix them before publishing.\n`);
      process.exit(1);
    } else {
      console.log(`\n✅ All blog posts are valid!\n`);
    }
    
  } catch (error) {
    console.error('Error validating blog posts:', error);
    process.exit(1);
  }
}

validateBlogPosts();