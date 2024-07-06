import { getBrightness } from '../../lib/colors';
import { setSVGColour } from '../../lib/svgAdjustments';
import updateSearchParam from '../../lib/updateSearchParam';
import Meta from '../../meta.json';
import IconButton from '../Button/IconBtn';
import ColourSelector from '../ColourPicker/ColourPicker';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface IconInfoPanelProps {
  setSelected: Dispatch<SetStateAction<string>>;
  setDialog: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  data: typeof Meta;
  className?: string;
  allowDownload?: boolean;
  size: 'sm' | 'base';
  wrapper: 'square' | 'circle' | 'none';
}

interface IconInfoPanelSideBarProps extends IconInfoPanelProps {
  showDialog: boolean;
  className: string;
}

export function IconInfoPanelSideBar({
  showDialog,
  selected,
  setShowDialog,
  className,
  data,
  allowDownload,
  size,
  setSelected,
  setDialog,
  wrapper
}: IconInfoPanelSideBarProps) {
  if (showDialog) {
    return (
      <aside
        className={`w-[400px] min-w-[400px] max-w-[400px] pl-5 ${className}`}
      >
        <IconInfoPanel
          selected={selected}
          setShowDialog={setShowDialog}
          data={data}
          allowDownload={allowDownload}
          size={size}
          setSelected={setSelected}
          setDialog={setDialog}
          wrapper={wrapper}
        />
      </aside>
    );
  }
  return null;
}

interface IconInfoPanelPopupProps extends IconInfoPanelProps {
  showDialog: boolean;
  className: string;
}

