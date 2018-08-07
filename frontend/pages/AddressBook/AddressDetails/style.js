import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isGmd = themeName.includes('gmd');

const { variables, colors } = themeConfig;

const container = css({
  backgroundColor: isGmd ? colors.background : '',
}).toString();

const headline = css({
  paddingLeft: variables.gap.bigger,
  fontSize: '2.1875rem',
  fontWeight: 500,
  margin: 0,
}).toString();

export default {
  container,
  headline,
};
