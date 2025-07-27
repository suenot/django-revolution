declare module 'remark-mermaid' {
  import { Plugin } from 'unified';
  
  interface RemarkMermaidOptions {
    theme?: string;
  }
  
  const remarkMermaid: Plugin<[RemarkMermaidOptions?]>;
  export default remarkMermaid;
} 