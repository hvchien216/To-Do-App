import { combineReducers } from 'redux';
import task from './task';
import ui from './ui';
import modal from './modal';
import user from './user';
const rootReducer = combineReducers({
  task,
  ui,
  modal,
  user
});

export default rootReducer;