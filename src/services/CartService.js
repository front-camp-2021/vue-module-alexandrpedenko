import axios from 'axios';
import { stringify } from 'query-string';
import StorageService from './StorageService';

export default class CartService {
  backendUrl = process.env.VUE_APP_API_URL;

  constructor() {
    this.storage = new StorageService();
  }

  setCartToLocalStorage(productId) {
    let cartIdListFromStorage = this.storage.getStorage('cartIdList');

    if (cartIdListFromStorage) {
      cartIdListFromStorage.push(productId);
      this.storage.setStorage('cartIdList', cartIdListFromStorage);
    } else {
      cartIdListFromStorage = [productId];
      this.storage.setStorage('cartIdList', cartIdListFromStorage);
    }
  }

  removeCartItemFromLocalStorage(productId) {
    let cartIdListFromStorage = this.storage.getStorage('cartIdList');

    if (cartIdListFromStorage && cartIdListFromStorage.length > 0) {
      cartIdListFromStorage = cartIdListFromStorage.filter(
        (listItemId) => listItemId !== productId,
      );
      this.storage.setStorage('cartIdList', cartIdListFromStorage);
    }
  }

  getCartFromStorage() {
    const cartIdListFromStorage = this.storage.getStorage('cartIdList');
    if (cartIdListFromStorage) {
      return cartIdListFromStorage;
    }
    return [];
  }

  getCartProducts(cartIdList) {
    const stringifyUrl = stringify({
      id: cartIdList && cartIdList.length > 0 ? cartIdList : null,
    });
    const fullUrl = `${this.backendUrl}/products?${stringifyUrl}`;
    return axios.get(fullUrl);
  }

  getSingleCartProduct(productId) {
    const stringifyUrl = stringify({
      id: productId || null,
    });
    const fullUrl = `${this.backendUrl}/products?${stringifyUrl}`;
    return axios.get(fullUrl);
  }
}
