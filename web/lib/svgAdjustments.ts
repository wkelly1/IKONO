import parse from 'node-html-parser';

export const wrapInSquare = (
  svgInput: string,
  size: 'mini' | 'normal' = 'normal'
) => {
  const svg = parse(svgInput);

  const pathString =
    size === 'mini'
      ? '<path d="M15.6667 1.5H4.33333C2.76853 1.5 1.5 2.84315 1.5 4.5V15.5C1.5 17.1569 2.76853 18.5 4.33333 18.5H15.6667C17.2315 18.5 18.5 17.1569 18.5 15.5V4.5C18.5 2.84315 17.2315 1.5 15.6667 1.5Z" stroke="currentColor" stroke-width="1.25" fill="none"/>'
      : '<rect x="1.75" y="1.75" width="20.5" height="20.5" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>';
  const path = parse(pathString);

  const g = parse(
    `<g transform='scale(0.7) translate(${
      size === 'mini' ? '4.166, 4.166' : '5, 5'
    })'/>`
  );
  svg.childNodes[0].childNodes.forEach(child =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    g.childNodes[0].appendChild(child)
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  svg.childNodes[0].appendChild(g);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  svg.childNodes[0].appendChild(path);
  return svg;
};

export const wrapInCircle = (
  svgInput: string,
  size: 'mini' | 'normal' = 'normal'
) => {
  const modifiedSvgString = svgInput.replace(
    /stroke-width="([^"]+)"/,
    `stroke-width="${1.95}"`
  );
  const svg = parse(modifiedSvgString);
  const pathString =
    size === 'mini'
      ? '<path d="M19.1718 10C19.1718 15.0655 15.0654 19.1718 9.99994 19.1718C4.93449 19.1718 0.828125 15.0655 0.828125 10C0.828125 4.93455 4.93449 0.828186 9.99994 0.828186C15.0654 0.828186 19.1718 4.93455 19.1718 10Z" fill="none" stroke="currentColor" stroke-width="1.5 "/>'
      : '<path d="M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z" fill="none" stroke="currentColor" stroke-width="1.5"/>';
  const path = parse(pathString);

  const g = parse(
    `<g transform='scale(0.7) translate(${
      size === 'mini' ? '4.166, 4.166' : '5, 5'
    })'/>`
  );
  svg.childNodes[0].childNodes.forEach(child =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    g.childNodes[0].appendChild(child)
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  svg.childNodes[0].appendChild(g);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  svg.childNodes[0].appendChild(path);
  return svg;
};

/**
 * Update the colour of an SVG
 *
 * @param svgString SVG string to update the colours for
 * @param colour Colour to update to - e.g. 'ffffff'
 * @returns New SVG string
 */
export const setSVGColour = (svgString: string, colour: string) => {
  return svgString.replaceAll('currentColor', `#${colour}`);
};
