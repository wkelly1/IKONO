import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = {
  children: React.ReactNode;
} & React.PropsWithChildren<React.ComponentPropsWithRef<'button'>> &
  HTMLMotionProps<'button'>;

const IconButton: React.FC<IconButtonProps> = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        {...props}
        ref={ref}
        className={twMerge(
          'flex size-7 items-center justify-center rounded-sm text-fg-primary transition-all hover:bg-bg-accent-secondary hover:text-fg-accent-secondary',
          className
        )}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
