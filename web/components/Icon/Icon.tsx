import updateSearchParam from '../../lib/updateSearchParam';
import CopyBtn from '../CopyBtn/CopyBtn';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconProps {
  setDialog: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  name: string;
  data: {
    keywords: string[];
    variants: {
      standard: {
        base: {
          svg: string;
          jsx: string;
        };
        sm: {
          svg: string;
          jsx: string;
        };
      };
    };
  };
  size: 'sm' | 'base';
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
    <motion.button
      className="group flex h-full w-full cursor-pointer flex-col items-center bg-bg-primary text-fg-primary focus:outline-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (selected === '') {
          setDialog(true);
          setSelected(name);
          updateSearchParam('selected', name);
          updateSearchParam('size', size);
          updateSearchParam('variant', 'standard');
        } else if (selected === name) {
          setDialog(false);
          setSelected('');
          updateSearchParam('selected', '');
          updateSearchParam('size', '');
          updateSearchParam('variant', '');
        } else {
          setDialog(true);
          setSelected(name);
          updateSearchParam('selected', name);
          updateSearchParam('size', size);
          updateSearchParam('variant', 'standard');
        }
      }}
    >
      <div
        className={twMerge(
          'relative flex aspect-square w-full flex-col items-center justify-center p-2',
          showOpts || selected === name || hover
            ? 'border-border-primary group-focus:outline group-focus:outline-2 group-focus:outline-blue-300'
            : 'border-border-secondary group-focus:outline group-focus:outline-2 group-focus:outline-blue-500'
        )}
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
              className="text-xs font-semibold tracking-tighter text-fg-primary-accent"
            >
              Copied!
            </motion.p>
          )}
        </AnimatePresence>

        {showOpts && !copied && (
          <div className="absolute flex h-full w-full flex-col">
            <CopyBtn
              className="mb-1 mt-2"
              title={'Copy SVG'}
              onClick={e => {
                navigator.clipboard.writeText(
                  size === 'base'
                    ? data.variants.standard.base.svg
                    : data.variants.standard.sm.svg
                );
                e.stopPropagation();
                copyAnimation();
              }}
            />

            <CopyBtn
              className="mb-2 mt-1"
              title={'Copy JSX'}
              onClick={e => {
                navigator.clipboard.writeText(
                  size === 'base'
                    ? data.variants.standard.base.jsx
                    : data.variants.standard.sm.jsx
                );
                e.stopPropagation();
                copyAnimation();
              }}
            />
          </div>
        )}
      </div>

      <p
        className={twMerge(
          showOpts || selected === name || hover
            ? 'text-content-hover'
            : 'text-content-primary',
          'mt-2 text-xs font-semibold tracking-tighter'
        )}
      >
        {name}
      </p>
    </motion.button>
  );
}
