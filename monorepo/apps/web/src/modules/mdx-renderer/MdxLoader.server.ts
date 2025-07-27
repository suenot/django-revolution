import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import remarkMermaid from 'remark-mermaid';

import { MdxDocumentation } from './types';

class MdxLoaderServer {
  private docsDir: string;

  constructor(docsDir: string) {
    this.docsDir = docsDir;
  }

  /**
   * Load and serialize a single MDX file with scope
   */
  async loadFileWithScope(filename: string, scope?: Record<string, unknown>): Promise<MDXRemoteSerializeResult> {
    const filePath = path.join(this.docsDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    return await serialize(content, { 
      scope,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [remarkMermaid, { theme: 'default' }]
        ],
      },
    });
  }

  /**
   * Load multiple MDX files with scope
   */
  async loadFilesWithScope(filenames: string[], scope?: Record<string, unknown>): Promise<MdxDocumentation<MDXRemoteSerializeResult>> {
    const docs: MdxDocumentation<MDXRemoteSerializeResult> = {};
    for (const filename of filenames) {
      const key = filename.replace('.mdx', '');
      docs[key] = await this.loadFileWithScope(filename, scope);
    }
    return docs;
  }

  /**
   * Load all MDX files from the directory with scope
   */
  async loadAllWithScope(scope?: Record<string, unknown>): Promise<MdxDocumentation<MDXRemoteSerializeResult>> {
    const files = fs.readdirSync(this.docsDir);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
    return await this.loadFilesWithScope(mdxFiles, scope);
  }

  /**
   * Static method for loading all MDX files with scope in getStaticProps (serialized)
   */
  static async loadAllWithScope(docsDir: string, scope?: Record<string, unknown>): Promise<MdxDocumentation<MDXRemoteSerializeResult>> {
    const loader = new MdxLoaderServer(docsDir);
    return await loader.loadAllWithScope(scope);
  }
}

export default MdxLoaderServer; 