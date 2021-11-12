import { createRouter, createWebHistory } from 'vue-router';
import CategoryPage from '@/views/category/CategoryPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'CategoryPage',
    component: CategoryPage,
  },
  {
    path: '/products/:id',
    name: 'ProductPage',
    props: true,
    component: () =>
      import(/* webpackChunkName: "singleProduct" */ '../views/product/ProductPage.vue'),
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "cart" */ '../views/cart/CartPage.vue'),
  },
  {
    path: '/favorites',
    name: 'FavoritesPage',
    component: () =>
      import(/* webpackChunkName: "favorites" */ '../views/favorites/FavoritesPage.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '../views/not-found/NotFoundPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
