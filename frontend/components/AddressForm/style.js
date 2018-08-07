import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

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
}).toString();

const button = css({
  width: '100%',
  marginTop: variables.gap.big,
}).toString();

export default {
  fields,
  defaults,
  options,
  button,
};
