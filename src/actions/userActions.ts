import {loadCurrentUser} from 'reducers/userSlice';

import helper from './actionHelper';

import authService from 'services/authService';

export default {
  getCurrentUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  signUp,
  googleLogin
};

function getCurrentUser() {
  return helper.dispatchAsyncAction(async dispatch => {
    const user = await authService.getCurrentUser();
    dispatch(loadCurrentUser(user));
  });
}

function loginUser(user: LogInDto) {
  return helper.dispatchAsyncAction(async () => {
    const token = await authService.login(user);

    if (token) {
      authService.saveToken(token);
    }

    return token ? true : false;
  });
}

function logOut() {
  return helper.dispatchAsyncAction(async dispatch => {
    await authService.signOut();
    dispatch(loadCurrentUser(null));
    authService.saveToken(undefined);
  });
}

function forgotPassword(email: string) {
  return helper.dispatchAsyncAction(async () => {
    await authService.passwordForgot(email);
  });
}

function resetPassword(newPassword: string) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.resetPassword(newPassword);
    return response;
  });
}

function signUp(user: SignUpDto) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.signUp(user);
    return response;
  });
}

function googleLogin() {
  return helper.dispatchAsyncAction(async () => {
    return await authService.googleLogin();
  });
}
