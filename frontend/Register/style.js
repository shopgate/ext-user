import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const container = css({
  padding: variables.gap.big,
}).toString();

const headline = css({
  fontSize: '2.1875rem',
  fontWeight: 500,
}).toString();

const subline = css({
  fontSize: '1.125rem',
  color: colors.shade6,
  marginBottom: variables.gap.xxbig,
  marginTop: variables.gap.xsmall,
}).toString();

const buttonWrapper = css({
  paddingTop: variables.gap.big * 2,
  paddingBottom: variables.gap.big * 1.5,
}).toString();

const button = css({
  width: '100%',
}).toString();

export default {
  container,
  headline,
  subline,
  buttonWrapper,
  button,
};
