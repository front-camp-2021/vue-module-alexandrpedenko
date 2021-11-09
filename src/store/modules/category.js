import CategoryService from '@/services/CategoryService';
import prepareFilters from '@/utils/prepareFilters';

const categoryService = new CategoryService();

const categoryModule = {
  state: {
    isLoading: false,
    error: null,
    products: {
      data: [],
      totalCount: '0',
    },
    brands: [],
    categories: [],
  },

  getters: {
    preparedBrands: (state) => prepareFilters(state.brands),
    preparedCategories: (state) => prepareFilters(state.categories),
    totalFoundCount: (state) => parseInt(state.products.totalCount, 10),
  },

  mutations: {
    setCategoryLoading(state, payload) {
      state.isLoading = payload;
      state.error = null;
    },
    setCategoryError(state, payload) {
      state.error = payload;
    },
    setCategoryBrands(state, payload) {
      state.brands = payload;
    },
    setCategoryCategories(state, payload) {
      state.categories = payload;
    },
    setCategoryProducts(state, payload) {
      state.products.data = payload;
    },
    setCategoryTotalCount(state, payload) {
      state.products.totalCount = payload;
    },
  },

  actions: {
    async fetchCategoryProduct({ commit }, url) {
      try {
        commit('setCategoryLoading', true);

        const response = await categoryService.getProducts(url);
        const totalCount = response.headers['x-total-count'];
        const { data } = response;

        commit('setCategoryProducts', data);
        commit('setCategoryTotalCount', totalCount);
      } catch (error) {
        commit('setCategoryError', error.message);
      } finally {
        commit('setCategoryLoading', false);
      }
    },

    async fetchCategoryCategories({ commit }) {
      try {
        commit('setCategoryLoading', true);

        const { data } = await categoryService.getCategories();
        commit('setCategoryCategories', data);
      } catch (error) {
        commit('setCategoryError', error.message);
      } finally {
        commit('setCategoryLoading', false);
      }
    },

    async fetchCategoryBrands({ commit }) {
      try {
        commit('setCategoryLoading', true);

        const { data } = await categoryService.getBrands();

        commit('setCategoryBrands', data);
      } catch (error) {
        commit('setCategoryError', error.message);
      } finally {
        commit('setCategoryLoading', false);
      }
    },
  },
  namespaced: true,
};

export default categoryModule;
