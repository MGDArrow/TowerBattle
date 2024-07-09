import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: routes,
});
