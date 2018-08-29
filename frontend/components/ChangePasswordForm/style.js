import { css } from 'glamor';

import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const buttons = css({
  marginTop: variables.gap.xbig,
}).toString();

const cancel = css({
  textTransform: 'uppercase',
  fontWeight: 500,
}).toString();

export default {
  buttons,
  cancel,
};
