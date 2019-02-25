import produce from 'immer';
import { TasksActionTypes } from '../actions/tasks';

const initialAuthState = {
  tasks: [],
  countTasks: 0,
  sortByName: null,
  sortByEmail: null,
  sortByStatus: null,
  showAlert: false,
  alertMsg: '',
};

export default (state = initialAuthState, action) => {
  const { type, payload } = action;
  return produce(state, (draft) => {
    switch (type) {
      case TasksActionTypes.GET_ALL_TASKS_SUCCESS:
        draft.tasks = [];
        draft.tasks = payload.message.tasks;
        draft.countTasks = payload.message.total_task_count;
        break;
      case TasksActionTypes.ADD_TASK:
        draft.tasks.unshift(payload);
        draft.countTasks++;
        break;
      case TasksActionTypes.UPDATE_TASK:
        draft.tasks = draft.tasks.map((task) => task.id === payload.id ? payload : task);
        break;
      case TasksActionTypes.SET_DIRECTION:
        draft[payload.name] = payload.direction;
        break;
      case TasksActionTypes.SHOW_ALERT:
        draft.showAlert = true;
        draft.alertMsg = payload;
        break;
      case TasksActionTypes.HIDE_ALERT:
        draft.showAlert = false;
        draft.alertMsg = '';
        break;
      // no default
    }

    return draft;
  });
};
