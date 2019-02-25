export const TasksActionTypes = {
  GET_ALL_TASKS_SUCCESS: '[PostsActionTypes] GET_ALL_TASKS_SUCCESS',
  ADD_TASK: '[PostsActionTypes] ADD_TASK',
  EDIT_TASK_SUCCESS: '[PostsActionTypes] EDIT_TASK_SUCCESS',
  SET_DIRECTION: '[PostsActionTypes] SET_DIRECTION',
  SHOW_ALERT: '[PostsActionTypes] SHOW_ALERT',
  HIDE_ALERT: '[PostsActionTypes] HIDE_ALERT',
};

export function setTasks(tasks) {
  return {
    type: TasksActionTypes.GET_ALL_TASKS_SUCCESS,
    payload: tasks,
  };
}

export function addTask(task) {
  return {
    type: TasksActionTypes.ADD_TASK,
    payload: task,
  };
}

export function setDirectionByName(name, direction) {
  return {
    type: TasksActionTypes.SET_DIRECTION,
    payload: {
      direction,
      name,
    },
  };
}

export function showAlert(msg) {
  return {
    type: TasksActionTypes.SHOW_ALERT,
    payload: msg,
  };
}

export function hideAlert() {
  return {
    type: TasksActionTypes.HIDE_ALERT,
  };
}
