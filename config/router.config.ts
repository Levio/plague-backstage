export default [
  {
    path: '/login',
    component: '../layouts/LoginLayout',
    routes: [{ path: '', component: '../pages/login' }],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [{ path: '/', component: '../pages/index' }],
  },
];
