import updateSearchParam from '../../lib/updateSearchParam';
import Meta from '../../meta.json';
import IconButton from '../Button/IconBtn';
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
            <div className="flex gap-1">
              <AnimatePresence>
                {allowDownload && (
                  <IconButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 3.215V17m0 0-5.5-4.79M12 17l5.5-4.79M5.5 21h13"
                      />
                    </svg>
                  </IconButton>

                  // <motion.a
                  //   initial={{ opacity: 0 }}
                  //   animate={{ opacity: 1, transition: { duration: 0.1 } }}
                  //   exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  //   href={`icons/standard/24x24/${selected}.png`}
                  //   download
                  // >

                  // </motion.a>
                )}
              </AnimatePresence>
              <IconButton
                className="ml-4"
                onClick={() => {
                  setDialog(false);
                  setSelected('');
                  updateSearchParam('selected', '');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16.87 7.13 12 12m-4.87 4.87L12 12m4.87 4.87L12 12M7.13 7.13 12 12"
                  />
                </svg>
              </IconButton>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="m10.692 6-3 13M6.385 9.5h12.5M16.192 6l-3 13M5 15.5h12.5"
                />
              </svg>
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

            <h3 className="mt-8 flex items-center gap-1 text-xs font-semibold text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <g fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M15.887 6.886a.875.875 0 0 1 1.246-.036l4.178 4c.626.6.626 1.61 0 2.21l-4.178 4a.875.875 0 0 1-1.211-1.263l3.33-3.197a.894.894 0 0 0 0-1.29l-3.33-3.197a.875.875 0 0 1-.035-1.227ZM7.693 17.024a.875.875 0 0 1-1.246.036l-4.178-4a1.537 1.537 0 0 1 0-2.21l4.178-4a.875.875 0 0 1 1.21 1.263l-3.33 3.197a.894.894 0 0 0 0 1.29l3.33 3.197c.345.33.36.877.036 1.227Z"
                    clipRule="evenodd"
                  />
                  <rect
                    width="2"
                    height="16.592"
                    x="13.018"
                    y="3.274"
                    rx=".5"
                    transform="rotate(13.873 13.018 3.274)"
                  />
                </g>
              </svg>
              <span>React Code</span>
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
