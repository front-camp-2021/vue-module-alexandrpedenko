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
        :title="'Price'"
        :min="0"
        :max="85000"
        :range-value="productPriceRange"
        :step="100"
        @updateRangeSlider="updatePriceRangeSlider"
      />
      <SidebarFilterRange
        :title="'Rating'"
        :min="0"
        :max="5"
        :range-value="productRatingRange"
        :step="0.1"
        @updateRangeSlider="updateRatingRangeSlider"
      /> 
      <SidebarFilterCheckboxes
        :filter-checkbox-list="brandsFilters"
        :checked-items-props="checkedBrands"
        :filter-checkbox-title="'Brand'"
        @updateCheckboxes="updateBrandsHandler"
      />
      <SidebarFilterCheckboxes
        :filter-checkbox-list="categoryFilters"
        :checked-items-props="checkedCategories"
        :filter-checkbox-title="'Category'"
        @updateCheckboxes="updateCategoryHandler"
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
import {ref, watch, onMounted, onBeforeMount} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import AppButton from '@/components/UI/AppButton.vue';
import SidebarFilterCheckboxes from './SidebarFilterCheckboxes.vue';
import SidebarFilterRange from './SidebarFilterRange.vue';

export default {
  name: 'SidebarFilter',
  components: { AppButton, SidebarFilterCheckboxes, SidebarFilterRange },

  props: {
    brandsFilters: {
      type: Array,
      default: () => {}
    },
    categoryFilters: {
      type: Array,
      default: () => {}
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const checkedBrands = ref([]);
    const checkedCategories = ref([]);
    const productRatingRange = ref({ minValue: 0, maxValue: 5 })
    const productPriceRange = ref({ minValue: 0, maxValue: 85000 })

    const updatePriceRangeSlider = (value) => {
      router.push({
        path: 'products',
        query: {
          ...route.query,
          page: '1',
          price_gte: value.minValue,
          price_lte: value.maxValue,
        },
      });
    }

    const updateRatingRangeSlider = (value) => {
      router.push({
        path: 'products',
        query: {
          ...route.query,
          page: '1',
          rating_gte: value.minValue,
          rating_lte: value.maxValue,
        },
      });
    }

    const updateBrandsHandler = (value) => {
      if (value && value.length > 0) {
        router.push({
          path: 'products',
          query: { ...route.query, page: 1, brand: value.join(',') },
        })
      } else {
        router.push({
          path: 'products',
          query: { ...route.query, brand: undefined },
        });
      }
    }

    const updateCategoryHandler = (value) => {
      if (value && value.length > 0) {
        router.push({
          path: 'products',
          query: { ...route.query, page: 1, category: value.join(',') },
        })
      } else {
        router.push({
          path: 'products',
          query: { ...route.query, category: undefined },
        });
      }
    }

    const setFiltersByRouteQuery = () => {
      if (route.query.brand) {
        const brandQuery = route.query.brand;
        checkedBrands.value = brandQuery.split(',');
      } else {
        checkedBrands.value = [];
      }

      if (route.query.category) {
        const categoryQuery = route.query.category;
        checkedCategories.value = categoryQuery.split(',');
      } else {
        checkedCategories.value = [];
      }

      if (route.query.price_gte && route.query.price_lte) {
        productPriceRange.value.minValue = parseInt(route.query.price_gte, 10);
        productPriceRange.value.maxValue = parseInt(route.query.price_lte, 10);
      } else {
        productPriceRange.value.minValue = 0;
        productPriceRange.value.maxValue = 85000;
      }

      if (route.query.rating_gte && route.query.rating_lte) {
        productRatingRange.value.minValue = parseFloat(route.query.rating_gte, 10);
        productRatingRange.value.maxValue = parseFloat(route.query.rating_lte, 10);
      } else {
        productRatingRange.value.minValue = 0;
        productRatingRange.value.maxValue = 5;
      }
    }

    watch(route, (newValue, oldValue) => {
      if (oldValue.path === newValue.path && Object.keys(newValue.query).length === 0) {
        checkedBrands.value = [];
        checkedCategories.value = [];
        productPriceRange.value = { minValue: 0, maxValue: 85000 }
        productRatingRange.value ={ minValue: 0, maxValue: 5 }
      }
    })

    const resetFilterHandler = () => {
      router.push({ path: '/products' });
      window.scrollTo(0, 0);
    }

    onBeforeMount(() => {
      setFiltersByRouteQuery()
    })

    return {
      checkedBrands,
      checkedCategories,
      productPriceRange,
      productRatingRange,
      resetFilterHandler,
      updateBrandsHandler,
      updateCategoryHandler,
      updatePriceRangeSlider,
      updateRatingRangeSlider,
    }
  }
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

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
