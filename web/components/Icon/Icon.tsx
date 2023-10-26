import updateSearchParam from '../../lib/updateSearchParam';
import CopyBtn from '../CopyBtn/CopyBtn';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';

interface IconProps {
  setDialog: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  name: string;
  data: {
    tags: string[];
    jsx: string;
    jsxMini: string;
    svg: string;
    svgMini: string;
  };
  size: 'small' | 'normal';
  icon: JSX.Element;
}

export default function Icon({
  setDialog,
  selected,
  setSelected,
  name,
  data,
  size,
  icon
}: IconProps) {
  const [showOpts, setShowOpts] = useState(false);
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAnimation = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <motion.div
      className="flex cursor-pointer flex-col items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (selected === '') {
          setDialog(true);
          setSelected(name);
          updateSearchParam('selected', name);
        } else if (selected === name) {
          setDialog(false);
          setSelected('');
          updateSearchParam('selected', '');
        } else {
          setSelected(name);
          updateSearchParam('selected', name);
        }
      }}
    >
      <div
        className={`${
          showOpts || selected === name || hover
            ? 'border-blue-600'
            : 'border-blue-200'
        }  relative  flex h-28 w-full flex-col items-center justify-center p-2`}
        style={{ borderWidth: '3px' }}
        onMouseEnter={() => setShowOpts(true)}
        onMouseLeave={() => setShowOpts(false)}
      >
        <motion.div>{icon}</motion.div>
        <AnimatePresence>
          {copied && (
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

        {showOpts && !copied && (
          <div className="absolute flex h-full w-full flex-col">
            <CopyBtn
              className="mt-2 mb-1"
              title={'Copy SVG'}
              onClick={e => {
                navigator.clipboard.writeText(
                  size === 'normal' ? data.svg : data.svgMini
                );
                e.stopPropagation();
                copyAnimation();
              }}
            />

            <CopyBtn
              className="mt-1 mb-2"
              title={'Copy JSX'}
              onClick={e => {
                navigator.clipboard.writeText(
                  size === 'normal' ? data.jsx : data.jsxMini
                );
                e.stopPropagation();
                copyAnimation();
              }}
            />
          </div>
        )}
      </div>

      <p
        className={`${
          showOpts || selected === name || hover
            ? 'text-blue-600'
            : 'text-black'
        } mt-2 text-xs font-semibold tracking-tighter`}
      >
        {name}
      </p>
    </motion.div>
  );
}
