export default class StorageService {
  setStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('Error saving to localStorage', err);
    }
  }

  getStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.error('Error getting data from localStorage', err);
      return null;
    }
  }
}
