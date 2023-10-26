import { AnimatePresence, motion } from "framer-motion";
import { KeyboardEvent, useCallback, useEffect } from "react";

interface PopupProps {
  header: JSX.Element;
  show: boolean;
  close: () => void;
  children: JSX.Element;
}

export default function Popup({ header, show, close, children }: PopupProps) {
  const keyListener = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyListener, false);
    return () => {
      document.removeEventListener("keydown", keyListener, false);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0, originY: 1 }}
          animate={{ opacity: 1, scaleY: 1, originY: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
          }}
          onClick={() => close()}
          className="fixed top-0 left-0 right-0 z-20 flex justify-center h-screen pt-0 overflow-y-auto backdrop-blur-sm sm:pt-10"
        >
          <div className="">
            <div
              className="flex flex-col bg-white border rounded-sm shadow-xl md:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between w-full h-12 p-2 bg-blue-100">
                <p className="ml-3 text-sm font-semibold tracking-tight text-blue-800">
                  {header}
                </p>
                <button
                  onClick={() => close()}
                  className="p-1 text-blue-800 transition-all rounded hover:bg-blue-200"
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
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
