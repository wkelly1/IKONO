import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Meta from "../meta.json";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import updateSearchParam from "../lib/updateSearchParam";
import parse from "node-html-parser";
import { DebounceInput } from "react-debounce-input";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import IconInfoPanel from "../components/IconInfoPanel/IconInfoPanel";
import Icon from "../components/Icon/Icon";

interface HomeProps {
  s: string;
  selectedParam: string;
}

export type MetaType = typeof Meta;

export default function Home({ s, selectedParam }: HomeProps) {
  const [showDialog, setShowDialog] = useState<boolean>(
    selectedParam !== undefined
  );
  const [initialData, setInitialData] = useState(Meta);
  const [data, setData] = useState<MetaType>(Meta);
  const [noShowing, setNoShowing] = useState<number>(Object.keys(Meta).length);
  const [selected, setSelected] = useState<string>(selectedParam || "");
  const [searchTerm, setSearchTerm] = useState<string>(s || "");
  const [circleMode, setCircleMode] = useState<boolean>(false);
  const [squareMode, setSquareMode] = useState<boolean>(false);
  const searchInput = useRef(null);

  const convertToJSX = (svg: string) => {
    return svg.replace(/[a-z]*-[a-z]*=/g, (group) => {
      let index = group.indexOf("-") + 1;
      let newString =
        group.substring(0, index) +
        group[index].toUpperCase() +
        group.substring(index + 1);
      return newString.replace("-", "");
    });
  };

  const generateCircles = (dataToConvert: MetaType): MetaType => {
    const newData = {};

    Object.entries(dataToConvert).forEach(function ([key, value]) {
      const svg = parse(value.svg);
      const path = parse(
        '<path d="M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z" stroke="currentColor" stroke-width="1.5"/>'
      );
      const g = parse("<g transform='scale(0.7) translate(5, 5)'/>");
      svg.childNodes[0].childNodes.forEach((child) =>
        // @ts-ignore
        g.childNodes[0].appendChild(child)
      );
      // @ts-ignore
      svg.childNodes[0].appendChild(g);
      // @ts-ignore
      svg.childNodes[0].appendChild(path);

      newData[key] = {
        svg: svg.toString(),
        jsx: convertToJSX(svg.toString()),
        tags: value.tags,
      };
    });
    return newData as MetaType;
  };
  const generateSquares = (dataToConvert: MetaType): MetaType => {
    const newData = {};

    Object.entries(dataToConvert).forEach(function ([key, value]) {
      const svg = parse(value.svg);
      const path = parse(
        '<rect x="1.75" y="1.75" width="20.5" height="20.5" rx="3" stroke="currentColor" stroke-width="1.5"/>'
      );
      const g = parse("<g transform='scale(0.7) translate(5, 5)' />");
      svg.childNodes[0].childNodes.forEach((child) =>
        // @ts-ignore
        g.childNodes[0].appendChild(child)
      );
      // @ts-ignore
      svg.childNodes[0].appendChild(g);
      // @ts-ignore
      svg.childNodes[0].appendChild(path);
      newData[key] = {
        svg: svg.toString(),
        jsx: convertToJSX(svg.toString()),
        tags: value.tags,
      };
    });
    return newData as MetaType;
  };

  const circleData: MetaType = useMemo(
    () => generateCircles(initialData),
    [initialData]
  );
  const squareData: MetaType = useMemo(
    () => generateSquares(initialData),
    [initialData]
  );

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
        data[icon].tags.some((value: string) => value.includes(searchTerm))
      ) {
        no++;
      }
    });
    setNoShowing(no);
  }, [searchTerm]);

  const handleKeyPress = useCallback((e: globalThis.KeyboardEvent) => {
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
        <Navbar active={"Icons"} />

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
                    data[icon].tags.some((value: string) =>
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
                        data[icon].tags.some((value: string) =>
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
