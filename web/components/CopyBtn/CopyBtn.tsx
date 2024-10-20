import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface CopyBtnProps {
  className: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
}

export default function CopyBtn({ className, onClick, title }: CopyBtnProps) {
  return (
    <motion.button
      whileTap={{
        scale: 1.1
      }}
      className={twMerge(
        'bg-bg-accent-secondary hover:bg-bg-accent-secondary-hover text-fg-accent-secondary hover:text-fg-accent-secondary-hover mx-2 flex h-full cursor-pointer items-center justify-center',
        className
      )}
      onClick={onClick}
    >
      <p className="cursor-pointer text-xs font-semibold tracking-tighter">
        {title}
      </p>
    </motion.button>
  );
}
