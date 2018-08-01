import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const defaultAddress = css({
  color: colors.shade5,
  paddingTop: variables.gap.small,
  paddingBottom: variables.gap.small,
}).toString();

const setDefaultAddress = css({
  color: colors.primary,
  paddingTop: variables.gap.small,
  paddingBottom: variables.gap.small,
}).toString();

const doneIcon = css({
  paddingRight: variables.gap.small,
}).toString();

const underline = css({
  borderBottom: `1px solid ${colors.shade8}`,
}).toString();

export default {
  defaultAddress,
  setDefaultAddress,
  doneIcon,
  underline,
};
