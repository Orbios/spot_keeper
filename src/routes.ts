import SearchPage from 'components/search/SearchPage';
import SharedListPage from 'components/shared_list/SharedLIstPage';
import ListPage from 'components/list/ListPage';
import LoginPage from 'components/auth/LoginPage';
import SignUpPage from 'components/auth/SignUpPage';
import PasswordForgotPage from 'components/auth/PasswordForgotPage';
import PasswordResetPage from 'components/auth/PasswordResetPage';
import NotFountPage from 'components/NotFoundPage';

export const routes = [
  {
    path: '/',
    component: SearchPage,
    pageProps: {
      pageId: 'places',
      title: 'Places'
    }
  },
  {
    path: '/search',
    component: SearchPage,
    pageProps: {
      pageId: 'search',
      title: 'Search'
    }
  },
  {
    path: '/list/:id',
    component: ListPage,
    pageProps: {
      pageId: 'list',
      title: 'List'
    }
  },
  {
    path: '/shared-list/:id',
    component: SharedListPage,
    pageProps: {
      pageId: 'shared_list',
      title: 'Shared List',
      public: true
    }
  },
  {
    path: '/login',
    component: LoginPage,
    pageProps: {
      pageId: 'log_in',
      title: 'Log In',
      public: true
    }
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    pageProps: {
      pageId: 'sign_up',
      title: 'Log In',
      public: true
    }
  },
  {
    path: '/password-forgot',
    component: PasswordForgotPage,
    pageProps: {
      pageId: 'password_forgot',
      title: 'Forgot password',
      public: true
    }
  },
  {
    path: '/password-reset',
    component: PasswordResetPage,
    pageProps: {
      pageId: 'password_reset',
      title: 'Reset password',
      public: true
    }
  },
  {
    path: '/*',
    component: NotFountPage,
    pageProps: {
      pageId: 'not_found',
      title: 'Page not found',
      public: true
    }
  }
];
