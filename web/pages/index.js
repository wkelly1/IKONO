import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Meta from "../meta.json";
import {
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
  motion,
} from "framer-motion";
import updateSearchParam from "../lib/updateSearchParam";
import parse from "node-html-parser";
import { DebounceInput } from "react-debounce-input";
import Link from "next/link";

const IconInfoPanel = (props) => {
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

  const findSimilar = (icon) => {
    let out = [];
    Object.keys(props.data).forEach((value) => {
      let tags = props.data[value].tags;
      tags.filter((value) => props.data[icon].tags.includes(value));
      if (
        tags.filter((value) => props.data[icon].tags.includes(value)).length > 0
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
      {props.showDialog && (
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
            originX: 1,
            transition: { duration: 0.3, type: "spring" },
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
            originX: 1,
            transition: { duration: 0.3, type: "spring" },
          }}
          exit={{
            opacity: 0,
            originX: 1,
            transition: { duration: 0.2, type: "spring" },
          }}
          className={`
              border-blue-600 w-full xs:w-full sm:w-full md:w-full bg-white lg:w-1/3
            px-6 py-5 relative h-screen xs:h-auto sm:h-auto lg:h-auto ${props.className}`}
          style={{ borderWidth: "3px" }}
        >
          <div className="flex justify-between">
            <h3 className="text-base font-semibold text-blue-600">
              {props.selected}
            </h3>
            <div className="flex">
              <AnimatePresence>
                {props.allowDownload && (
                  <motion.a
                    initial={{ opacity: 0, transition: { duration: 0.1 } }}
                    animate={{ opacity: 1, transition: { duration: 0.1 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    href={`icons/png/${props.selected}.png`}
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
                  props.setDialog(false);
                  props.setSelected("");
                  updateSearchParam("selected", "");
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
              className="relative flex items-center justify-center w-full h-24 p-2 mt-8 border-blue-200"
              style={{ borderWidth: "3px" }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: props.data[props.selected].svg,
                }}
              ></div>
            </div>
          </div>

          <div
            className="h-full overflow-y-auto "
            style={{ scrollbarWidth: "none" }}
          >
            <h3 className="flex items-center mt-8 text-base font-semibold text-blue-600">
              #
              <span className="ml-1 text-xs text-blue-400">
                {Meta[props.selected].tags.join(", ")}
              </span>
            </h3>

            <div className="flex mt-7">
              <button
                className="relative flex items-center justify-center w-full h-10 mr-2 text-xs font-semibold tracking-tighter text-blue-600 transition-all bg-blue-600 hover:bg-opacity-50 bg-opacity-30"
                onClick={() => {
                  console.log(Meta[props.selected]);
                  navigator.clipboard.writeText(props.data[props.selected].svg);
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
                className="relative flex items-center justify-center w-full h-10 mr-2 text-xs font-semibold tracking-tighter text-blue-600 transition-all bg-blue-600 hover:bg-opacity-50 bg-opacity-30"
                onClick={() => {
                  console.log(Meta[props.selected]);
                  navigator.clipboard.writeText(props.data[props.selected].jsx);
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

            <h3 className="flex items-center mt-8 text-xs font-semibold text-blue-400">
              More like this...
            </h3>

            <div className="w-full mt-8">
              <div className="grid w-full grid-flow-row grid-cols-2 gap-5 xs:grid-cols-3">
                {findSimilar(props.selected).map((value) => (
                  <Icon
                    key={value}
                    setDialog={props.setShowDialog}
                    selected={props.selected}
                    setSelected={props.setSelected}
                    name={value}
                    icon={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Meta[value].svg,
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
};

const CopyBtn = (props) => {
  return (
    <motion.button
      whileTap={{
        scale: 1.1,
      }}
      className={`hover:bg-opacity-50 bg-blue-600 bg-opacity-30 h-full mx-2 flex items-center justify-center cursor-pointer ${
        props.className || ""
      }`}
      onClick={props.onClick}
    >
      <p
        className="text-xs font-semibold tracking-tighter text-blue-600 cursor-pointer"
        href="https://www.will-kelly.co.uk"
      >
        {props.title}
      </p>
    </motion.button>
  );
};

const Icon = (props) => {
  const [showOpts, setShowOpts] = useState(false);
  const [hover, setHover] = useState(false);
  const [coppied, setCoppied] = useState(false);

  const copyAnimation = () => {
    setCoppied(true);
    setTimeout(() => {
      setCoppied(false);
    }, 1000);
  };

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        console.log("selecting", props.selecting);
        if (props.selected === "") {
          props.setDialog(true);
          props.setSelected(props.name);
          updateSearchParam("selected", props.name);
        } else if (props.selected === props.name) {
          props.setDialog(false);
          props.setSelected("");
          updateSearchParam("selected", "");
        } else {
          props.setSelected(props.name);
          updateSearchParam("selected", props.name);
        }
      }}
    >
      <div
        className={`${
          showOpts || props.selected === props.name || hover
            ? "border-blue-600"
            : "border-blue-200"
        }  p-2  flex flex-col items-center justify-center relative w-full h-28`}
        style={{ borderWidth: "3px" }}
        onMouseEnter={() => setShowOpts(true)}
        onMouseLeave={() => setShowOpts(false)}
      >
        <motion.div>{props.icon}</motion.div>
        <AnimatePresence>
          {coppied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-semibold tracking-tighter text-blue-500"
            >
              Copied!
            </motion.p>
          )}
        </AnimatePresence>

        {showOpts && !coppied && (
          <div className="absolute flex flex-col w-full h-full">
            <CopyBtn
              className="mt-2 mb-1"
              title={"Copy SVG"}
              onClick={(e) => {
                navigator.clipboard.writeText(props.data.svg);
                e.stopPropagation();
                copyAnimation();
              }}
            />

            <CopyBtn
              className="mt-1 mb-2"
              title={"Copy JSX"}
              onClick={(e) => {
                navigator.clipboard.writeText(props.data.jsx);
                e.stopPropagation();
                copyAnimation();
              }}
            />
          </div>
        )}
      </div>

      <p
        className={`${
          showOpts || props.selected === props.name || hover
            ? "text-blue-600"
            : "text-black"
        } font-semibold text-xs tracking-tighter mt-2`}
      >
        {props.name}
      </p>
    </motion.div>
  );
};

export default function Home({ s, selectedParam }) {
  const [showDialog, setShowDialog] = useState(selectedParam !== undefined);
  const [initialData, setInitialData] = useState(Meta);
  const [data, setData] = useState(Meta);
  const [noShowing, setNoShowing] = useState(Object.keys(Meta).length);
  const [selected, setSelected] = useState(selectedParam || "");
  const [searchTerm, setSearchTerm] = useState(s || "");
  const [circleMode, setCircleMode] = useState(false);
  const [squareMode, setSquareMode] = useState(false);
  const searchInput = useRef(null);

  const convertToJSX = (svg) => {
    return svg.replace(/[a-z]*-[a-z]*=/g, (group) => {
      let index = group.indexOf("-") + 1;
      let newString =
        group.substring(0, index) +
        group[index].toUpperCase() +
        group.substring(index + 1);
      return newString.replace("-", "");
    });
  };

  const generateCircles = (dataToConvert) => {
    const newData = {};

    Object.entries(dataToConvert).forEach(function ([key, value]) {
      const svg = parse(value.svg);
      const path = parse(
        '<path d="M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z" stroke="currentColor" stroke-width="1.5"/>'
      );
      const g = parse("<g transform='scale(0.7) translate(5, 5)'/>");
      svg.childNodes[0].childNodes.forEach((child) =>
        g.childNodes[0].appendChild(child)
      );
      svg.childNodes[0].appendChild(g);
      svg.childNodes[0].appendChild(path);

      newData[key] = {
        svg: svg.toString(),
        jsx: convertToJSX(svg.toString()),
        tags: value.tags,
      };
    });
    return newData;
  };
  const generateSquares = (dataToConvert) => {
    const newData = {};

    Object.entries(dataToConvert).forEach(function ([key, value]) {
      const svg = parse(value.svg);
      const path = parse(
        '<rect x="1.75" y="1.75" width="20.5" height="20.5" rx="3" stroke="currentColor" stroke-width="1.5"/>'
      );
      const g = parse("<g transform='scale(0.7) translate(5, 5)' />");
      svg.childNodes[0].childNodes.forEach((child) =>
        g.childNodes[0].appendChild(child)
      );
      svg.childNodes[0].appendChild(g);
      svg.childNodes[0].appendChild(path);
      newData[key] = {
        svg: svg.toString(),
        jsx: convertToJSX(svg.toString()),
        tags: value.tags,
      };
    });
    return newData;
  };

  const circleData = useMemo(() => generateCircles(initialData), [initialData]);
  const squareData = useMemo(() => generateSquares(initialData), [initialData]);

  useEffect(() => {
    if (circleMode) {
      setData(circleData);
    } else {
      setData(initialData);
    }
  }, [circleMode]);

  useEffect(() => {
    if (squareMode) {
      setData(squareData);
    } else {
      if (!circleMode) {
        setData(initialData);
      }
    }
  }, [squareMode]);

  useEffect(() => {
    let no = 0;
    Object.keys(data).map((icon) => {
      if (
        (searchTerm !== "" && icon.includes(searchTerm)) ||
        searchTerm === "" ||
        data[icon].tags.some((value) => value.includes(searchTerm))
      ) {
        no++;
      }
    });
    setNoShowing(no);
  }, [searchTerm]);

  const handleKeyPress = useCallback((e) => {
    if (e.metaKey && e.key === "k") {
      e.preventDefault();
      searchInput.current.focus();
    }
    if (e.key === "Escape") {
      setSearchTerm("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen font-sans ">
      <div className="overflow-x-hidden">
        <Head>
          <title>IKONO</title>
          <link rel="icon" href="/favicon.ico" />

          <meta name="og:url" content="https://ikono.will-kelly.co.uk" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="IKONO" />
          <meta
            property="og:description"
            content="Free SVG icon pack with MIT license."
          />
          <meta property="og:title" content="IKONO" />
          <meta
            property="og:image"
            content="https://ikono.will-kelly.co.uk/banner.png"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@WillKelly__" />
          <meta name="twitter:title" content="IKONO" />
          <meta name="twitter:text:title" content="IKONO" />
          <meta
            name="twitter:description"
            content="Free SVG icon pack with MIT license"
          />
          <meta name="twitter:app:name:iphone" content="IKONO" />
          <meta name="twitter:app:name:ipad" content="IKONO" />
          <meta name="twitter:app:name:googleplay" content="IKONO" />
          <meta
            name="twitter:image"
            content="https://ikono.will-kelly.co.uk/banner.png"
          />

          <link
            rel="apple-touch-icon"
            href="/app_icons/apple-touch-icon-180x180.png"
            sizes="180x180"
          />
        </Head>
        <Link
          href="https://www.buymeacoffee.com/willk"
          className="flex items-center justify-between visible w-full gap-1 px-5 py-2 font-sans text-sm font-semibold tracking-tighter bg-yellow-400 shadow-sm sm:hidden shrink-0"
        >
          <div className="flex items-center">
            <svg
              height="24"
              width="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.429 7H4v6.6C4 16.35 6.856 18 9.714 18c2.858 0 5.715-1.65 5.715-4.4v-1.1m0-5.5C17.714 7 20 7.724 20 9.75s-1.143 3.3-4.571 2.75m0-5.5v5.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Buy me a coffee
          </div>
          <svg
            height="24"
            width="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m12.5 18.5 5.646-5.646a.5.5 0 0 0 0-.708L12.5 6.5m6 6h-13"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </Link>

        <header className="flex items-center justify-between px-5 pt-10 sm:px-16 sm:pt-14">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 font-display"
          >
            IKONO
          </Link>
          <nav className="flex flex-wrap items-center justify-end font-sans text-sm font-semibold tracking-tighter gap-x-10 gap-y-2">
            <Link
              href="https://www.buymeacoffee.com/willk"
              className="items-center hidden gap-1 px-5 py-1 bg-yellow-400 rounded-lg sm:flex shrink-0"
            >
              <svg
                height="24"
                width="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.429 7H4v6.6C4 16.35 6.856 18 9.714 18c2.858 0 5.715-1.65 5.715-4.4v-1.1m0-5.5C17.714 7 20 7.724 20 9.75s-1.143 3.3-4.571 2.75m0-5.5v5.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Buy me a coffee
            </Link>
            <Link href="/" className="text-blue-600 ">
              Icons
            </Link>
            <Link href="/ui" className="transition-all hover:text-blue-600">
              Example UI
            </Link>
            <Link
              href="https://github.com/wkelly1/IKONO"
              alt="IKONO github"
              className="transition-all hover:text-blue-600 "
            >
              React
            </Link>
          </nav>
        </header>

        <div className="fixed top-0 right-0 z-10 visible w-5/6 max-h-screen sm:hidden">
          <IconInfoPanel
            setSelected={setSelected}
            setDialog={setShowDialog}
            showDialog={showDialog}
            selected={selected}
            setShowDialog={setShowDialog}
            data={data}
          />
        </div>

        <main className="px-5 mt-10 sm:px-16 ">
          <div className="flex flex-col justify-between px-10 py-6 bg-blue-600 h-60">
            <div></div>
            <div>
              <p className="text-3xl font-bold text-white">
                ICONS ARE EASIER THAN WORDS
              </p>
            </div>
          </div>

          <div
            className="flex items-center p-2 mt-8 border-blue-200 h-14"
            style={{ borderWidth: "3px" }}
          >
            <div className="ml-1 text-blue-700">
              <svg
                height="24"
                width="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.293 22.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM17 10a7 7 0 0 1-7 7v2a9 9 0 0 0 9-9h-2Zm-7 7a7 7 0 0 1-7-7H1a9 9 0 0 0 9 9v-2Zm-7-7a7 7 0 0 1 7-7V1a9 9 0 0 0-9 9h2Zm7-7a7 7 0 0 1 7 7h2a9 9 0 0 0-9-9v2Zm4.793 13.207 6.5 6.5 1.414-1.414-6.5-6.5-1.414 1.414Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <DebounceInput
              debounceTimeout={200}
              placeholder="Search"
              inputRef={searchInput}
              className="w-full ml-3 font-semibold text-blue-600 placeholder-blue-400 border-none outline-none"
              value={searchTerm}
              onChange={(e) => {
                updateSearchParam("s", e.target.value);
                setSearchTerm(e.target.value);
              }}
            ></DebounceInput>
            <p className="flex px-2 py-1 mr-4 text-sm font-normal text-blue-300 border-2 border-blue-100">
              <span className="text-blue-200">⌘</span> K
            </p>
            <p className="flex justify-end text-xs font-semibold tracking-tighter pr-2 max-w-[50px] min-w-[50px]">
              {noShowing}/{Object.keys(data).length}
            </p>
          </div>

          <div className="flex justify-between w-full mt-5">
            <LayoutGroup>
              <motion.div className="w-full" layout>
                <div className="w-full">
                  <motion.div
                    className="grid w-full grid-flow-row grid-cols-2 gap-5 mb-8"
                    layout
                  >
                    <button
                      className={`border-2  py-2 font-semibold tracking-tighter text-xs ${
                        circleMode
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-transparent text-blue-400 border-blue-200"
                      }`}
                      style={{ borderWidth: "3px" }}
                      onClick={() => {
                        setSquareMode(false);
                        setCircleMode((v) => !v);
                      }}
                      aria-pressed={circleMode}
                    >
                      Circle
                    </button>
                    <button
                      className={`border-2  py-2 font-semibold tracking-tighter text-xs ${
                        squareMode
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-transparent text-blue-400 border-blue-200"
                      }`}
                      style={{ borderWidth: "3px" }}
                      onClick={() => {
                        setCircleMode(false);
                        setSquareMode((v) => !v);
                      }}
                      aria-pressed={squareMode}
                    >
                      Square
                    </button>
                  </motion.div>
                </div>

                {Object.keys(data).filter((icon) => {
                  if (
                    (searchTerm !== "" &&
                      icon.includes(searchTerm.toLowerCase())) ||
                    searchTerm === "" ||
                    data[icon].tags.some((value) =>
                      value.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  ) {
                    return true;
                  }
                }).length === 0 && (
                  <motion.div
                    layout
                    className="flex flex-col items-center justify-center w-full gap-4 pt-3 text-blue-400 sm:pt-10 md:pt-14"
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
                      No icons found with the name{" "}
                      <span className="font-bold">{searchTerm}</span>
                    </p>
                  </motion.div>
                )}

                <motion.div
                  layout
                  className="grid w-full grid-flow-row grid-cols-2 gap-5 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-8"
                >
                  <AnimatePresence>
                    {Object.keys(data).map((icon) => {
                      if (
                        (searchTerm !== "" &&
                          icon.includes(searchTerm.toLowerCase())) ||
                        searchTerm === "" ||
                        data[icon].tags.some((value) =>
                          value.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                      ) {
                        return (
                          <motion.div
                            key={icon}
                            layout
                            initial={{ scale: 0.6, origin: "center" }}
                            animate={{
                              scale: 1,
                              origin: "center",
                              transition: { type: "spring" },
                            }}
                            exit={{ opacity: 0, origin: "center" }}
                            className="bg-white"
                          >
                            <Icon
                              setDialog={setShowDialog}
                              selected={selected}
                              setSelected={setSelected}
                              name={icon}
                              data={data[icon]}
                              icon={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: data[icon].svg,
                                  }}
                                  className="text-gray-800"
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

              <IconInfoPanel
                className="hidden ml-5 xs:block sm:block lg:block"
                showDialog={showDialog}
                selected={selected}
                setSelected={setSelected}
                setDialog={setShowDialog}
                setShowDialog={setShowDialog}
                data={data}
                allowDownload={!circleMode && !squareMode}
              />
            </LayoutGroup>
          </div>
        </main>
      </div>
      <motion.footer
        layout
        className="flex items-center justify-between w-full h-32 px-5 py-10 mt-10 bg-blue-200 sm:px-16 sm:py-14"
      >
        <div
          className="flex items-center"
          role="img"
          aria-label="Will Kelly profile picture"
        >
          <img
            className="w-8 h-8 mr-3 rounded-full "
            src="/images/profile_picture.webp"
            alt="Will Kelly profile picture"
          />
          <div className="text-sm leading-3 tracking-tighter">
            <p className="font-medium text-blue-500">Created by</p>
            <a
              className="text-base font-semibold text-blue-600 cursor-pointer"
              href="https://www.will-kelly.co.uk"
            >
              Will Kelly
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <a
            className="text-base font-semibold text-blue-600 cursor-pointer"
            href={`https://www.will-kelly.co.uk/legal/privacy-policy`}
          >
            Legal
          </a>
          <a
            className="text-base font-semibold text-blue-600 cursor-pointer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "Check out this icon pack IKONO by @WillKelly__ 😮"
            )}&url=${encodeURIComponent("https://ikono.will-kelly.co.uk")}`}
          >
            Share
          </a>
        </div>
      </motion.footer>
    </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { s, selected } = query;

  return { s, selectedParam: selected };
};
