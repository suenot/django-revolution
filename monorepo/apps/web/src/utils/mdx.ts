import path from 'path';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface MdxDocumentation<T = string> {
  [key: string]: T;
}

export async function loadMdxDocs(docsDir: string): Promise<Record<string, MDXRemoteSerializeResult>> {
  // Dynamic import to avoid client-side bundling
  const { serialize } = await import('next-mdx-remote/serialize');
  const remarkGfm = await import('remark-gfm');
  const fs = await import('fs');

  const files = fs.readdirSync(docsDir);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
  
  const documentation: Record<string, MDXRemoteSerializeResult> = {};
  
  for (const filename of mdxFiles) {
    const filePath = path.join(docsDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const key = filename.replace('.mdx', '');
    
    try {
      documentation[key] = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm.default],
          rehypePlugins: [],
        },
        parseFrontmatter: true,
      });
    } catch (error) {
      console.error(`❌ Error loading MDX: ${filename}`, error);
      // Fallback to empty content
      documentation[key] = await serialize('# Error loading content', {
        mdxOptions: {
          remarkPlugins: [remarkGfm.default],
        },
      });
    }
  }
  
  return documentation;
} 