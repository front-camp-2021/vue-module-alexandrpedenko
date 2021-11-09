<template>
  <div class="full-width">
    <div class="full-width__row">
      <main class="full-width__main">
        <h1>Favorites Page</h1>
        <div v-if="!isLoading">
          <ProductList 
            :product-list="favoritesProducts" 
          />
        </div>
        <AppNotFound
          v-if="!isLoading && notFoundProducts"
          :text="'Not added to favorites yet'"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppNotFound from '@/components/UI/AppNotFound.vue';
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'FavoritesPage',
  components: { ProductList, AppNotFound },
  computed: {
    ...mapState({
      isLoading: (state) => state.favorites.isLoading,
      favoritesProducts: (state) => state.favorites.favoritesProducts,
    }),

    notFoundProducts() {
      return this.favoritesProducts.length === 0;
    },
  },
  mounted() {
    this.$store.dispatch('favorites/fetchByFavoritesIdList');
  },
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
