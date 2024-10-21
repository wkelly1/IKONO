import { ReactNode } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface CodeBlockProps {
  children: ReactNode;
  language: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <div className="relative my-6">
      <SyntaxHighlighter
        customStyle={{ padding: undefined }}
        style={oneDark}
        language={language}
        className="m-0 text-base"
        showLineNumbers={true}
        useInlineStyles={true}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}
