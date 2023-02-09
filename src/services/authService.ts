import Cookies from 'js-cookie';
import {createClient, User} from '@supabase/supabase-js';

import config from 'config';
import uiHelper from 'helpers/uiHelper';

const supabase = createClient(config.supabase.url, config.supabase.key);

const exports = {
  getCurrentUser,
  signUp,
  signOut,
  login,
  googleLogin,
  passwordForgot,
  resetPassword,
  getToken,
  saveToken
};

async function getCurrentUser(): Promise<User | null> {
  try {
    const token = getToken();

    const {
      data: {user},
      error
    } = await supabase.auth.getUser(token);

    if (error) throw new Error(error.message);

    return user;
  } catch (err: any) {
    // eslint-disable-next-line
    console.log(err?.message);
    return null;
  }
}

async function signUp(userData: SignUpDto): Promise<string | null> {
  try {
    const {data, error} = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName
        }
      }
    });

    if (error) throw new Error(error.message);

    if (data.user) {
      return 'Activation email was send. Please, check you inbox.';
    }

    return null;
  } catch (err: any) {
    uiHelper.showError(err?.message);
    return null;
  }
}

async function signOut() {
  try {
    const {error} = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  } catch (err: any) {
    uiHelper.showError(err?.message);
  }
}

async function login(loginData: LogInDto): Promise<string | undefined> {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password
    });

    if (error) throw new Error(error.message);

    const {session} = data;

    return session?.access_token;
  } catch (err: any) {
    uiHelper.showError(err?.message);
  }
}

async function googleLogin(): Promise<void> {
  try {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: config.baseUrl
      }
    });

    if (error) throw new Error(error.message);
  } catch (err: any) {
    uiHelper.showError(err?.message);
  }
}

async function passwordForgot(email: string): Promise<void> {
  try {
    const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${config.baseUrl}/password-reset`
    });

    if (error) throw new Error(error.message);

    if (data) {
      uiHelper.showMessage(`We've just dropped you an email. Please check your mail to reset your password. Thanks!`);
    }
  } catch (err: any) {
    uiHelper.showError(err?.message);
  }
}

async function resetPassword(newPassword: string): Promise<User | null> {
  try {
    const {data, error} = await supabase.auth.updateUser({password: newPassword});

    if (error) throw new Error(error.message);

    return data?.user;
  } catch (err: any) {
    uiHelper.showError(err?.message);
    return null;
  }
}

function getToken(): string | undefined {
  const token = Cookies.get('jwt_token');
  return token;
}

function saveToken(jwt?: string) {
  if (!jwt) {
    Cookies.remove('jwt_token');
    return;
  }

  Cookies.set('jwt_token', jwt);
}

export default exports;
