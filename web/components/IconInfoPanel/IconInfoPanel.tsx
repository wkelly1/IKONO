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

  const findSimilar = (icon: string) => {
    let out = [];
    Object.keys(data).forEach(value => {
      let tags = data[value].tags;
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
                    href={`icons/png/${selected}.png`}
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

            <div className="mt-7 flex">
              <button
                className="relative mr-2 flex h-10 w-full items-center justify-center bg-blue-600 bg-opacity-30 text-xs font-semibold tracking-tighter text-blue-600 transition-all hover:bg-opacity-50"
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
                className="relative mr-2 flex h-10 w-full items-center justify-center bg-blue-600 bg-opacity-30 text-xs font-semibold tracking-tighter text-blue-600 transition-all hover:bg-opacity-50"
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
