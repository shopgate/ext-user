import { css } from 'glamor';

import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const buttons = css({
  marginTop: variables.gap.xbig,
}).toString();

const cancelItem = css({
  paddingTop: 10,
  paddingRight: variables.gap.big,
}).toString();

const cancel = css({
  textTransform: 'uppercase',
  fontWeight: 500,
}).toString();

export default {
  buttons,
  cancelItem,
  cancel,
};
