import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';

type IconButtonProps = {
  children: React.ReactNode;
} & React.PropsWithChildren<React.ComponentPropsWithRef<'button'>> &
  HTMLMotionProps<'button'>;

const IconButton: React.FC<IconButtonProps> = forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <motion.button
        {...props}
        ref={ref}
        className="flex size-7 items-center justify-center rounded-sm text-gray-900 transition-all hover:bg-blue-50 dark:text-gray-200 dark:hover:text-gray-900"
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
