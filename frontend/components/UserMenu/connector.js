import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';
import { getUserMenuEntries } from '../../selectors/config';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state),
  userMenuEntries: getUserMenuEntries(state),
});

export default connect(mapStateToProps);
