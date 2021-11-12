import { ref } from "vue";
import ProductService from '../services/ProductService';

const productService = new ProductService();

const isProductLoading = ref(false);
const productError = ref('');
const product = ref({});

export function useSingleProduct() {

  const fetchSingleProduct = async (id) => {
    try {
      isProductLoading.value = true;

      const { data } = await productService.loadSingleProduct(id);

      product.value = data[0]

    } catch (error) {
      productError.value = error.message;
    } finally {
      isProductLoading.value = false;
    }
  };

  return {
    fetchSingleProduct,
    isProductLoading,
    productError,
    product,
  }
}