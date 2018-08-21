import { combineReducers } from 'redux';
import addressBook from './addressBook';
import addressForm from './addressForm';

export default combineReducers({
  addressBook,
  addressForm,
});
