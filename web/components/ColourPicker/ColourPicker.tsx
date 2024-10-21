import Tooltip from '../Tooltip/Tooltip';
import * as Popover from '@radix-ui/react-popover';
import { CSSProperties, forwardRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { twMerge } from 'tailwind-merge';

interface ColorPickerProps {
  color: string;
  onChange: (newColor: string) => void;
  chosenCustomColour: boolean;
}

function ColorPicker({
  color,
  onChange,
  chosenCustomColour
}: ColorPickerProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <ColourButton
          active={chosenCustomColour}
          tooltip="Custom Colour"
          colour={
            chosenCustomColour
              ? ''
              : 'bg-green-500 bg-gradient-to-r from-red-500'
          }
          innerStyle={
            chosenCustomColour ? { backgroundColor: `#${color}` } : {}
          }
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          side="left"
          className="z-20 bg-white shadow"
          align="end"
        >
          <SketchPicker
            disableAlpha
            color={`#${color}`}
            onChange={c => onChange(c.hex.substring(1).toUpperCase())}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

interface ColourButtonProps
  extends React.PropsWithChildren<React.ComponentPropsWithRef<'button'>> {
  colour: string;
  tooltip: string;
  active: boolean;
  innerStyle?: CSSProperties;
}

const ColourButton: React.FC<ColourButtonProps> = forwardRef(
  ({ colour, tooltip, className, active, innerStyle, ...props }, ref) => {
    return (
      <Tooltip tooltipChildren={tooltip}>
        <button
          className={twMerge(
            'border-border-neutral-primary m-[1px] w-full rounded-sm p-1 outline outline-2 outline-transparent hover:m-0 hover:border-2 hover:border-border-primary focus:outline focus:outline-2 focus:outline-border-secondary',
            className,
            active ? 'm-0 border-2 border-blue-500' : 'border'
          )}
          {...props}
          ref={ref}
        >
          <div
            className={twMerge('h-6 w-full rounded-sm', colour)}
            style={innerStyle}
          ></div>
        </button>
      </Tooltip>
    );
  }
);
ColourButton.displayName = 'ColourButton';

interface ColourSelectorProps {
  onChange: (colour: null | string) => void;
  colour: string;
}

export default function ColourSelector({
  onChange,
  colour
}: ColourSelectorProps) {
  const [isCustomColour, setIsCustomColour] = useState(false);
  const [currentlyActive, setCurrentlyActive] = useState(-1);
  return (
    <div className="mb-2 mt-4 border-[3px] border-border-secondary p-2">
      <p className="mb-2 text-xs font-medium tracking-tight">Colour</p>
      <div className="flex gap-2">
        <Tooltip tooltipChildren="Remove Colour">
          <button
            className="border-border-neutral-primary m-px flex w-full items-center justify-center rounded-sm border p-1 outline outline-2 outline-transparent hover:m-0 hover:border-2 hover:border-border-primary focus:outline focus:outline-2 focus:outline-border-secondary"
            onClick={() => {
              onChange(null);
              setIsCustomColour(false);
              setCurrentlyActive(-1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <g fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="7.583"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12.691 8.28a.686.686 0 0 0-.97-.971L10 9.029 8.28 7.31a.686.686 0 0 0-.971.97L9.029 10l-1.72 1.72a.686.686 0 0 0 .97.971L10 10.971l1.72 1.72a.686.686 0 0 0 .971-.97L10.971 10l1.72-1.72Z"
                  clipRule="evenodd"
                />
              </g>
            </svg>
          </button>
        </Tooltip>
        <ColourButton
          active={currentlyActive === 0}
          tooltip="Blue"
          colour="bg-blue-500"
          onClick={() => {
            onChange('#3B82F6');
            setIsCustomColour(false);
            setCurrentlyActive(0);
          }}
        />
        <ColourButton
          active={currentlyActive === 1}
          tooltip="Green"
          colour="bg-green-500"
          onClick={() => {
            onChange('#4caf50');
            setIsCustomColour(false);
            setCurrentlyActive(1);
          }}
        />
        <ColourButton
          active={currentlyActive === 2}
          tooltip="Red"
          colour="bg-red-500"
          onClick={() => {
            onChange('#f44336');
            setIsCustomColour(false);
            setCurrentlyActive(2);
          }}
        />
        <ColourButton
          active={currentlyActive === 3}
          tooltip="Yellow"
          colour="bg-yellow-500"
          onClick={() => {
            onChange('#EAB308');
            setIsCustomColour(false);
            setCurrentlyActive(3);
          }}
        />
        <ColorPicker
          color={colour}
          onChange={colour => {
            onChange(`#${colour}`);
            setIsCustomColour(true);
            setCurrentlyActive(-1);
          }}
          chosenCustomColour={isCustomColour}
        />
      </div>
    </div>
  );
}
