import Image from 'next/image';
import MarkdownPrimitive from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type HeadingResolverProps = {
  level: number;
  children: React.ReactNode;
};

export const Headings: React.FC<HeadingResolverProps> = ({
  level,
  children
}) => {
  // Access actual (string) value of heading
  const heading = children;

  let anchor = typeof heading === 'string' ? heading.toLowerCase() : '';
  anchor = anchor.replace(/[^a-zA-Z0-9 ]/g, '');
  anchor = anchor.replace(/ /g, '-');

  // Utility
  const container = (children: React.ReactNode): JSX.Element => (
    <a id={anchor} href={`#${anchor}`} className="group relative">
      <span>{children}</span>
      <div className="absolute -left-0 top-0 -translate-x-full text-fg-primary opacity-0 transition-opacity group-hover:opacity-100 md:-left-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="m10.692 6-3 13M6.385 9.5h12.5M16.192 6l-3 13M5 15.5h12.5"
          />
        </svg>
      </div>
    </a>
  );

  switch (level) {
    case 1:
      return <h1>{container(children)}</h1>;
    case 2:
      return <h2>{container(children)}</h2>;
    case 3:
      return <h3>{container(children)}</h3>;

    default:
      return <h6>{container(children)}</h6>;
  }
};

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <MarkdownPrimitive
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        p: (paragraph: { children?: boolean; node?: any }) => {
          const { node } = paragraph;

          if (node.children[0].tagName === 'img') {
            const image = node.children[0];

            const metastring = image.properties.alt;
            const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
            const metaWidth = metastring.match(/{([^}]+)x/);
            const metaHeight = metastring.match(/x([^}]+)}/);
            const width = metaWidth ? parseInt(metaWidth[1]) : 768;
            const height = metaHeight ? parseInt(metaHeight[1]) : 432;
            const isPriority = metastring?.toLowerCase().match('{priority}');
            const hasCaption = metastring?.toLowerCase().includes('{caption:');
            const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

            return (
              <div className="w-full">
                <Image
                  src={image.properties.src}
                  width={width}
                  height={height}
                  alt={alt}
                  priority={isPriority}
                />
                {hasCaption ? <div aria-label={caption}>{caption}</div> : null}
              </div>
            );
          }
          return <p>{paragraph.children}</p>;
        },
        h1: ({ children }) => <Headings level={2}>{children}</Headings>,
        h2: ({ children }) => <Headings level={3}>{children}</Headings>,
        h3: ({ children }) => <Headings level={4}>{children}</Headings>,
        h4: ({ children }) => <Headings level={5}>{children}</Headings>,
        h5: ({ children }) => <Headings level={6}>{children}</Headings>,
        hr: () => (
          <hr className="border-border-neutral-primary -ml-5 lg:-mx-5" />
        ),
        code({ className, ...props }) {
          const hasLang = /language-(\w+)/.exec(className || '');

          return hasLang ? (
            <div>
              <div>{hasLang[1]}</div>
              <SyntaxHighlighter
                customStyle={{ padding: undefined }}
                style={oneDark}
                language={hasLang[1]}
                PreTag="div"
                className="m-0 text-base"
                showLineNumbers={true}
                useInlineStyles={true}
              >
                {String(props.children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props} />
          );
        }
      }}
    >
      {children}
    </MarkdownPrimitive>
  );
}
