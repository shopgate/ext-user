import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const address = css({
  margin: `${variables.gap.big}px 0`,
  fontSize: '0.875rem',
  color: colors.shade3,
  borderBottom: `${variables.gap.xsmall / 2}px solid ${colors.background}`,
}).toString();

const radio = css({
  color: colors.primary,
}).toString();

export default {
  address,
  radio,
};
