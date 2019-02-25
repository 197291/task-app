import produce from 'immer';

import { AuthActionTypes } from '../actions/auth';

const initialAuthState = {
  isLoggedIn: false,
  user: null,
};

export default (state = initialAuthState, action) => {
  const { type, payload } = action;
  return produce(state, draft => {

    switch (type) {
      case AuthActionTypes.SET_ADMIN_USER:
        draft.isLoggedIn = true;
        draft.user = payload.user;
        break;

      case AuthActionTypes.UNSET_ADMIN_USER:
        draft.isLoggedIn = false;
        draft.user = null;
        break;
      // no default
    }

    return draft;
  });
};
