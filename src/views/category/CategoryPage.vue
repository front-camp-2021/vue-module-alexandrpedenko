<template>
  <div>
    <div class="category">
      <div class="category__row">
        <aside class="category__sidebar">
          <SidebarFilter 
            :brands-filters="brands" 
            :category-filters="categories" 
          />
        </aside>
        <main class="category__main">
          <div class="search">
            <div class="search__results">
              <span class="search__results-text">{{ totalCount }} results found </span>
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
            <AppSearch v-model="searchQuery" />
          </div>

          <ProductList
            v-if="!isLoading"
            :product-list="products"
          />
          <AppNotFound
            v-if="!isLoading && totalCount === 0"
            :text="'Products not found'"
          />
        </main>
      </div>
    </div>
    <ThePagination
      :total-pages="totalCount"
      :current-page="currentPage"
    />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import { mapState, mapGetters, mapActions } from "vuex";
import { stringify, parseUrl } from "query-string";
import AppButton from "@/components/UI/AppButton.vue";
import AppSearch from "@/components/UI/AppSearch.vue";
import ProductList from "@/components/ProductList.vue";
import SidebarFilter from "@/components/SidebarFilter.vue";
import ThePagination from "@/components/ThePagination.vue";
import AppNotFound from "@/components/UI/AppNotFound.vue";

export default {
  name: "CategoryPage",
  // eslint-disable-next-line object-curly-newline
  components: { AppButton, AppSearch, ThePagination, SidebarFilter, ProductList, AppNotFound },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      pageLimit: process.env.VUE_APP_PAGE_LIMIT,
      productsUrl: "/products",
    };
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.category.isLoading,
      products: (state) => state.category.products.data,
      cartProductsIdList: (state) => state.cart.cartProductsIdList,
      favoritesIdList: (state) => state.favorites.favoritesProductsIdList,
    }),

    ...mapGetters({
      totalCount: "category/totalFoundCount",
      brands: "category/preparedBrands",
      categories: "category/preparedCategories",
    }),

    favoritesCount() {
      return this.favoritesIdList.length > 0 ? this.favoritesIdList.length : null;
    },

    cartCount() {
      return this.cartProductsIdList.length > 0 ? this.cartProductsIdList.length : null;
    },
  },

  watch: {
    $route(to) {
      if (to.query.page) {
        this.currentPage = parseInt(to.query.page, 10);
      }

      this.fetchProductsByQueryUrl(to.query);
    },

    searchQuery(value) {
      this.$router.push({
        path: "products",
        query: { ...this.$route.query, page: 1, q: value },
      });
    },
  },

  mounted() {
    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page, 10);
    }
    this.fetchProductsByQueryUrl(this.$route.query);

    this.$store.dispatch("category/fetchCategoryCategories");
    this.$store.dispatch("category/fetchCategoryBrands");
  },

  methods: {
    fetchProductsByQueryUrl(query) {
      const parsedUrl = parseUrl(this.productsUrl);
      const stringifiedParams = stringify(
        {
          _limit: this.pageLimit,
          q: query.q ? query.q : null,
          _page: query.page ? query.page : null,
          brand: query.brand ? query.brand.split(",") : null,
          category: query.category ? query.category.split(",") : null,
          price_gte: query.price_gte ? query.price_gte : null,
          price_lte: query.price_lte ? query.price_lte : null,
          rating_gte: query.rating_gte ? query.rating_gte : null,
          rating_lte: query.rating_lte ? query.rating_lte : null,
          ...parsedUrl.query,
        },
        {
          skipNull: true,
        }
      );

      const url = `${parsedUrl.url}?${stringifiedParams}`;
      this.fetchProducts(url);
    },
    ...mapActions({
      fetchProducts: "category/fetchCategoryProduct",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/vars.scss";
@import "./src/assets/styles/mixins.scss";

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
