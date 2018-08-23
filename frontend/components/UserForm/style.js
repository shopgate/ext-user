import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const buttonWrapper = css({
  paddingTop: variables.gap.big * 2,
  paddingBottom: variables.gap.big,
}).toString();

const button = css({
  width: '100%',
}).toString();

export default {
  buttonWrapper,
  button,
};
