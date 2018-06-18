import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const addresses = css({
  padding: variables.gap.big,
  background: colors.light,
}).toString();

const address = css({
  fontSize: '0.875rem',
  color: colors.shade3,
}).toString();

const link = css({
  color: colors.accent,
}).toString();

export default {
  addresses,
  address,
  link,
};
