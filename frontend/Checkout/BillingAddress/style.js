import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const title = css({
  padding: variables.gap.big,
}).toString();

export default {
  title,
};
