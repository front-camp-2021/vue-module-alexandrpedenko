import axios from 'axios';
import { stringify } from 'query-string';
import StorageService from './StorageService';

export default class FavoritesService {
  backendUrl = process.env.VUE_APP_API_URL;

  constructor() {
    this.storage = new StorageService();
  }

  setFavoritesToLocalStorage(productId) {
    let favoritesIdListFromStorage = this.storage.getStorage('favoritesIdList');

    if (favoritesIdListFromStorage) {
      favoritesIdListFromStorage.push(productId);
      this.storage.setStorage('favoritesIdList', favoritesIdListFromStorage);
    } else {
      favoritesIdListFromStorage = [productId];
      this.storage.setStorage('favoritesIdList', favoritesIdListFromStorage);
    }
  }

  removeFavoritesFromLocalStorage(productId) {
    let favoritesIdListFromStorage = this.storage.getStorage('favoritesIdList');

    if (favoritesIdListFromStorage && favoritesIdListFromStorage.length > 0) {
      favoritesIdListFromStorage = favoritesIdListFromStorage.filter(
        (listId) => listId !== productId,
      );
      this.storage.setStorage('favoritesIdList', favoritesIdListFromStorage);
    }
  }

  getFavoritesFromStorage() {
    const favoritesIdListFromStorage = this.storage.getStorage('favoritesIdList');
    if (favoritesIdListFromStorage) {
      return favoritesIdListFromStorage;
    }
    return [];
  }

  getFavoritesProducts() {
    const favoritesIdList = this.storage.getStorage('favoritesIdList');
    const stringifyUrl = stringify({
      id: favoritesIdList && favoritesIdList.length > 0 ? favoritesIdList : null,
    });
    const fullUrl = `${this.backendUrl}/products?${stringifyUrl}`;
    return axios.get(fullUrl);
  }
}
