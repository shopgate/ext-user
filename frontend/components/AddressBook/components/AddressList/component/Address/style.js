import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const address = css({
  marginTop: '2px',
  padding: variables.gap.big,
  paddingBottom: 0,
  backgroundColor: colors.light,
}).toString();

export default {
  address,
};
