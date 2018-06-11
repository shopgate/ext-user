import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import register from './action';

/**
 * @param {function} dispatch dispatch
 * @return {{register: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user)),
});

export default connect(null, mapDispatchToProps);
