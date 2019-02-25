import { combineReducers } from 'redux';

import auth from './auth.js';
import tasks from './tasks.js';

const rootReducer = combineReducers({
  auth,
  tasks,
});

export default rootReducer;
