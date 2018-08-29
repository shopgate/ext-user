import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isGmd = themeName.includes('gmd');

const { variables, colors } = themeConfig;

const container = css({
  paddingLeft: variables.gap.big,
  paddingRight: variables.gap.big,
  borderTop: isGmd ? `4px solid ${colors.background}` : 'none',
  flexGrow: 1,
}).toString();

const headline = css({
  fontSize: isGmd ? 0 : '2.1875rem',
  fontWeight: 500,
  margin: 0,
  marginBottom: variables.gap.xbig,
}).toString();

export default {
  container,
  headline,
};
