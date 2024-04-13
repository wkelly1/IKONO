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
        className="size-7 flex items-center justify-center transition-all"
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
