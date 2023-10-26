import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import updateSearchParam from "../../lib/updateSearchParam";
import CopyBtn from "../CopyBtn/CopyBtn";

export default function Icon(props) {
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
}
