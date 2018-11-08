import { combineReducers } from 'redux';
import addressBook from './addressBook';
import config from './config';
import ui from './ui';

export default combineReducers({
  addressBook,
  config,
  ui,
});
