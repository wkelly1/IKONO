export interface IconProps extends React.ComponentPropsWithRef<'svg'> {
  /** A color formatted string used to change the colour of the icon.
   * If set to `currentColor` then it will inherit the colour from
   * the text colour. */
  color: string;
  /** The size of the icon. */
  size: 'sm' | 'base';
}
