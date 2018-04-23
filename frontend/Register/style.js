import { css } from 'glamor'
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const container = css({
  flexGrow: 1,
  padding: `${variables.gap.small * 3}px ${variables.gap.big}px`
}).toString()

const headline = css({
  fontSize: '2.1875rem',
  lineHeight: 1,
  fontWeight: 500
}).toString()

const subline = css({
  fontSize: '1.125rem',
  color: colors.shade6,
  marginBottom: variables.gap.xxbig
}).toString()

const input = css({
  width: '100%',
  border: '1px solid black'
}).toString()

const buttonWrapper = css({
  paddingTop: variables.gap.big * 2,
  paddingBottom: variables.gap.big * 1.5
}).toString()

const button = css({
  width: '100%',
  color: '#fff',
  fontWeight: '500',
  textTransform: 'uppercase',
  padding: '9px 16px 7px',
  backgroundColor: '#fa5400'
}).toString()

export default {
  container,
  headline,
  subline,
  input,
  buttonWrapper,
  button
}
