import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const container = css({
  padding: variables.gap.big,
});

const subline = css({
  fontSize: '1.125rem',
  color: colors.shade6,
  marginBottom: variables.gap.xbig,
  marginTop: variables.gap.xsmall,
});

export default {
  container,
  subline,
};
