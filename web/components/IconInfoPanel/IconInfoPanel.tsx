import updateSearchParam from '../../lib/updateSearchParam';
import Meta from '../../meta.json';
import Icon from '../Icon/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';

interface IconInfoPanelProps {
  setSelected: Dispatch<SetStateAction<string>>;
  setDialog: Dispatch<SetStateAction<boolean>>;
  showDialog: boolean;
  selected: string;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  data: typeof Meta;
  className?: string;
  allowDownload?: boolean;
  size: 'small' | 'normal';
}

export default function IconInfoPanel({
  setSelected,
  setDialog,
  showDialog,
  selected,
  setShowDialog,
  data,
  className,
  allowDownload,
  size
}: IconInfoPanelProps) {
  const [svgCopied, setSVGCopied] = useState(false);
  const [jsxCopied, setJSXCopied] = useState(false);

  const [codeCopied, setCodeCopied] = useState(false);

  const copySVGAnimation = () => {
    setSVGCopied(true);
    setTimeout(() => {
      setSVGCopied(false);
    }, 1000);
  };
  const copyJSXAnimation = () => {
    setJSXCopied(true);
    setTimeout(() => {
      setJSXCopied(false);
    }, 1000);
  };

  const copyCodeAnimation = () => {
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 1000);
  };

  const findSimilar = (icon: string) => {
    const out = [];
    Object.keys(data).forEach(value => {
      const tags = data[value].tags;
      tags.filter((value: string) => data[icon].tags.includes(value));
      if (
        tags.filter((value: string) => data[icon].tags.includes(value)).length >
        0
      ) {
        if (value !== icon) {
          out.push(value);
        }
      }
    });
    return out;
  };

  function snakeToCamel(str: string) {
    return str
      .toLowerCase()
      .replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )
      .replace(/^\w/g, group => group.toUpperCase());
  }

  return (
    <AnimatePresence>
      {showDialog && (
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
            originX: 1
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
            originX: 1,
            transition: { duration: 0.3, type: 'spring' }
          }}
          exit={{
            opacity: 0,
            originX: 1,
            transition: { duration: 0.2, type: 'spring' }
          }}
          className={`
                xs:w-full xs:h-auto relative h-screen w-full border-blue-600 bg-white
              px-6 py-5 sm:h-auto sm:w-full md:w-full lg:h-auto lg:w-1/3 ${className}`}
          style={{ borderWidth: '3px' }}
        >
          <div className="flex justify-between">
            <h3 className="text-base font-semibold text-blue-600">
              {selected}
            </h3>
            <div className="flex">
              <AnimatePresence>
                {allowDownload && (
                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.1 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    href={`icons/standard/24x24/${selected}.png`}
                    download
                  >
                    <svg
                      height="24"
                      width="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 4v13m0 0L7 12.21M12.5 17l5.5-4.79M6 21h13"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </motion.a>
                )}
              </AnimatePresence>
              <button
                className="ml-4"
                onClick={() => {
                  setDialog(false);
                  setSelected('');
                  updateSearchParam('selected', '');
                }}
              >
                <svg
                  height="24"
                  width="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.95 8.464a1 1 0 1 0-1.414-1.414L12 10.586 8.465 7.05A1 1 0 0 0 7.05 8.464L10.586 12 7.05 15.536a1 1 0 1 0 1.415 1.414L12 13.414l3.536 3.536a1 1 0 1 0 1.414-1.414L13.414 12l3.536-3.536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="relative mt-8 flex h-24 w-full items-center justify-center border-blue-200 p-2"
              style={{ borderWidth: '3px' }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    size === 'normal'
                      ? data[selected].svg
                      : data[selected].svgMini
                }}
              ></div>
            </div>
          </div>

          <div
            className="h-full overflow-y-auto "
            style={{ scrollbarWidth: 'none' }}
          >
            <h3 className="mt-8 flex items-center text-base font-semibold text-blue-600">
              #
              <span className="ml-1 text-xs text-blue-400">
                {Meta[selected].tags.join(', ')}
              </span>
            </h3>

            <div className="mt-7 flex justify-between gap-2">
              <button
                className="relative flex h-10 w-full items-center justify-center bg-blue-600 bg-opacity-30 text-xs font-semibold tracking-tighter text-blue-600 transition-all hover:bg-opacity-50"
                onClick={() => {
                  navigator.clipboard.writeText(
                    size === 'normal'
                      ? data[selected].svg
                      : data[selected].svgMini
                  );
                  copySVGAnimation();
                }}
              >
                <AnimatePresence>
                  {svgCopied && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      Copied!
                    </motion.p>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {!svgCopied && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      Copy SVG
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
              <button
                className="relative flex h-10 w-full items-center justify-center bg-blue-600 bg-opacity-30 text-xs font-semibold tracking-tighter text-blue-600 transition-all hover:bg-opacity-50"
                onClick={() => {
                  navigator.clipboard.writeText(
                    size === 'normal'
                      ? data[selected].jsxMini
                      : data[selected].jsxMini
                  );
                  copyJSXAnimation();
                }}
              >
                <AnimatePresence>
                  {jsxCopied && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      Copied!
                    </motion.p>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {!jsxCopied && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      Copy JSX
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <h3 className="mt-8 flex items-center text-xs font-semibold text-blue-400">
              <svg width="20" height="20" className="mr-1 text-blue-600">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M6.67 5.727a.745.745 0 0 1-.022 1.053L3.893 9.425a.745.745 0 0 0 0 1.075l2.755 2.645a.745.745 0 0 1 .022 1.053l-.258.27a.745.745 0 0 1-1.054.02l-3.755-3.604a1.28 1.28 0 0 1 0-1.843l3.755-3.604a.745.745 0 0 1 1.054.02l.258.27Zm6.855-.269a.745.745 0 0 1 1.053-.021l3.755 3.604a1.28 1.28 0 0 1 0 1.843l-3.755 3.604a.745.745 0 0 1-1.053-.02l-.258-.27a.745.745 0 0 1 .021-1.053l2.756-2.645a.745.745 0 0 0 0-1.075L13.288 6.78a.745.745 0 0 1-.02-1.053l.257-.27ZM10.68 3.222a.745.745 0 0 1 .904-.541l.361.09c.4.1.642.504.542.904l-3.07 12.282a.745.745 0 0 1-.904.542l-.361-.09a.745.745 0 0 1-.542-.904l3.07-12.283Z"
                  clipRule="evenodd"
                />
              </svg>
              React Code
            </h3>
            <div className="mt-8 cursor-pointer overflow-x-auto rounded-sm border-2 border-blue-300 p-2 text-xs">
              <pre>
                <code>
                  <span className="text-purple-400">import</span>{' '}
                  <span className="text-gray-500">{'{'}</span>
                  <span className="text-blue-600">
                    {' '}
                    {snakeToCamel(selected)}{' '}
                  </span>
                  <span className="text-gray-500">{'}'}</span>{' '}
                  <span className="text-purple-400">from</span>{' '}
                  <span className="text-blue-600">{'"@ikono/react"'}</span>
                  <span className="text-gray-500">;</span>
                  <br />
                  <br />
                  <span
                    className="group relative flex items-center"
                    onClick={() => {
                      copyCodeAnimation();
                      navigator.clipboard.writeText(
                        `<${snakeToCamel(selected)} />`
                      );
                    }}
                  >
                    <span className="text-gray-500">{'<'}</span>
                    <span className="text-blue-600">
                      {snakeToCamel(selected)}
                    </span>
                    <span className="text-gray-500">{' />'}</span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="invisible  relative ml-2 select-none rounded bg-blue-100 p-1 font-sans text-[0.6rem] text-blue-600 opacity-0 shadow transition-all group-hover:visible group-hover:opacity-100"
                    >
                      <div className="absolute -left-[5px] top-1/2 h-0 w-0 -translate-y-1/2 border-t-[5px] border-b-[5px] border-r-[6px] border-r-blue-100 border-t-transparent border-b-transparent"></div>

                      {codeCopied && (
                        <motion.p
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Copied!
                        </motion.p>
                      )}

                      {!codeCopied && (
                        <motion.p
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Copy
                        </motion.p>
                      )}
                    </motion.div>
                  </span>
                </code>
              </pre>
            </div>

            <h3 className="mt-8 flex items-center text-xs font-semibold text-blue-400">
              More like this...
            </h3>

            <div className="mt-8 w-full">
              <div className="xs:grid-cols-3 grid w-full grid-flow-row grid-cols-2 gap-5">
                {findSimilar(selected).map(value => (
                  <Icon
                    key={value}
                    setDialog={setShowDialog}
                    selected={selected}
                    setSelected={setSelected}
                    name={value}
                    size={size}
                    data={data[value]}
                    icon={
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            size === 'normal'
                              ? data[value].svg
                              : data[value].svgMini
                        }}
                        className="text-gray-800"
                      ></div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
