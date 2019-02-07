import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';

/**
 * @param {Object} state state
 * @return {{isLoggedIn: boolean}}
 */
const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state),
});

export default connect(mapStateToProps);
