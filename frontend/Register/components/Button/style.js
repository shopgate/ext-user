import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const buttonPadding = `${variables.gap.small + 1}px ${variables.gap.big}px ${variables.gap.small - 1}px`;

/**
 * Creates the button style.
 * @param {string} text The text color.
 * @param {string|null} background The fill color.
 * @return {Object} The button style.
 */
const button = (text, background) => ({
  position: 'relative',
  display: 'inline-block',
  outline: 0,
  padding: 0,
  textTransform: 'uppercase',
  color: text,
  backgroundColor: background,
  fontWeight: 500,
  minWidth: 64,
  borderRadius: 2,
});

/**
 * The basic content wrapper styles.
 */
const contentWrapper = css({
  padding: buttonPadding,
}).toString();

/**
 * Creates the button styles object.
 * @param {string} textColor The text color.
 * @param {string|null} fillColor The fill color.
 * @return {Object} The styles object.
 */
const createButtonStyles = (textColor, fillColor) => {
  const buttonStyle = {
    ...button(
      textColor,
      fillColor
    ),
  };

  const contentStyle = {
    padding: buttonPadding,
    color: buttonStyle.color,
  };

  return {
    button: css(buttonStyle).toString(),
    content: css(contentStyle).toString(),
  };
};

/**
 * Creates a plain button style object without any styling.
 * @return {Object}
 */
const plain = () => ({
  button: css({
    padding: 0,
    outline: 0,
    border: 0,
    textAlign: 'left',
  }).toString(),
  content: '',
});

/**
 * The regular flat button style.
 * @param {boolean} disabled Whether this button is disabled.
 * @return {Object} An object of style definitions.
 */
const regular = (disabled) => {
  if (disabled) {
    // Flat disabled button style.
    return createButtonStyles(colors.shade4, null);
  }

  // Flat enabled button style.
  return createButtonStyles(colors.dark, null);
};

/**
 * The primary button style.
 * @param {boolean} disabled Whether this button is disabled.
 * @param {boolean} flat Whether this button should be rendered flat.
 * @return {Object} An object of style definitions.
 */
const primary = (disabled, flat) => {
  if (!flat) {
    if (disabled) {
      // Regular disabled button style.
      return createButtonStyles(colors.shade4, colors.shade7);
    }

    // Regular enabled button style.
    return createButtonStyles(colors.accentContrast, colors.accent);
  }

  if (disabled) {
    // Flat disabled button style.
    return createButtonStyles(colors.shade4, null);
  }

  // Flat enabled button style.
  return createButtonStyles(colors.accent, null);
};

/**
 * The secondary button style.
 * @param {boolean} disabled Whether this button is disabled.
 * @param {boolean} flat Whether this button should be rendered flat.
 * @return {Object} An object of style definitions.
 */
const secondary = (disabled, flat) => {
  if (!flat) {
    if (disabled) {
      // Regular disabled button style.
      return createButtonStyles(colors.shade4, colors.shade7);
    }

    // Regular enabled button style.
    return createButtonStyles(colors.primaryContrast, colors.primary);
  }

  if (disabled) {
    // Flat disabled button style.
    return createButtonStyles(colors.shade4, null);
  }

  // Flat enabled button style.
  return createButtonStyles(colors.primary, null);
};

export default {
  plain,
  regular,
  primary,
  secondary,
  contentWrapper,
};
