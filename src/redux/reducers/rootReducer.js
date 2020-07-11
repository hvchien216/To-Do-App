import { combineReducers } from 'redux';
import task from './task';
import ui from './ui';
import modal from './modal';
const rootReducer = combineReducers({
  task,
  ui,
  modal
});

export default rootReducer;