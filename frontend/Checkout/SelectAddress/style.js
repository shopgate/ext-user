import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const page = css({
  padding: variables.gap.bigger,
}).toString();

const title = css({
  paddingTop: variables.gap.big,
  paddingBottom: variables.gap.big,
  fontWeight: 500,
}).toString();

const link = css({
  margin: `${variables.gap.big}px 0`,
  color: colors.accent,
}).toString();

const button = css({
  width: '100%',
}).toString();

const checkboxGrid = css({
  margin: `${variables.gap.xbig}px 0`,
}).toString();

const checkboxLabel = css({
  paddingLeft: variables.gap.big,
  color: colors.shade3,
}).toString();

export default {
  title,
  page,
  link,
  button,
  checkboxGrid,
  checkboxLabel,
};
