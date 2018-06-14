import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const page = css({
  margin: variables.gap.big,
}).toString();

const title = css({
  fontWeight: 500,
}).toString();

const button = css({
  width: '100%',
}).toString();

const select = css({
  width: '100%',
  borderBottom: `1px solid ${colors.shade3}`,
  margin: `${variables.gap.small + variables.gap.xsmall}px 0`,
}).toString();

export default {
  page,
  title,
  button,
  select,
};
