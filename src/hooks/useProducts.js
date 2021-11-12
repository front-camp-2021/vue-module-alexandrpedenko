import { ref } from "vue";
import { stringify, parseUrl } from 'query-string';
import CategoryService from '../services/CategoryService'

const categoryService = new CategoryService();

export function useProducts() {
  const isProductsLoading = ref(false);
  const productsError = ref('');
  const products = ref([]);
  const productsCount = ref(0);
  const productsUrl = '/products';
  const pageLimit = process.env.VUE_APP_PAGE_LIMIT;

  const fetchCategoryProduct = async (url) => {
    try {
      isProductsLoading.value = true;

      const response = await categoryService.getProducts(url);
      const totalCount = response.headers['x-total-count'];
      const { data } = response;

      products.value = data;
      productsCount.value = parseInt(totalCount, 10)
    } catch (error) {
      productsError.value = error.error.message;
    } finally {
      isProductsLoading.value = false;
    }
  };

  const fetchProductsByQueryUrl = (query) => {
    const parsedUrl = parseUrl(productsUrl);
    
    const stringifiedParams = stringify(
      {
        _limit: pageLimit,
        q: query.q ? query.q : null,
        _page: query.page ? query.page : null,
        brand: query.brand ? query.brand.split(',') : null,
        category: query.category ? query.category.split(',') : null,
        price_gte: query.price_gte ? query.price_gte : null,
        price_lte: query.price_lte ? query.price_lte : null,
        rating_gte: query.rating_gte ? query.rating_gte : null,
        rating_lte: query.rating_lte ? query.rating_lte : null,
        ...parsedUrl.query,
      },
      {
        skipNull: true,
      },
    );

    const url = `${parsedUrl.url}?${stringifiedParams}`;
    fetchCategoryProduct(url);
  };

  return {
    isProductsLoading,
    products,
    productsCount,
    fetchProductsByQueryUrl
  }

}