import { createStore } from 'vuex';
import cartModule from './modules/cart';
import categoryModule from './modules/category';
import favoritesModule from './modules/favorites';
import productModule from './modules/product';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    category: categoryModule,
    favorites: favoritesModule,
    cart: cartModule,
    singleProduct: productModule,
  },
});
