import { connect } from 'react-redux';
import { getUserAddresses } from '../../../selectors/addressBook';

/**
 * @param {Object} state state
 * @return {{hasAddresses: boolean}}
 */
const mapStateToProps = state => ({
  hasAddresses: !!getUserAddresses(state) && getUserAddresses(state).length > 0,
});

export default connect(mapStateToProps);
