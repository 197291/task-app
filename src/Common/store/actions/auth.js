export const AuthActionTypes = {
  SET_ADMIN_USER: 'SET_ADMIN_USER',
  UNSET_ADMIN_USER: 'UNSET_ADMIN_USER',
};

export function setAdminUser() {
  return {
    type: AuthActionTypes.SET_ADMIN_USER,
    payload: {
      user: {
        name: 'admin',
      },
    },
  };
}

export function unSetAdminUser() {
  return {
    type: AuthActionTypes.UNSET_ADMIN_USER,
  };
}
