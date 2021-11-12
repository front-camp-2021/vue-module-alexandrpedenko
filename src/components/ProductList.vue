<template>
  <div class="product-list">
    <div
      v-for="product in productList"
      :key="product.id"
      class="product-wrapper"
    >
      <ProductListItem
        v-if="product"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductListItem from '@/components/ProductListItem.vue';

export default {
  name: 'ProductList',
  components: { ProductListItem },
  props: {
    productList: {
      type: Array,
      default: () => {}
    },
  },
};
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -14px;
}

.product-wrapper {
  flex: 0 0 33.33%;
  max-width: 33.33%;
  margin-top: 28px;
  padding: 0 14px;
}

/* Media Query */
@media screen and (max-width: 768px) {
  .product-wrapper {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media screen and (max-width: 480px) {
  .product-wrapper {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
