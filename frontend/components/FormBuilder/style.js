import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const fields = css({
  backgroundColor: colors.light,
  marginTop: 2,
  padding: variables.gap.bigger,
  paddingBottom: variables.gap.xsmall,
}).toString();

export default {
  fields,
};
