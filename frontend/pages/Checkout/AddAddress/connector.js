import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import { getQueryParam } from '@shopgate/pwa-common/selectors/history';

/**
 * @param {Object} state state
 * @return {{addressType: (*|string)}}
 */
const mapStateToProps = state => ({
  addressType: getQueryParam(state, 'type') || 'shipping',
});

export default connect(mapStateToProps);
