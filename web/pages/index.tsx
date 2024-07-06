import Footer from '../components/Footer/Footer';
import Icon from '../components/Icon/Icon';
import {
  IconInfoPanelSideBar,
  IconInfoPanelPopup
} from '../components/IconInfoPanel/IconInfoPanel';
import Navbar from '../components/Navbar/Navbar';
import { wrapInCircle, wrapInSquare } from '../lib/svgAdjustments';
import updateSearchParam from '../lib/updateSearchParam';
import Meta from '../meta.json';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { twMerge } from 'tailwind-merge';

interface HomeProps {
  s: string;
  selectedParam: string;
  sizeParam: 'sm' | 'base';
}

export type MetaType = typeof Meta;

export default function Home({ s, selectedParam, sizeParam }: HomeProps) {
  const [showDialog, setShowDialog] = useState<boolean>(
    selectedParam !== undefined
  );
  const [initialData] = useState(Meta);
  const [data, setData] = useState<MetaType>(Meta);
  const [noShowing, setNoShowing] = useState<number>(Object.keys(Meta).length);
  const [selected, setSelected] = useState<string>(selectedParam || '');
  const [searchTerm, setSearchTerm] = useState<string>(s || '');
  const [circleMode, setCircleMode] = useState<boolean>(false);
  const [squareMode, setSquareMode] = useState<boolean>(false);
  const [size, setSize] = useState<'sm' | 'base'>(sizeParam || 'base');

  const searchInput = useRef(null);

  const convertToJSX = (svg: string) => {
    return svg.replace(/[a-z]*-[a-z]*=/g, group => {
      const index = group.indexOf('-') + 1;
      const newString =
        group.substring(0, index) +
        group[index].toUpperCase() +
        group.substring(index + 1);
      return newString.replace('-', '');
    });
  };

  const generateCircles = useCallback((dataToConvert: MetaType): MetaType => {
    const newData = {};

    Object.entries(dataToConvert).forEach(function ([key, value]) {
      const svg = wrapInCircle(value.variants.standard.base.svg);
      const svgMini = wrapInCircle(value.variants.standard.sm.svg, 'mini');

      newData[key] = {
        variants: {
          standard: {
            base: {
              jsx: convertToJSX(svg.toString()),
              svg: svg.toString()
            },
            sm: {
              jsx: convertToJSX(svgMini.toString()),
              svg: svgMini.toString()
            }
          }
        },
        keywords: value.keywords
      };
    });
    return newData as MetaType;
  }, []);

  const generateSquares = useCallback((dataToConvert: MetaType): MetaType => {
    const newData = {};

    Object.entries(dataToConvert).forEach(function ([key, value]) {
      const svg = wrapInSquare(value.variants.standard.base.svg);
      const svgMini = wrapInSquare(value.variants.standard.sm.svg, 'mini');

      newData[key] = {
        variants: {
          standard: {
            base: {
              jsx: convertToJSX(svg.toString()),
              svg: svg.toString()
            },
            sm: {
              jsx: convertToJSX(svgMini.toString()),
              svg: svgMini.toString()
            }
          }
        },
        keywords: value.keywords
      };
    });
    return newData as MetaType;
  }, []);

  const circleData: MetaType = useMemo(
    () => generateCircles(initialData),
    [initialData, generateCircles]
  );
  const squareData: MetaType = useMemo(
    () => generateSquares(initialData),
    [initialData, generateSquares]
  );

  useEffect(() => {
    if (circleMode) {
      setData(circleData);
    } else {
      setData(initialData);
    }
  }, [circleMode, circleData, initialData]);

  useEffect(() => {
    if (squareMode) {
      setData(squareData);
    } else {
      if (!circleMode) {
        setData(initialData);
      }
    }
  }, [squareMode, squareData, initialData, circleMode]);

  useEffect(() => {
    let no = 0;
    Object.keys(data).map(icon => {
      if (
        (searchTerm !== '' && icon.includes(searchTerm)) ||
        searchTerm === '' ||
        data[icon].keywords.some((value: string) => value.includes(searchTerm))
      ) {
        no++;
      }
    });
    setNoShowing(no);
  }, [searchTerm, data]);

  const handleKeyPress = useCallback((e: globalThis.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.current.focus();
    }
    if (e.key === 'Escape') {
      setSearchTerm('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  let wrapper: 'none' | 'circle' | 'square' = 'none';
  if (circleMode) wrapper = 'circle';
  if (squareMode) wrapper = 'square';

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between font-sans`}
    >
      <div className="max-w-screen-3xl w-full overflow-x-hidden overflow-y-hidden">
        <Navbar active={'Icons'} />

        <IconInfoPanelPopup
          size={size}
          setSelected={setSelected}
          setDialog={setShowDialog}
          showDialog={showDialog}
          allowDownload={true}
          selected={selected}
          setShowDialog={setShowDialog}
          data={data}
          className="block sm:hidden"
          wrapper={wrapper}
        />

        <motion.main
          className="mt-10 px-5 sm:px-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ stiffness: 100 }}
        >
          <div
            className="mt-8 flex h-14 items-center border-blue-200 p-2 dark:border-blue-400"
            style={{ borderWidth: '3px' }}
          >
            <div className="ml-1 text-blue-700 dark:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M20.338 21.399a.75.75 0 0 0 1.06-1.062l-1.06 1.062Zm-3.767-11.173a6.344 6.344 0 0 1-6.345 6.345v1.5a7.844 7.844 0 0 0 7.845-7.845h-1.5Zm-6.345 6.345a6.344 6.344 0 0 1-6.344-6.345h-1.5a7.844 7.844 0 0 0 7.844 7.845v-1.5Zm-6.344-6.345a6.344 6.344 0 0 1 6.344-6.344v-1.5a7.844 7.844 0 0 0-7.844 7.844h1.5Zm6.344-6.344a6.344 6.344 0 0 1 6.345 6.344h1.5a7.844 7.844 0 0 0-7.845-7.844v1.5Zm4.478 11.9 5.634 5.617 1.06-1.062-5.635-5.617-1.059 1.063Z"
                />
              </svg>
            </div>
            <DebounceInput
              debounceTimeout={200}
              placeholder="Search"
              inputRef={searchInput}
              className="dark:bg-dark-background ml-3 w-full border-none font-semibold text-blue-600 placeholder-blue-400 outline-none dark:text-blue-300 dark:placeholder-blue-300"
              value={searchTerm}
              onChange={e => {
                updateSearchParam('s', e.target.value);
                setSearchTerm(e.target.value);
              }}
            />
            <p className="mr-4 flex border-2 border-blue-200 px-2 py-1 text-sm font-normal text-blue-400 dark:border-blue-400">
              <span className="text-blue-400">⌘</span> K
            </p>
            <p className="flex min-w-[50px] max-w-[50px] justify-end pr-2 text-xs font-semibold tracking-tighter dark:text-blue-400">
              {noShowing}/{Object.keys(data).length}
            </p>
          </div>

          <div className="mt-5 flex w-full justify-between">
            <LayoutGroup>
              <motion.div className="w-full @container" layout>
                <div className="w-full">
                  <motion.div
                    className="mb-8 grid w-full grid-flow-row grid-cols-1 gap-5 @sm:grid-cols-4"
                    layout
                  >
                    <button
                      className={twMerge(
                        'border-2 py-2 text-xs font-semibold tracking-tighter dark:border-blue-400',
                        circleMode
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-blue-200 bg-transparent text-blue-400'
                      )}
                      style={{ borderWidth: '3px' }}
                      onClick={() => {
                        setSquareMode(false);
                        setCircleMode(v => !v);
                      }}
                      aria-pressed={circleMode}
                    >
                      Circle
                    </button>
                    <button
                      className={twMerge(
                        'border-2 py-2 text-xs font-semibold tracking-tighter dark:border-blue-400',
                        squareMode
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-blue-200 bg-transparent text-blue-400'
                      )}
                      style={{ borderWidth: '3px' }}
                      onClick={() => {
                        setCircleMode(false);
                        setSquareMode(v => !v);
                      }}
                      aria-pressed={squareMode}
                    >
                      Square
                    </button>
                    <button
                      className={twMerge(
                        'border-2 py-2 text-xs font-semibold tracking-tighter dark:border-blue-400',
                        size === 'base'
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-blue-200 bg-transparent text-blue-400'
                      )}
                      style={{ borderWidth: '3px' }}
                      onClick={() => {
                        setSize('base');
                      }}
                      aria-pressed={squareMode}
                    >
                      Normal - <span className="font-normal">24x24</span>
                    </button>
                    <button
                      className={twMerge(
                        'border-2 py-2 text-xs font-semibold tracking-tighter dark:border-blue-400',
                        size === 'sm'
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-blue-200 bg-transparent text-blue-400'
                      )}
                      style={{ borderWidth: '3px' }}
                      onClick={() => {
                        setSize('sm');
                      }}
                      aria-pressed={squareMode}
                    >
                      Mini - <span className="font-normal">20x20</span>
                    </button>
                  </motion.div>
                </div>

                {Object.keys(data).filter(icon => {
                  if (
                    (searchTerm !== '' &&
                      icon.includes(searchTerm.toLowerCase())) ||
                    searchTerm === '' ||
                    data[icon].keywords.some((value: string) =>
                      value.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  ) {
                    return true;
                  }
                }).length === 0 && (
                  <motion.div
                    layout
                    className="flex w-full flex-col items-center justify-center gap-4 pt-3 text-blue-400 sm:pt-10 md:pt-14"
                  >
                    <span className="scale-150">
                      <svg
                        height="24"
                        width="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="8.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8.96 15.474c-.176.178-.453.228-.657.082a6.582 6.582 0 0 1-.48-.38.449.449 0 0 1-.035-.648c1.084-1.157 2.57-1.87 4.212-1.87 1.7 0 3.235.765 4.326 1.996a.449.449 0 0 1-.052.647 6.27 6.27 0 0 1-.492.366c-.207.14-.482.082-.653-.1-.827-.883-1.947-1.41-3.129-1.41-1.14 0-2.222.49-3.04 1.317Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                        <path
                          d="M10 9a1.25 1.25 0 1 1-2.5 0A1.25 1.25 0 0 1 10 9Zm6.5 0A1.25 1.25 0 1 1 14 9a1.25 1.25 0 0 1 2.5 0Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <p className="text-sm font-medium">
                      No icons found with the name{' '}
                      <span className="font-bold">{searchTerm}</span>
                    </p>
                  </motion.div>
                )}

                <motion.div
                  layout
                  className="grid w-full grid-flow-row grid-cols-1 gap-5 @xs:grid-cols-2 @md:grid-cols-4 @2xl:grid-cols-6 @[59rem]:grid-cols-10"
                >
                  <AnimatePresence>
                    {Object.keys(data).map(icon => {
                      if (
                        (searchTerm !== '' &&
                          icon.includes(searchTerm.toLowerCase())) ||
                        searchTerm === '' ||
                        data[icon].keywords.some((value: string) =>
                          value.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                      ) {
                        return (
                          <motion.div
                            key={icon}
                            layout
                            initial={{ y: 20, opacity: 0.6 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ stiffness: 100 }}
                            viewport={{ once: true }}
                            className="bg-white"
                          >
                            <Icon
                              setDialog={setShowDialog}
                              selected={selected}
                              setSelected={setSelected}
                              name={icon}
                              data={data[icon]}
                              size={size}
                              icon={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      size === 'base'
                                        ? data[icon].variants.standard.base.svg
                                        : data[icon].variants.standard.sm.svg
                                  }}
                                  className="text-gray-800 dark:text-gray-200"
                                ></div>
                              }
                            />
                          </motion.div>
                        );
                      }
                    })}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              <IconInfoPanelSideBar
                className="hidden sm:block"
                showDialog={showDialog}
                selected={selected}
                setSelected={setSelected}
                setDialog={setShowDialog}
                setShowDialog={setShowDialog}
                data={data}
                size={size}
                allowDownload={true}
                wrapper={wrapper}
              />
            </LayoutGroup>
          </div>
        </motion.main>
      </div>
      <Footer />
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { s, selected, size, variant } = query;
  return { s, selectedParam: selected, sizeParam: size, variant };
};
