import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const title = css({
  padding: variables.gap.big,
  fontWeight: 500,
}).toString();

export default {
  title,
};
