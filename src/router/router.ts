import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import Loading from '@/logic/loading';
import Stages from '@/mechanics/stages';

export const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: routes,
});

router.beforeEach((to) => {
  if (to.name === 'Game') {
    if (!Stages.isAccess.value) {
      console.error('Не стоит так делать... Не достаточно пройдено волн в прошлом этапе');
      return { name: 'Home' };
    }
  }
  Loading.init();
  return true;
});
