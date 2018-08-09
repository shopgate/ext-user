import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const checkboxGrid = css({
  margin: `${variables.gap.xbig}px 0`,
}).toString();

const checkboxLabel = css({
  paddingLeft: variables.gap.big,
  color: colors.shade3,
}).toString();

export default {
  checkboxGrid,
  checkboxLabel,
};