export function IconInfoPanelPopup({
  showDialog,
  selected,
  setShowDialog,
  data,
  allowDownload,
  size,
  setSelected,
  setDialog,
  wrapper
}: IconInfoPanelPopupProps) {
  return (
    <div className="sm:hidden">
      <Dialog.Root
        open={showDialog}
        onOpenChange={open => {
          if (!open) {
            setDialog(false);
            setSelected('');
            updateSearchParam('selected', '');
            updateSearchParam('size', '');
            updateSearchParam('variant', '');
          }
        }}
        defaultOpen={false}
        modal={false}
      >
        <Dialog.Overlay className="fixed inset-0 z-10 block bg-white/10 backdrop-blur-sm sm:hidden" />
        <Dialog.Content
          onInteractOutside={e => {
            if (window.innerWidth > 640) {
              e.preventDefault();
            }
          }}
          className="fixed inset-2 z-20 block rounded-sm bg-white focus:outline-none sm:hidden"
        >
          {showDialog && (
            <IconInfoPanel
              selected={selected}
              setShowDialog={setShowDialog}
              data={data}
              allowDownload={allowDownload}
              size={size}
              setSelected={setSelected}
              setDialog={setDialog}
              wrapper={wrapper}
            />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export function IconInfoPanel({
  setSelected,
  setDialog,
  selected,
  setShowDialog,
  data,
  allowDownload,
  size,
  wrapper
}: IconInfoPanelProps) {
  const [color, setColor] = useState('000000');
  const [colorDisabled, setColorDisabled] = useState(true);
  const [showColourSelector, setShowColourSelector] = useState(false);

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
      const tags = data[value].keywords;
      tags.filter((value: string) => data[icon].keywords.includes(value));
      if (
        tags.filter((value: string) => data[icon].keywords.includes(value))
          .length > 0
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

  const svg = useMemo(() => {
    const icon =
      size === 'base'
        ? data[selected].variants.standard.base.svg
        : data[selected].variants.standard.sm.svg;
    if (colorDisabled) {
      return icon;
    }
    return setSVGColour(icon, color);
  }, [size, selected, data, color, colorDisabled]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto rounded-sm border-[3px] border-blue-600 bg-white px-6 pt-5 dark:border-blue-400 dark:bg-gray-800">
      <div className="flex justify-between">
        <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400">
          {selected}
        </h3>
        <div className="flex items-center gap-1">
          <Tooltip tooltipChildren="Set icon colour">
            <IconButton onClick={() => setShowColourSelector(prev => !prev)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4945 17.2559C5.71467 17.2559 2.68554 14.0164 2.68554 10C2.68554 5.96037 5.96031 2.68561 9.99994 2.68561C11.9946 2.68561 13.7165 3.58204 14.9506 4.77315C16.2107 5.98944 16.8525 7.401 16.8525 8.31027C16.8525 9.17197 16.8143 9.83383 16.6293 10.3741C16.459 10.8716 16.1548 11.291 15.5332 11.6411C14.8704 12.0145 14.4288 12.1663 13.9708 12.238C13.5274 12.3075 13.0531 12.307 12.3 12.3061C12.2119 12.306 12.12 12.3059 12.0239 12.3059C11.3418 12.3059 10.7736 12.6463 10.4843 13.2115C10.2097 13.748 10.234 14.3874 10.4736 14.9572C10.6138 15.2904 10.8714 15.599 11.0868 15.837C11.2095 15.9726 11.3685 16.1372 11.5148 16.2887C11.6126 16.3898 11.7046 16.4851 11.7764 16.562C11.9657 16.7647 12.0929 16.9188 12.1657 17.0338C12.0541 17.18 12.0165 17.1886 11.9782 17.1974C11.9741 17.1983 11.9699 17.1993 11.9657 17.2004C11.8877 17.221 11.7557 17.2392 11.5021 17.2482C11.2771 17.2561 10.9983 17.256 10.6255 17.2559C10.5831 17.2559 10.5395 17.2559 10.4945 17.2559ZM12.2205 17.1365C12.2205 17.1364 12.2202 17.1357 12.2197 17.1341C12.2203 17.1357 12.2205 17.1365 12.2205 17.1365Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="5.73987" cy="8.64804" r="1" fill="currentColor" />
                <circle cx="8.65564" cy="5.96457" r="1" fill="currentColor" />
                <circle cx="11.9077" cy="5.96457" r="1" fill="currentColor" />
                <circle cx="14.2295" cy="8.64804" r="1" fill="currentColor" />
              </svg>
            </IconButton>
          </Tooltip>
          <AnimatePresence>
            {allowDownload && (
              <Tooltip tooltipChildren="Download PNG">
                <a
                  download
                  href={`/api/generate/png?icon=${selected}&size=${size}&variant=standard&icon_size=24&color=${color}${
                    wrapper !== 'none' ? `&wrapper=${wrapper}` : ''
                  }`}
                >
                  <IconButton type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M10 2.68v11.487m0 0-4.583-3.992M10 14.167l4.583-3.992m-10 7.325h10.834"
                      />
                    </svg>
                  </IconButton>
                </a>
              </Tooltip>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14.058 5.942 10 10m-4.058 4.058L10 10m4.058 4.058L10 10M5.942 5.942 10 10"
              />
            </svg>
          </IconButton>
        </div>
      </div>

      {showColourSelector && (
        <ColourSelector
          colour={color}
          onChange={colour => {
            if (colour) {
              console.log(colour.substring(1).toUpperCase());
              setColor(colour.substring(1).toUpperCase());
              setColorDisabled(false);
            } else {
              setColor('000000');
              setColorDisabled(true);
            }
          }}
        />
      )}
      <div className="mt-4 flex items-center gap-5">
        <div
          className={`relative flex h-36 w-full items-center justify-center border-blue-200 p-2 text-gray-900 ${
            getBrightness(color) > 140 ? 'bg-black' : 'bg-white'
          }`}
          style={{ borderWidth: '3px' }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: svg
            }}
          ></div>
        </div>
      </div>
      <div
        className="flex h-full flex-col overflow-x-visible px-[2px] pb-5"
        style={{ scrollbarWidth: 'none' }}
      >
        <h3 className="mt-8 flex items-center text-base font-semibold text-blue-600 dark:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="m10.692 6-3 13M6.385 9.5h12.5M16.192 6l-3 13M5 15.5h12.5"
            />
          </svg>
          <span className="ml-1 text-xs text-blue-400 dark:text-blue-300">
            {Meta[selected].keywords.join(', ')}
          </span>
        </h3>

        <div className="mt-7 flex justify-between gap-2">
          <button
            className="relative flex h-10 w-full items-center justify-center bg-blue-600 bg-opacity-30 text-xs font-semibold tracking-tighter text-blue-600 transition-all hover:bg-opacity-50 dark:bg-blue-400 dark:text-blue-900"
            onClick={() => {
              navigator.clipboard.writeText(svg);
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
            className="relative flex h-10 w-full items-center justify-center bg-blue-600 bg-opacity-30 text-xs font-semibold tracking-tighter text-blue-600 transition-all hover:bg-opacity-50 dark:bg-blue-400 dark:text-blue-900"
            onClick={() => {
              navigator.clipboard.writeText(
                size === 'base'
                  ? data[selected].variants.standard.base.jsx
                  : data[selected].variants.standard.sm.jsx
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

        <h3 className="mt-8 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
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
          <span className="text-blue-400 dark:text-blue-300">React Code</span>
        </h3>
        <div className="mt-8 shrink-0 cursor-pointer overflow-x-auto rounded-sm border-2 border-blue-300 p-2 text-xs dark:border-blue-400">
          <pre>
            <code>
              <span className="text-purple-400">import</span>{' '}
              <span className="text-gray-500 dark:text-gray-400">{'{'}</span>
              <span className="text-blue-600 dark:text-blue-300">
                {' '}
                {snakeToCamel(selected)}{' '}
              </span>
              <span className="text-gray-500 dark:text-gray-400">{'}'}</span>{' '}
              <span className="text-purple-400">from</span>{' '}
              <span className="text-blue-600 dark:text-blue-300">
                {'"@ikono/react"'}
              </span>
              <span className="text-gray-500 dark:text-gray-400">;</span>
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
                <span className="text-gray-500 dark:text-gray-400">{'<'}</span>
                <span className="text-blue-600 dark:text-blue-300">
                  {snakeToCamel(selected)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {' />'}
                </span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="invisible relative ml-2 select-none rounded bg-blue-100 p-1 font-sans text-[0.6rem] text-blue-600 opacity-0 shadow transition-all group-hover:visible group-hover:opacity-100"
                >
                  <div className="absolute -left-[5px] top-1/2 h-0 w-0 -translate-y-1/2 border-b-[5px] border-r-[6px] border-t-[5px] border-b-transparent border-r-blue-100 border-t-transparent"></div>

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

        <h3 className="mt-8 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g fill="none">
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M12 7c-4.393 0-7.51 3.508-8.587 4.92a.858.858 0 0 0 .057 1.115C4.666 14.325 8.015 17.5 12 17.5c3.985 0 7.334-3.176 8.53-4.465a.856.856 0 0 0 .056-1.114C19.51 10.508 16.394 7 12 7Z"
              />
              <path
                fill="currentColor"
                d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </g>
          </svg>
          <span className="text-blue-400 dark:text-blue-300">
            More like this...
          </span>
        </h3>

        <div className="mt-8 w-full">
          <div className="xs:grid-cols-3 mb-4 grid w-full grid-flow-row grid-cols-2 gap-5">
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
                        size === 'base'
                          ? data[value].variants.standard.base.svg
                          : data[value].variants.standard.sm.svg
                    }}
                    className="text-gray-800 dark:text-gray-200"
                  ></div>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
