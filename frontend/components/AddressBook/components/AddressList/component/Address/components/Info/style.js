import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const address = css({
  paddingTop: variables.gap.big,
}).toString();

export default {
  address,
};
