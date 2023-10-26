import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface CopyBtnProps {
  className: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
}

export default function CopyBtn({ className, onClick, title }: CopyBtnProps) {
  return (
    <motion.button
      whileTap={{
        scale: 1.1,
      }}
      className={`hover:bg-opacity-50 bg-blue-600 bg-opacity-30 h-full mx-2 flex items-center justify-center cursor-pointer ${
        className || ""
      }`}
      onClick={onClick}
    >
      <p className="text-xs font-semibold tracking-tighter text-blue-600 cursor-pointer">
        {title}
      </p>
    </motion.button>
  );
}
