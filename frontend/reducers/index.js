import { combineReducers } from 'redux';
import addressBook from './addressBook';
import addressForm from './addressForm';
import config from './config';

export default combineReducers({
  addressBook,
  addressForm,
  config,
});
