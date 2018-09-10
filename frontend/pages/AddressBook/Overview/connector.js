import { connect } from 'react-redux';
import { getUserAddresses } from '../../../selectors/addressBook';
import { isFetching } from '../../../selectors/addressForm';

/**
 * @param {Object} state state
 * @return {{hasAddresses: boolean}}
 */
const mapStateToProps = state => ({
  hasAddresses: !!getUserAddresses(state) && getUserAddresses(state).length > 0,
  isFetching: isFetching(state),
});

export default connect(mapStateToProps, null, null, { withRef: true });
