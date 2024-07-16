export const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/AppHome.vue'),
  },
  {
    name: 'Auth',
    path: '/auth',
    component: () => import('@/views/AppAuth.vue'),
  },
  {
    name: 'Game',
    path: '/game',
    component: () => import('@/views/AppGame.vue'),
  },
];
