import { motion } from 'framer-motion';

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
      className={`mx-2 flex h-full cursor-pointer items-center justify-center bg-blue-600 bg-opacity-30 hover:bg-opacity-50 dark:bg-blue-400 dark:hover:bg-blue-500 ${
        className || ''
      }`}
      onClick={onClick}
    >
      <p className="cursor-pointer text-xs font-semibold tracking-tighter text-blue-600 dark:text-blue-900">
        {title}
      </p>
    </motion.button>
  );
}
