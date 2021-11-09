import FavoritesService from '@/services/FavoritesService';

const favoritesService = new FavoritesService();

const favoritesModule = {
  state: {
    isLoading: false,
    error: null,
    favoritesProducts: [],
    favoritesProductsIdList: [],
  },

  getters: {
    favoritesProducts: (state) => state.favoritesProducts,
    favoritesProductsIdList: (state) => state.favoritesProductsIdList,
    favoritesLoading: (state) => state.isLoading,
  },

  mutations: {
    setFavoritesLoading(state, payload) {
      state.isLoading = payload;
      state.error = null;
    },
    setFavoritesError(state, payload) {
      state.error = payload;
    },
    setFavoritesProductsIdList(state, payload) {
      state.favoritesProductsIdList = payload;
    },

    setLoadedFavoritesProducts(state, payload) {
      state.favoritesProducts = payload;
    },

    addProductToFavoritesIdList(state, payload) {
      state.favoritesProductsIdList.push(payload);
    },
    removeFromFavorites(state, payload) {
      state.favoritesProductsIdList = state.favoritesProductsIdList.filter(
        (item) => item !== payload,
      );
      state.favoritesProducts = state.favoritesProducts.filter((item) => item.id !== payload);
    },
  },

  actions: {
    addToFavorites({ commit }, id) {
      favoritesService.setFavoritesToLocalStorage(id);
      commit('addProductToFavoritesIdList', id);
    },

    removeFromFavoritesAction({ commit }, id) {
      favoritesService.removeFavoritesFromLocalStorage(id);
      commit('removeFromFavorites', id);
    },

    getFavoritesIdListFromStorage({ commit }) {
      const favoritesIdList = favoritesService.getFavoritesFromStorage();
      commit('setFavoritesProductsIdList', favoritesIdList);
    },

    async fetchByFavoritesIdList({ commit }) {
      try {
        commit('setFavoritesLoading', true);

        const { data } = await favoritesService.getFavoritesProducts();

        commit('setLoadedFavoritesProducts', data);
      } catch (error) {
        commit('setFavoritesError', error.message);
      } finally {
        commit('setFavoritesLoading', false);
      }
    },
  },
  namespaced: true,
};

export default favoritesModule;
