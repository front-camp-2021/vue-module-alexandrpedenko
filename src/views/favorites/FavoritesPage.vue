<template>
  <div class="full-width">
    <div class="full-width__row">
      <main class="full-width__main">
        <h1>Favorites Page</h1>
        <div v-if="!isFavoritesLoading">
          <ProductList :product-list="favoritesProducts" />
        </div>
        <AppNotFound
          v-if="!isFavoritesLoading && notFoundProducts"
          :text="'Not added to favorites yet'"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import AppNotFound from '@/components/UI/AppNotFound.vue';
import ProductList from '@/components/ProductList.vue';
import { useFavorites } from '@/hooks/useFavorites.js'

export default {
  name: 'FavoritesPage',
  components: { ProductList, AppNotFound },
  setup() {
    const { 
      isFavoritesLoading, 
      favoritesProducts,
      fetchByFavoritesIdList,
    } = useFavorites();

    onMounted(() => {
      fetchByFavoritesIdList();
    });

    const notFoundProducts = computed(() => {
      return favoritesProducts.value.length === 0
    })

    return {
      isFavoritesLoading,
      notFoundProducts,
      favoritesProducts
    }
  }
};
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
  margin-top: 44px;

  &__row {
    display: flex;
    margin: 0 -15px;
  }

  &__main {
    width: 100%;
    padding: 0 15px;
  }
}
</style>
