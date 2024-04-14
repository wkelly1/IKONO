// Validate meta.json
import {
  iterateVariants,
  readInputFilenames,
  readInputMeta
} from '../scripts/lib';

type ErrorTypes = 'warning' | 'error';
type Log = {
  message: string;
  type: ErrorTypes;
};

const logs: Log[] = [];

function log(message: string, type: ErrorTypes) {
  logs.push({ message, type });
}

function reportLogs() {
  // Report errors
  const errors = logs.filter(log => log.type === 'error');
  errors.forEach(log => {
    console.error(log.message);
  });

  // Report warnings
  const warnings = logs.filter(log => log.type === 'warning');
  warnings.forEach(log => {
    console.error(log.message);
  });

  if (errors.length > 0) {
    console.error(`\nFailed with ${errors.length} errors.`);
    return process.exit(1);
  }
  console.log('Meta file is valid!');
}

const meta = readInputMeta();

Object.keys(meta.icons).forEach(icon => {
  iterateVariants((variant, size) => {
    const icons = readInputFilenames(variant, size);

    // Check that all icons in meta.json have associated SVG files.
    if (
      !icons.includes(icon) &&
      !meta.icons[icon].history[`${variant}_${size}`].removed
    ) {
      log(
        `Icon: ${`'${icon}'`.padEnd(
          15,
          ' '
        )}\t - Icon exists in the meta.json but the associated SVG file does not exist.'`,
        'error'
      );
    }
  });

  // Check that all icons have keywords provided
  if (meta.icons[icon].keywords.length === 0) {
    log(
      `Icon: ${`'${icon}'`.padEnd(
        15,
        ' '
      )}\t - No keywords have been provided.`,
      'error'
    );
  }

  // Check there are no repeated keywords in each list
  if (
    new Set(meta.icons[icon].keywords).size != meta.icons[icon].keywords.length
  ) {
    log(
      `Icon: ${`'${icon}'`.padEnd(15, ' ')}\t - Keywords: ${
        meta.icons[icon]
      } - Keywords array contains repeated keywords.`,
      'error'
    );
  }

  // Check the keywords are all lowercase
  if (
    !meta.icons[icon].keywords.every(
      keyword => keyword.toLowerCase() == keyword
    )
  ) {
    log(
      `Icon: '${`'${icon}'`.padEnd(15, ' ')}'\t - Keywords: ${
        meta.icons[icon]
      } - Keyword should all be lower case.`,
      'error'
    );
  }
});

reportLogs();
