import axios from 'axios';
import { stringify } from 'query-string';

export default class FavoritesService {
  backendUrl = process.env.VUE_APP_API_URL;

  loadSingleProduct(productId) {
    const stringifyUrl = stringify({
      id: productId && productId.length > 0 ? productId : null,
    });

    const fullUrl = `${this.backendUrl}/products?${stringifyUrl}`;
    return axios.get(fullUrl);
  }
}
