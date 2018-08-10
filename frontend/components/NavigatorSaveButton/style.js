import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const isIos = themeName.includes('ios');
const { variables, colors } = themeConfig;

const button = css({
  textTransform: !isIos ? 'uppercase' : 'inherit',
  fontWeight: !isIos ? 500 : 'normal',
  marginRight: variables.gap.big,
}).toString();

const active = css({
  color: colors.accent,
}).toString();

const disabled = css({
  color: colors.shade5,
}).toString();

export default {
  button,
  active,
  disabled,
};
