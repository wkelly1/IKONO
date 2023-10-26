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
      className={`mx-2 flex h-full cursor-pointer items-center justify-center bg-blue-600 bg-opacity-30 hover:bg-opacity-50 ${
        className || ''
      }`}
      onClick={onClick}
    >
      <p className="cursor-pointer text-xs font-semibold tracking-tighter text-blue-600">
        {title}
      </p>
    </motion.button>
  );
}
