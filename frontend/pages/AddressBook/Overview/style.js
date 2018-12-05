import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isGmd = themeName.includes('gmd');

const { variables, colors } = themeConfig;

const container = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: isGmd ? colors.background : '',
  width: '100%',
  height: '100%',
  overflow: 'auto',
}).toString();

const headline = css({
  paddingLeft: variables.gap.bigger,
  fontSize: '2.1875rem',
  fontWeight: 500,
  margin: 0,
}).toString();

const buttonWrapper = css({
  minHeight: 42,
  margin: variables.gap.big,
  flex: 1,
  display: 'flex',
}).toString();

const button = css({
  width: '100%',
}).toString();

const link = css({
  alignSelf: 'flex-end',
}).toString();

export default {
  container,
  headline,
  buttonWrapper,
  button,
  link,
};
