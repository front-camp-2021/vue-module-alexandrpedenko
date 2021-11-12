import { ref, onMounted, computed } from "vue";
import FavoritesService from '../services/FavoritesService'

const favoritesService = new FavoritesService();

const isFavoritesLoading = ref(false);
const favoritesError = ref('');
const favoritesIdList = ref([]);
const favoritesProducts = ref([]);

export function useFavorites() {
  const addToFavorites = (id) => {
    favoritesService.setFavoritesToLocalStorage(id);
    favoritesIdList.value.push(id);
  };

  const removeFromFavorites = (id) => {
    favoritesService.removeFavoritesFromLocalStorage(id);

    favoritesIdList.value = favoritesIdList.value.filter(
      (idItem) => idItem !== id,
    );
    favoritesProducts.value = favoritesProducts.value.filter((product) => product.id !== id);
  };

  const getFavoritesIdList= () => {
    favoritesIdList.value = favoritesService.getFavoritesFromStorage();
  };

  const fetchByFavoritesIdList = async () => {
    try {
      isFavoritesLoading.value = true;
      const { data } = await favoritesService.getFavoritesProducts();
      favoritesProducts.value = data;
    } catch (error) {
      favoritesError.value = error.message;
    } finally {
      isFavoritesLoading.value = false;
    }
  };

  const isInFavorites = (productId) =>  {
    return favoritesIdList.value.includes(productId);
  };

  const favoritesCount = computed(() => {
    return favoritesIdList.value.length > 0 ? favoritesIdList.value.length : null;
  })

  onMounted(
    getFavoritesIdList
  );

  return {
    isFavoritesLoading,
    favoritesProducts,
    favoritesIdList,
    favoritesError,
    isInFavorites,
    favoritesCount,

    addToFavorites,
    removeFromFavorites,
    getFavoritesIdList,
    fetchByFavoritesIdList
  }

}