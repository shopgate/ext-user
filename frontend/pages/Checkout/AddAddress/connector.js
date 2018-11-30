import { connect } from 'react-redux';
import { getQueryParam } from '@shopgate/pwa-common/selectors/history';

/**
 * @param {Object} state state
 * @return {{addressType: (*|string)}}
 */
const mapStateToProps = state => ({
  addressType: getQueryParam(state, 'type') || 'shipping',
});

export default connect(mapStateToProps);
