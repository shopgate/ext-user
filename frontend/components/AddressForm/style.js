import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isIos = themeName.includes('ios');
const { variables, colors } = themeConfig;

const fields = css({
  backgroundColor: colors.light,
  marginTop: 2,
  padding: variables.gap.bigger,
  paddingBottom: variables.gap.xsmall,
}).toString();

const options = css({
  padding: variables.gap.bigger,
}).toString();

const defaults = css({
  color: colors.primary,
  fontWeight: !isIos ? 500 : 'normal',
  '& svg': {
    color: colors.primary,
  },
}).toString();

const deleteAddressButton = css({
  textTransform: !isIos ? 'uppercase' : 'inherit',
  fontWeight: !isIos ? 500 : 'normal',
  ...variables.buttonBase,
}).toString();

const addAddressButton = css({
  width: '100%',
  marginTop: variables.gap.big,
}).toString();

export default {
  fields,
  defaults,
  options,
  addAddressButton,
  deleteAddressButton,
};
