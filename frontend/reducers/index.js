import { combineReducers } from 'redux';
import addressBook from './addressBook';
import config from './config';
import user from './user';
import ui from './ui';

export default combineReducers({
  addressBook,
  config,
  user,
  ui,
});
