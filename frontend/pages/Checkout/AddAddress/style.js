import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const page = css({
  margin: variables.gap.big,
}).toString();

const title = css({
  paddingTop: variables.gap.big,
  paddingBottom: variables.gap.big,
  fontWeight: 500,
}).toString();

export default {
  page,
  title,
};
