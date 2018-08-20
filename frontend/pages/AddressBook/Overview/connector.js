import { connect } from 'react-redux';
import { getUserAddresses } from '@shopgate/user/selectors/addressBook';
import { isFetching } from '@shopgate/user/selectors/addressForm';

/**
 * @param {Object} state state
 * @return {{hasAddresses: boolean}}
 */
const mapStateToProps = state => ({
  hasAddresses: !!getUserAddresses(state) && getUserAddresses(state).length > 0,
  isFetching: isFetching(state),
});

export default connect(mapStateToProps, null, null, { withRef: true });
