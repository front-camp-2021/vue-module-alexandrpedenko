import ProductService from '../../services/ProductService';

const productService = new ProductService();

const productModule = {
  state: {
    isLoading: false,
    error: null,
    product: {},
  },

  getters: {
    productLoading: (state) => state.isLoading,
    product: (state) => state.product,
  },

  mutations: {
    setProductLoading(state, payload) {
      state.isLoading = payload;
      state.error = null;
    },
    setProductError(state, payload) {
      state.error = payload;
    },
    setSingleProduct(state, payload) {
      state.product = payload;
    },
  },

  actions: {
    async fetchSingleProducts({ commit }, id) {
      try {
        commit('setProductLoading', true);

        const { data } = await productService.loadSingleProduct(id);

        commit('setSingleProduct', data[0]);
      } catch (error) {
        commit('setProductError', error.message);
      } finally {
        commit('setProductLoading', false);
      }
    },
  },

  namespaced: true,
};

export default productModule;
