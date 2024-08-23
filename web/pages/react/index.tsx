import Footer from '../../components/Footer/Footer';
import { CodeBlock } from '../../components/Markdown/Markdown';
import WhatsNext from '../../components/Markdown/WhatsNext';
import Navbar from '../../components/Navbar/Navbar';

export default function React() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar active="React" hideBody />
      <hr className="mt-12 border-border-neutral-primary" />
      <main className="flex h-full grow flex-col items-center px-4">
        <article className="prose prose-sm prose-stone relative size-full min-w-0 max-w-prose py-8 dark:prose-invert prose-code:rounded prose-code:bg-bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
          <h1 className="mb-2">IKONO React Library</h1>
          <p className="mt-0">
            Install the IKONO <a href="https://react.dev/">React</a> library to
            start adding icons now.
          </p>
          <p>
            IKONO icons can be used in a few different ways. Directly by copying
            or downloading from the interface, using the SVG icon library or by
            using the dedicated react library.
          </p>
          <h2>1. Installation</h2>
          Install the package using you&apos;re package manager of choice.
          <CodeBlock language="bash">npm i @ikono/react</CodeBlock>
          <h2>2. Import the icon</h2>
          Import the required icon at the top of the file.
          <CodeBlock language="javascript">
            {`import { Add } from '@ikono/react';`}
          </CodeBlock>
          <h2>3. Use the icon in the app</h2>
          <p>Simply add the icon to the component.</p>
          <CodeBlock language="javascript">
            {`import { Add, Minus } from '@ikono/react';
            
export default function () {
  return (
    <div>
      <Add />
      <Minus />
    </div>
  );
}
            `}
          </CodeBlock>
          <hr />
          <h2>Customizing the icons</h2>
          <p>
            IKONO icons has been optimised to work at two different sizes:
            24x24px and 20x20px. The smaller are more suitable for display
            within elements like buttons and badges. You can customise these
            using the size prop.
          </p>
          <p>
            You can also adjust the colour to a specific colour or just use the
            current text colour.
          </p>
          <h3>Icon Props</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>size?</code>
                  </td>
                  <td>
                    <code>{`"md" | "sm"`}</code>
                  </td>
                  <td>
                    <code>{`"md"`}</code>
                  </td>
                  <td>The size of the icon.</td>
                </tr>
                <tr>
                  <td>
                    <code>className?</code>
                  </td>
                  <td>
                    <code>{`string`}</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>
                    <code>className</code> passed to the underlying SVG.
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>color?</code>
                  </td>
                  <td>
                    <code>{`string | "currentColor"`}</code>
                  </td>
                  <td>
                    <code>{`"currentColor"`}</code>
                  </td>
                  <td>
                    A color formatted string used to change the colour of the
                    icon. <br />
                    <br />
                    If set to <code>{`"currentColor"`}</code> then it will
                    inherit the colour from the text colour.
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>title?</code>
                  </td>
                  <td>
                    <code>{`string`}</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>An accessible description to pass to the icon.</td>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    className="rounded bg-bg-secondary px-2 text-fg-secondary"
                  >
                    Extends SVG props:{' '}
                    <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg">
                      https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <WhatsNext />
        </article>
      </main>
      <Footer className="mt-0" />
    </div>
  );
}
