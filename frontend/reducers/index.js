import { combineReducers } from 'redux';
import addressBook from './addressBook';
import config from './config';

export default combineReducers({
  addressBook,
  config,
});
