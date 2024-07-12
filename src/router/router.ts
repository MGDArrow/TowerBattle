import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import Loading from '@/logic/loading';

export const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: routes,
});

router.beforeEach(() => {
  Loading.init();
  return true;
});
