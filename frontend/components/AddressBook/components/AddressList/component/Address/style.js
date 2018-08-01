import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const address = css({
  marginTop: variables.gap.xsmall / 2,
  padding: variables.gap.big,
  paddingBottom: 0,
  backgroundColor: colors.light,
}).toString();

export default {
  address,
};
