import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

export default function Popup({ header, show, close, children }) {
  const keyListener = useCallback((e) => {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.1,
          }}
          onClick={() => close()}
          className="z-20 fixed inset-0 backdrop-blur-sm flex justify-center pt-10"
        >
          <div className="p-5">
            <div
              className="bg-white shadow-xl border flex flex-col rounded-sm md:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between p-2 bg-blue-100">
                <p className="text-sm font-semibold text-blue-800 tracking-tight ml-3">
                  {header}
                </p>
                <button
                  onClick={() => close()}
                  className="hover:bg-blue-200 text-blue-800 p-1 rounded transition-all"
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
              {/* <hr className="mx-2"></hr> */}
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
