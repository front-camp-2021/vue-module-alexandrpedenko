import { ref, onMounted } from "vue";
import prepareFilters from '@/utils/prepareFilters';
import CategoryService from '../services/CategoryService'

const categoryService = new CategoryService();

export function useFilterData() {
  const isFilterLoading = ref(false);
  const filterCategories = ref([]);
  const filterBrands = ref([]);
  const filterError = ref('');

  const fetchFilterCategories = async () => {
    try {
      isFilterLoading.value = true;
      const { data } = await categoryService.getCategories();
      filterCategories.value = prepareFilters(data);
    } catch (error) {
      filterError.value = error.message;
    } finally {
      isFilterLoading.value = false;
    }
  }

  const fetchFilterBrands = async () => {
    try {
      isFilterLoading.value = true;
      const { data } = await categoryService.getBrands();
      filterBrands.value = prepareFilters(data);
    } catch (error) {
      filterError.value = error.message;
    } finally {
      isFilterLoading.value = false;
    }
  }

  onMounted(() => {
    fetchFilterCategories();
    fetchFilterBrands();
  })


  return {
    isFilterLoading,
    fetchFilterCategories,
    fetchFilterBrands,
    filterCategories,
    filterBrands,
    filterError,
  }
}