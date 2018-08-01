import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isGmd = themeName.includes('gmd');
const { variables } = themeConfig;

let noAddr = {
  padding: variables.gap.bigger,
};
if (isGmd) {
  noAddr = {
    ...noAddr,
    paddingTop: '45%',
    textAlign: 'center',
  };
}
const noAddresses = css(noAddr).toString();

export default {
  noAddresses: noAddresses.toString(),
};
