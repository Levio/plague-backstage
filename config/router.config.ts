export default [
  {
    path: '/login',
    component: '../layouts/LoginLayout',
    routes: [{ path: '', component: '../pages/login' }],
  },
  {
    path: '/',
    authority: ['admin', 'user'],
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/user', component: '../pages/user' },
      { path: '/user', component: '../pages/user' },
      { component: '../pages/404' },
    ],
  },
  {
    component: '../pages/404',
  },
];
