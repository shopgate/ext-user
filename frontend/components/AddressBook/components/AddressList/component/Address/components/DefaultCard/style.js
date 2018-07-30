import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const defaultAddress = css({
  color: colors.shade5,
  borderBottom: `1px solid ${colors.shade8}`,
  paddingTop: variables.gap.small,
  paddingBottom: variables.gap.small,
}).toString();

const setDefaultAddress = css({
  color: colors.primary,
  borderBottom: `1px solid ${colors.shade8}`,
  paddingTop: variables.gap.small,
  paddingBottom: variables.gap.small,
}).toString();

export default {
  defaultAddress,
  setDefaultAddress,
};
