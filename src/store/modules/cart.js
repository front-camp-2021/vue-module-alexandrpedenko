/* eslint-disable implicit-arrow-linebreak */
import CartService from '@/services/CartService';

const cartService = new CartService();

const cartModule = {
  state: {
    isLoading: false,
    error: null,
    cartProducts: [],
    cartProductsIdList: [],
  },

  getters: {
    cartProducts: (state) => state.cartProducts,
    cartProductsIdList: (state) => state.cartProductsIdList,
    cartLoading: (state) => state.isLoading,
    cartTotalPrice: (state) =>
      state.cartProducts.reduce(
        (prevValue, currentValue) => prevValue + currentValue.price * currentValue.count,
        0,
      ),
  },

  mutations: {
    setCartLoading(state, payload) {
      state.isLoading = payload;
      state.error = null;
    },

    setCartError(state, payload) {
      state.error = payload;
    },

    setCartProductsIdList(state, payload) {
      state.cartProductsIdList = payload;
    },

    setLoadedCartProducts(state, payload) {
      state.cartProducts = payload.map((cartItem) => ({ ...cartItem, count: 1 }));
    },

    addProductToCartIdList(state, payload) {
      state.cartProductsIdList.push(payload);
    },

    addProductToCart(state, payload) {
      state.cartProducts = [...state.cartProducts, { ...payload, count: 1 }];
    },

    incrementCartProduct(state, payload) {
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.id === payload) {
          return { ...cartItem, count: cartItem.count + 1 };
        }
        return cartItem;
      });
    },

    decrementCartProduct(state, payload) {
      state.cartProducts = state.cartProducts.map((cartItem) => {
        if (cartItem.id === payload) {
          return { ...cartItem, count: cartItem.count - 1 };
        }
        return cartItem;
      });
    },

    removeItemFromCart(state, payload) {
      state.cartProductsIdList = state.cartProductsIdList.filter((item) => item !== payload);
      state.cartProducts = state.cartProducts.filter((item) => item.id !== payload);
    },
  },

  actions: {
    async addToCart({ commit }, id) {
      cartService.setCartToLocalStorage(id);
      commit('addProductToCartIdList', id);

      const { data } = await cartService.getSingleCartProduct(id);
      commit('addProductToCart', data[0]);
    },

    removeFromCartAction({ commit }, id) {
      cartService.removeCartItemFromLocalStorage(id);
      commit('removeItemFromCart', id);
    },

    getCartItemsFromStorage({ commit }) {
      const cartIdList = cartService.getCartFromStorage();
      commit('setCartProductsIdList', cartIdList);
    },

    async fetchByCartIdList({ commit }) {
      try {
        commit('setCartLoading', true);

        const cartIdList = cartService.getCartFromStorage();
        commit('setCartProductsIdList', cartIdList);

        const { data } = await cartService.getCartProducts(cartIdList);

        commit('setLoadedCartProducts', data);
      } catch (error) {
        commit('setCartError', error.message);
      } finally {
        commit('setCartLoading', false);
      }
    },
  },
  namespaced: true,
};

export default cartModule;
