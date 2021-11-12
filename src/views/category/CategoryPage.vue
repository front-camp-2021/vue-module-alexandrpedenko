<template>
  <div class="category">
    <div class="category__row">
      <aside class="category__sidebar">
        <SidebarFilter
          v-if="!isFilterLoading"
          :brands-filters="filterBrands"
          :category-filters="filterCategories"
        />
      </aside>
      <main class="category__main">
        <div class="search">
          <div class="search__results">
            <span class="search__results-text">{{ productsCount }} results found </span>
            <div class="search__buttons">
              <div class="search__buttons-wrapper">
                <AppButton
                  :size="'icon'"
                  :icon="'HeartWhite'"
                  :color="'primary'"
                  @click="$router.push('/favorites')"
                />
                <span
                  v-if="favoritesCount"
                  class="search__buttons-count"
                >
                  {{ favoritesCount }}
                </span>
              </div>
        
              <div class="search__buttons-wrapper">
                <AppButton
                  :size="'icon'"
                  :icon="'ShoppingBag'"
                  :color="'primary'"
                  @click="$router.push('/cart')"
                />
                <span
                  v-if="cartCount"
                  class="search__buttons-count"
                >
                  {{ cartCount }}
                </span>
              </div>
            </div> 
          </div>
          <AppSearch @updateSearch="searchQueryChange" />
        </div>

        <ProductList
          v-if="!isProductsLoading"
          :product-list="products"
        />
        <AppNotFound
          v-if="!isProductsLoading && productsCount === 0"
          :text="'Products not found'"
        />
      </main>
    </div>
    <ThePagination
      :total-pages="productsCount"
      :current-page="currentPage"
    />
  </div>
</template>

<script>
import {ref, onMounted, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import AppButton from '@/components/UI/AppButton.vue';
import AppSearch from '@/components/UI/AppSearch.vue';
import SidebarFilter from '@/components/SidebarFilter.vue';
import ProductList from '@/components/ProductList.vue';
import AppNotFound from '@/components/UI/AppNotFound.vue';
import ThePagination from '@/components/ThePagination.vue';
import { useFilterData } from '@/hooks/useCategoryFilter.js';
import { useProducts  } from '@/hooks/useProducts.js';
import { useFavorites } from '@/hooks/useFavorites.js'
import { useCart } from '@/hooks/useCart.js'

export default {
  name: 'CategoryPage',
  components: { AppSearch, SidebarFilter, ProductList, AppNotFound, ThePagination, AppButton },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentPage = ref(1);
    const searchQuery = ref('');

    const { 
      isFilterLoading,
      filterCategories, 
      filterBrands, 
    } = useFilterData();

    const {
      isProductsLoading,
      products,
      productsCount,
      fetchProductsByQueryUrl
    } = useProducts();

    const { favoritesCount } = useFavorites();
    const { cartCount } = useCart();

    const searchQueryChange = (value) => {
      router.push({
        path: 'products',
        query: { ...route.query, page: 1, q: value },
      })
    }

    watch(
      route,
      (newRouteValue) => {
        if (Object.keys(newRouteValue.query).length !== 0) {
          if (newRouteValue.query.page) {
            currentPage.value = parseInt(newRouteValue.query.page, 10);
          }

          fetchProductsByQueryUrl(newRouteValue.query);
        }
      }
    )

    onMounted(() => {
      currentPage.value = route.query.page ? parseInt(route.query.page, 10) : 1;
      fetchProductsByQueryUrl(route.query);
    })

    return {
      currentPage,
      isFilterLoading,
      filterBrands,
      filterCategories,
      isProductsLoading,
      products,
      productsCount,
      searchQuery,
      searchQueryChange,
      favoritesCount,
      cartCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.category {
  width: 100%;
  margin-top: 44px;

  &__row {
    display: flex;
    margin: 0 -15px;
  }

  &__sidebar,
  &__main {
    padding: 0 15px;
  }

  &__sidebar {
    flex: 0 0 30%;
    max-width: 560px;
  }

  &__main {
    width: 100%;
  }
}

/* Media Query */
@media screen and (max-width: 1200px) {
  .category {
    &__row {
      flex-direction: column;
    }

    &__sidebar {
      max-width: 100%;
      margin-bottom: 20px;
    }
  }
}

.search {
  &__results {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 16px;

    &-text {
      @include text-format(normal, normal, 18px, 21px);
    }
  }
}

.search__buttons {
  display: flex;
}

.search__buttons-wrapper {
  position: relative;
  &:first-child {
    margin-right: 12px;
  }
}

.search__buttons-count {
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  width: 22px;
  height: 22px;
  color: #ffffff;
  background-color: rgb(224, 75, 75);
  border-radius: 50%;
}
</style>