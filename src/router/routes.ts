export const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/AppHome.vue'),
  },
  {
    name: 'Home',
    path: '/auth',
    component: () => import('@/views/AppAuth.vue'),
  },
];
