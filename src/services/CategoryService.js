import axios from 'axios';

export default class CategoryService {
  backendUrl = process.env.VUE_APP_API_URL;

  getProducts(url) {
    return axios.get(`${this.backendUrl}${url}`);
  }

  getCategories() {
    return axios.get(`${this.backendUrl}/categories`);
  }

  getBrands() {
    return axios.get(`${this.backendUrl}/brands`);
  }
}
