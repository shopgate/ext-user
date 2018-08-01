import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isGmd = themeName.includes('gmd');

const { variables, colors } = themeConfig;

const container = css({
  backgroundColor: isGmd ? colors.background : '',
  width: '100%',
  height: '100%',
}).toString();

const headline = css({
  paddingLeft: variables.gap.bigger,
  fontSize: '2.1875rem',
  fontWeight: 500,
  margin: 0,
}).toString();

const buttonWrapper = css({
  position: 'fixed',
  bottom: isGmd ? variables.gap.bigger : variables.gap.bigger + variables.tabBar.height,
  left: variables.gap.big,
  right: variables.gap.big,
}).toString();

const button = css({
  width: '100%',
}).toString();

export default {
  container,
  headline,
  buttonWrapper,
  button,
};
