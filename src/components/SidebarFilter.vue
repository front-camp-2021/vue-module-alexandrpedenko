<template>
  <div class="filter">
    <div class="filter__header">
      <h3 class="filter__header-title">
        Filters
      </h3>
      <AppButton
        :color="'white'"
        :size="'icon'"
        :icon="'ChevronsRight'"
      />
    </div>
    <div class="filter__body">
      <SidebarFilterRange
        v-model="priceRangeModel"
        :title="'Price'"
        :min="0"
        :max="85000"
        :min-val="priceRange.minValue"
        :max-val="priceRange.maxValue"
        :step="100"
      />
      <SidebarFilterRange
        v-model="productRatingModel"
        :title="'Rating'"
        :min="0"
        :max="5"
        :min-val="productRating.minValue"
        :max-val="productRating.maxValue"
        :step="0.1"
      />
      <SidebarFilterCheckboxes
        v-model="checkedBrands"
        :filter-checkbox-list="brandsFilters"
        :filter-checkbox-title="'Brand'"
      />
      <SidebarFilterCheckboxes
        v-model="checkedCategories"
        :filter-checkbox-list="categoryFilters"
        :filter-checkbox-title="'Category'"
      />
    </div>
    <AppButton
      :color="'primary'"
      :size="'medium'"
      :text="'Clear all filters'"
      class="filter__clearButton"
      @click="resetFilterHandler"
    />
  </div>
</template>

<script>
import AppButton from "@/components/UI/AppButton.vue";
import SidebarFilterRange from "./SidebarFilterRange.vue";
import SidebarFilterCheckboxes from "./SidebarFilterCheckboxes.vue";

export default {
  name: "SidebarFilter",
  components: { AppButton, SidebarFilterCheckboxes, SidebarFilterRange },
  props: {
    brandsFilters: {
      default: () => {},
      type: Array,
    },
    categoryFilters: {
      default: () => {},
      type: Array,
    },
  },
  data() {
    return {
      checkedBrands: [],
      checkedCategories: [],
      priceRangeModel: {},
      productRatingModel: {},
      priceRange: { minValue: 0, maxValue: 85000 },
      productRating: { minValue: 0, maxValue: 5 },
    };
  },

  watch: {
    priceRangeModel: {
      handler(newValue) {
        this.priceRange.minValue = newValue.minValue;
        this.priceRange.maxValue = newValue.maxValue;

        this.$router.push({
          path: "products",
          query: {
            ...this.$route.query,
            page: "1",
            price_gte: newValue.minValue,
            price_lte: newValue.maxValue,
          },
        });
      },
      deep: true,
    },

    productRatingModel: {
      handler(newValue) {
        this.productRating.minValue = newValue.minValue;
        this.productRating.maxValue = newValue.maxValue;

        this.$router.push({
          path: "products",
          query: {
            ...this.$route.query,
            page: "1",
            rating_gte: this.productRating.minValue,
            rating_lte: this.productRating.maxValue,
          },
        });
      },
      deep: true,
    },

    checkedBrands: {
      handler() {
        const queryBrands = [...this.checkedBrands];

        if (queryBrands.length > 0) {
          this.$router.push({
            path: "products",
            query: { ...this.$route.query, page: "1", brand: [...queryBrands].join(",") },
          });
        } else {
          this.$router.push({
            path: "products",
            query: { ...this.$route.query, brand: undefined },
          });
        }
      },
      deep: true,
    },

    checkedCategories: {
      handler() {
        const queryCategories = [...this.checkedCategories];

        if (queryCategories.length > 0) {
          this.$router.push({
            path: "products",
            query: { ...this.$route.query, page: "1", category: [...queryCategories].join(",") },
          });
        } else {
          this.$router.push({
            path: "products",
            query: { ...this.$route.query, category: undefined },
          });
        }
      },
      deep: true,
    },

    // Check route change for reset fitler
    $route: {
      handler(newVal, oldVal) {
        if (oldVal.path === newVal.path && Object.keys(newVal.query).length === 0) {
          this.checkedBrands = [];
          this.checkedCategories = [];
          this.priceRange.minValue = 0;
          this.priceRange.maxValue = 85000;
          this.productRating.minValue = 0;
          this.productRating.maxValue = 5;
        }
      },
    },
  },

  beforeMount() {
    this.setFiltersByRouteQuery();
  },

  methods: {
    setFiltersByRouteQuery() {
      if (this.$route.query.brand) {
        const brandQuery = this.$route.query.brand;
        this.checkedBrands = brandQuery.split(",");
      } else {
        this.checkedBrands = [];
      }

      if (this.$route.query.category) {
        const categoriesQiery = this.$route.query.category;
        this.checkedCategories = categoriesQiery.split(",");
      } else {
        this.checkedCategories = [];
      }

      if (this.$route.query.price_gte && this.$route.query.price_lte) {
        this.priceRange.minValue = parseInt(this.$route.query.price_gte, 10);
        this.priceRange.maxValue = parseInt(this.$route.query.price_lte, 10);
      } else {
        this.priceRange.minValue = 0;
        this.priceRange.maxValue = 85000;
      }

      if (this.$route.query.rating_gte && this.$route.query.rating_lte) {
        this.productRating.minValue = parseFloat(this.$route.query.rating_gte, 10);
        this.productRating.maxValue = parseFloat(this.$route.query.rating_lte, 10);
      } else {
        this.productRating.minValue = 0;
        this.productRating.maxValue = 5;
      }
    },

    resetFilterHandler() {
      this.$router.push({ path: "/products" });
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/vars.scss";
@import "./src/assets/styles/mixins.scss";

.filter {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    &-title {
      @include text-format(normal, normal, 18px, 21px);
    }
  }

  &__body {
    flex-grow: 1;
    margin-bottom: 28px;
    width: 100%;
    padding: 20px 48px;
    background: $white;
    box-shadow: $box_shadow;
    border-radius: $border_radius;
  }

  &__clearButton {
    height: 56px;
    font-family: $main_font;
    @include text-format(normal, normal, 18px, 21px);
    box-shadow: $box_shadow;
    border-radius: $border_radius;
  }
}

/* Media Query */
@media screen and (max-width: 1200px) {
  .filter {
    &__body,
    &__clearButton {
      display: none;
    }
  }
}
</style>
