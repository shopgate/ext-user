import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isGmd = themeName.includes('gmd');

const { variables, colors } = themeConfig;

const container = css({
  backgroundColor: isGmd ? colors.background : '',
  width: '100%',
  height: '100%',
}).toString();

const form = css({
  marginTop: '2px',
  backgroundColor: colors.light,
  padding: variables.gap.big,
}).toString();

const headline = css({
  paddingLeft: variables.gap.bigger,
  fontSize: '2.1875rem',
  fontWeight: 500,
  margin: 0,
}).toString();

export default {
  container,
  form,
  headline,
};
