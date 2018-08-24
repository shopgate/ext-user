import { css } from 'glamor';
import { themeConfig, themeName } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;
const isIos = themeName.includes('ios');

const buttonWrapper = css({
  paddingTop: variables.gap.big * 2,
  paddingBottom: variables.gap.big,
}).toString();

const button = css({
  width: '100%',
}).toString();

const changePasswordButton = css({
  marginTop: variables.gap.big,
  textTransform: !isIos ? 'uppercase' : 'inherit',
  fontWeight: !isIos ? 500 : 'normal',
  color: colors.accent,
}).toString();

const fieldWrapper = css({
  paddingLeft: variables.gap.big,
  paddingRight: variables.gap.big,
}).toString();

const fieldWrapperDisabled = css({
  paddingTop: variables.gap.small,
  paddingLeft: variables.gap.big,
  paddingRight: variables.gap.big,
  backgroundColor: colors.background,
}).toString();

const noPad = css({
  paddingBottom: 0,
}).toString();

export default {
  buttonWrapper,
  button,
  fieldWrapper,
  fieldWrapperDisabled,
  noPad,
  changePasswordButton,
};
