type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

const headingMap: { [key in HeadingLevel]: RegExp } = {
  h1: /^# (.*$)/gm,
  h2: /^## (.*$)/gm,
  h3: /^### (.*$)/gm,
  h4: /^#### (.*$)/gm
} as const;

/**
 * Remove markdown from a string
 *
 * @param markdown Markdown string
 * @returns String stripped of any markdown
 */
export function removeMarkdown(markdown: string) {
  const charsToRemove = ['***', '**', '__', '*'];
  return charsToRemove.reduce(
    (updatedMarkdown, currentMarkdownChars) =>
      updatedMarkdown.replaceAll(currentMarkdownChars, ''),
    markdown
  );
}

/**
 * Gets the headings from a markdown string
 *
 * @param content Markdown content string
 * @param headingLevel The heading level to get from the markdown
 * @param stripMarkdown Whether or not to remove the markdown and just return the string
 * @returns List of headings
 */
export function getHeadings(
  content: string,
  headingLevel: HeadingLevel,
  stripMarkdown?: boolean
) {
  const headingsRegex = headingMap[headingLevel];

  console.log(headingsRegex);
  // const matches = Array.from(content.matchAll(headingsRegex), m => m[1]);
  // console.log(matches);

  const matches = content.match(headingsRegex);

  console.log(matches, content);
  // If there are no matches, return an empty array
  if (!matches) {
    return [];
  }
  // Remove the markdown heading syntax and trim the results
  return matches.map(heading => heading.replace(/^#+ /, '').trim());

  if (stripMarkdown) {
    return matches.map(match => removeMarkdown(match));
  }

  return matches;
}

/**
 * Converts a heading to a link
 *
 * @param heading Heading to convert to link
 * @returns The link
 */
export function headingToLink(heading: string, addPrefix = true) {
  const anchor = heading
    .substring(2)
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '');

  return `${addPrefix ? '#' : ''}${anchor.replace(/ /g, '-')}`;
}
