export const routes = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROJECT: (pid: string = ':pid') => `/project/${pid}`,
  LISTING: '/listing',
  WALLET: '/wallet',
};
