import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Meta from "../meta.json";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const IconInfoPanel = (props) => {
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
    console.log(out);
    return out;
  };

  return (
    <AnimatePresence>
      {props.showDialog && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0, originX: 1 }}
          animate={{ scaleX: 1, opacity: 1, originX: 1 }}
          exit={{ scaleX: 0, opacity: 0, originX: 1 }}
          className={`
              border-blue-600
            px-6 py-5 relative  w-full xs:w-full sm:w-full md:w-full bg-white lg:w-1/3 h-screen xs:h-auto sm:h-auto lg:h-auto ${props.className}`}
          style={{ borderWidth: "3px" }}
        >
          {/* <div
            className="flex justify-end -mx-6 -my-5 mb-3 px-6 py-3 border-blue-200 "
            style={{ borderBottomWidth: "2px" }}
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
          </div> */}

          <div className="flex justify-between">
            <h3 className="font-semibold text-blue-600 text-base">
              {props.selected}
            </h3>
            <div className="flex">
              <a href={`icons/png/${props.selected}.png`} download>
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
              </a>
              <button
                className="ml-4"
                onClick={() => {
                  props.setDialog(false);
                  props.setSelected("");
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
              className="border-blue-200 mt-8  p-2  flex items-center justify-center relative w-full h-24"
              style={{ borderWidth: "3px" }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: Meta[props.selected].svg,
                }}
              ></div>
            </div>
          </div>

          <div
            className=" h-full overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <h3 className="font-semibold text-blue-600 text-base mt-8 flex items-center">
              #
              <span className="text-blue-400 text-xs ml-1">
                {Meta[props.selected].tags.join(", ")}
              </span>
            </h3>

            <div className="flex mt-7">
              <div className="hover:bg-opacity-50 bg-blue-600 bg-opacity-30 h-10 w-full mr-2 flex items-center justify-center cursor-pointer">
                <p
                  className="font-semibold tracking-tighter text-blue-600 text-xs cursor-pointer"
                  href="https://www.will-kelly.co.uk"
                  onClick={() => {
                    navigator.clipboard.writeText(Meta[props.selected].svg);
                  }}
                >
                  Copy SVG
                </p>
              </div>

              <div className="hover:bg-opacity-50 bg-blue-600 bg-opacity-30 h-10 w-full  ml-2 flex items-center justify-center cursor-pointer">
                <p
                  className="font-semibold tracking-tighter text-blue-600 text-xs cursor-pointer"
                  href="https://www.will-kelly.co.uk"
                  onClick={() => {
                    navigator.clipboard.writeText(Meta[props.selected].jsx);
                  }}
                >
                  Copy JSX
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-blue-400 text-xs  mt-8 flex items-center">
              More like this...
            </h3>

            <div className="w-full mt-8">
              <div className="w-full grid grid-cols-2 xs:grid-cols-3   grid-flow-row  gap-5">
                {findSimilar(props.selected).map((value) => (
                  <Icon
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
    >
      <p
        className="font-semibold tracking-tighter text-blue-600 text-xs cursor-pointer"
        href="https://www.will-kelly.co.uk"
        onClick={props.onClick}
      >
        {props.title}
      </p>
    </motion.button>
  );
};

const Icon = (props) => {
  const [showOpts, setShowOpts] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (props.selected === "") {
          props.setDialog(true);
          props.setSelected(props.name);
        } else if (props.selected === props.name) {
          props.setDialog(false);
          props.setSelected("");
        } else {
          props.setSelected(props.name);
        }
      }}
    >
      <div
        className={`${
          showOpts || props.selected === props.name || hover
            ? "border-blue-600"
            : "border-blue-200"
        }  p-2  flex items-center justify-center relative w-full h-28`}
        style={{ borderWidth: "3px" }}
        onMouseEnter={() => setShowOpts(true)}
        onMouseLeave={() => setShowOpts(false)}
      >
        {props.icon}
        {showOpts && (
          <div className="absolute w-full h-full flex flex-col">
            <CopyBtn
              className="mb-1 mt-2"
              title={"Copy SVG"}
              onClick={(e) => {
                navigator.clipboard.writeText(Meta[props.name].svg);
                e.stopPropagation();
              }}
            />

            <CopyBtn
              className="mt-1 mb-2"
              title={"Copy JSX"}
              onClick={(e) => {
                navigator.clipboard.writeText(Meta[props.name].jsx);
                e.stopPropagation();
              }}
            />

            {/* <div className="hover:bg-opacity-50 bg-blue-600 bg-opacity-30 h-full mx-2 mb-1 mt-2 flex items-center justify-center cursor-pointer">
              <p
                className="font-semibold tracking-tighter text-blue-600 text-xs cursor-pointer"
                href="https://www.will-kelly.co.uk"
                onClick={(e) => {
                  navigator.clipboard.writeText(Meta[props.name].svg);
                  e.stopPropagation();
                }}
              >
                Copy SVG
              </p>
            </div> */}

            {/* <div className="hover:bg-opacity-50 bg-blue-600 bg-opacity-30 h-full mx-2 mb-2 mt-1 flex items-center justify-center cursor-pointer">
              <p
                className="font-semibold tracking-tighter text-blue-600 text-xs "
                href="https://www.will-kelly.co.uk"
                onClick={(e) => {
                  navigator.clipboard.writeText(Meta[props.name].jsx);
                  e.stopPropagation();
                }}
              >
                Copy JSX
              </p>
            </div> */}
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
    </div>
  );
};

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState(Meta);
  const [noShowing, setNoShowing] = useState(Object.keys(Meta).length);
  const [selected, setSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef(null);

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

  return (
    <div className=" font-sans flex flex-col justify-between min-h-screen">
      <AnimateSharedLayout>
        <div>
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

          <header className="flex items-center justify-between px-5 pt-10 sm:px-16 sm:pt-14">
            <h1 className="text-blue-600 font-display font-bold text-xl">
              IKONO
            </h1>
            <nav className="font-sans text-sm flex font-semibold tracking-tighter">
              {/* <p className="pr-5">VSCode</p> */}
              <a
                href="https://github.com/wkelly1/IKONO"
                alt="IKONO github"
                className="px-5"
              >
                React
              </a>
              {/* <p className="pl-5">Support Us</p> */}
            </nav>
          </header>

          <div className="visible sm:hidden fixed z-10 top-0 right-0 w-5/6 max-h-screen">
            <IconInfoPanel
              setSelected={setSelected}
              setDialog={setShowDialog}
              showDialog={showDialog}
              selected={selected}
              setShowDialog={setShowDialog}
              data={data}
            />
          </div>

          <main className="mt-10 px-5  sm:px-16 ">
            <div className="bg-blue-600 h-60 flex flex-col justify-between px-10 py-6">
              <div></div>
              <div>
                <p className="font-bold text-white text-3xl">
                  ICONS ARE EASIER THAN WORDS
                </p>
              </div>
            </div>

            <div
              className="mt-8 border-blue-200 p-2 h-14 flex items-center"
              style={{ borderWidth: "3px" }}
            >
              <div className="text-blue-700 ml-1">
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
              <input
                placeholder="Search"
                ref={searchInput}
                className="ml-3 text-blue-600 placeholder-blue-400 font-semibold border-none outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
              <p className="text-xs font-semibold tracking-tighter pr-2">
                {noShowing}/{Object.keys(data).length}
              </p>
            </div>

            <div className="flex w-full justify-between mt-8">
              <div className="w-full">
                <motion.div
                  layout
                  className="w-full grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-8  grid-flow-row  gap-5"
                >
                  {Object.keys(data).map((icon) => {
                    if (
                      (searchTerm !== "" && icon.includes(searchTerm)) ||
                      searchTerm === "" ||
                      data[icon].tags.some((value) =>
                        value.includes(searchTerm)
                      )
                    ) {
                      return (
                        <Icon
                          setDialog={setShowDialog}
                          selected={selected}
                          setSelected={setSelected}
                          name={icon}
                          icon={
                            <div
                              dangerouslySetInnerHTML={{
                                __html: Meta[icon].svg,
                              }}
                              className="text-gray-800"
                            ></div>
                          }
                        />
                      );
                    }
                  })}

                  {/* <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} />
              <Icon showDialog={setShowDialog} /> */}
                </motion.div>
              </div>

              <IconInfoPanel
                className="ml-5 hidden xs:block sm:block lg:block"
                showDialog={showDialog}
                selected={selected}
                setSelected={setSelected}
                setDialog={setShowDialog}
                setShowDialog={setShowDialog}
                data={data}
              />
            </div>
          </main>
        </div>
        <motion.footer
          layout
          className="mt-10 bg-blue-200 h-32 w-full px-5 py-10 sm:px-16 sm:py-14 flex items-center justify-between"
        >
          <div
            className="flex items-center"
            role="img"
            aria-label="Will Kelly profile picture"
          >
            <img
              className=" mr-3 w-8 h-8 rounded-full"
              src="/images/profile_picture.webp"
              alt="Will Kelly profile picture"
            />
            <div className="text-sm tracking-tighter leading-3">
              <p className="font-medium text-blue-500">Created by</p>
              <a
                className="font-semibold text-blue-600 text-base cursor-pointer"
                href="https://www.will-kelly.co.uk"
              >
                @Will Kelly
              </a>
            </div>
          </div>
          <a
            className="font-semibold text-blue-600 text-base cursor-pointer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "Check out this icon pack IKONO by @WillKelly__ 😮"
            )}&url=${encodeURIComponent("https://ikono.will-kelly.co.uk")}`}
          >
            Share
          </a>
        </motion.footer>
      </AnimateSharedLayout>
    </div>
  );
}
