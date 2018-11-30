import { connect } from 'react-redux';
import { isUserLoggedIn } from '@shopgate/pwa-common/selectors/user';
import { historyPush } from '@shopgate/pwa-common/actions/router';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state),
});

/**
 * Maps the contents of the state to the component props.
 * @param {Function} dispatch The dispatch method from the store.
 * @return {Object}
 */
const mapDispatchToProps = dispatch => ({
  navigate: (pathname, title) => () => dispatch(historyPush({
    pathname,
    state: { title },
  })),
});

export default connect(mapStateToProps, mapDispatchToProps);
