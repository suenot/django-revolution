import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';

import { MdxDocumentation } from './types';

class MdxLoader {
  private docsDir: string;

  constructor(docsDir: string) {
    this.docsDir = docsDir;
  }

  /**
   * Load and serialize a single MDX file with scope
   */
  async loadFileWithScope(filename: string, scope?: Record<string, any>): Promise<MDXRemoteSerializeResult> {
    const filePath = path.join(this.docsDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    return await serialize(content, { 
      scope,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    });
  }

  /**
   * Load multiple MDX files with scope
   */
  async loadFilesWithScope(filenames: string[], scope?: Record<string, any>): Promise<MdxDocumentation<MDXRemoteSerializeResult>> {
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
  async loadAllWithScope(scope?: Record<string, any>): Promise<MdxDocumentation<MDXRemoteSerializeResult>> {
    const files = fs.readdirSync(this.docsDir);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
    return await this.loadFilesWithScope(mdxFiles, scope);
  }

  /**
   * Load a single MDX file (raw content)
   */
  loadFile(filename: string): string {
    const filePath = path.join(this.docsDir, filename);
    return fs.readFileSync(filePath, 'utf-8');
  }

  /**
   * Load multiple MDX files by filenames (raw content)
   */
  loadFiles(filenames: string[]): MdxDocumentation<string> {
    const docs: MdxDocumentation<string> = {};
    filenames.forEach((filename) => {
      const key = filename.replace('.mdx', '');
      docs[key] = this.loadFile(filename);
    });
    return docs;
  }

  /**
   * Load all MDX files from the directory (raw content)
   */
  loadAll(): MdxDocumentation<string> {
    const files = fs.readdirSync(this.docsDir);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
    return this.loadFiles(mdxFiles);
  }

  /**
   * Static method for quick initialization
   */
  static fromDocsDir(docsDir: string): MdxLoader {
    return new MdxLoader(docsDir);
  }

  /**
   * Static method for loading all MDX files in getStaticProps (raw)
   */
  static loadAll(docsDir: string): MdxDocumentation<string> {
    const loader = new MdxLoader(docsDir);
    return loader.loadAll();
  }

  /**
   * Static method for loading all MDX files with scope in getStaticProps (serialized)
   */
  static async loadAllWithScope(docsDir: string, scope?: Record<string, any>): Promise<MdxDocumentation<MDXRemoteSerializeResult>> {
    const loader = new MdxLoader(docsDir);
    return await loader.loadAllWithScope(scope);
  }
}

export default MdxLoader; 