<template>
  <div class="product">
    <div class="product__image-wrapper">
      <img
        class="product__image"
        :src="product.images[0]"
        :alt="product.title"
      >
    </div>
    <div class="product__rating-price">
      <div
        v-if="product.rating"
        class="product__rating"
      >
        <span class="product__rating-text">{{ product.rating }}</span>
      </div>
      <span class="product__price">${{ product.price }}</span>
    </div>
    <div class="product__info">
      <h3 class="product__name">
        <router-link
          class="product__name-link"
          :to="{ path: `/products/${product.id}` }"
        >
          {{ product.title }}
        </router-link>
      </h3>
      <span class="product__description">
        <span data-testid="productCategory">{{ product.category }}</span>
        &nbsp; | &nbsp;
        <span data-testid="productBrand">{{ product.brand }}</span>
      </span>
    </div>
    <div class="product__buttons">
      <AppButton
        v-if="isInFavorites(product.id)"
        :text="'Unfavorite'"
        :size="'medium'"
        :color="'secondary'"
        class="product__button"
        @click="removeFromFavorites(product.id)"
      />
      <AppButton
        v-if="!isInFavorites(product.id)"
        :icon="'Heart'"
        :text="'Wishlist'"
        :size="'medium'"
        :color="'secondary'"
        class="product__button"
        @click="addToFavorites(product.id)"
      />
      <AppButton
        :icon="'ShoppingBag'"
        :text="'Add to cart'"
        :size="'medium'"
        :color="'primary'"
        class="product__button"
        @click="addToCartOrIncrement(product.id)"
      />
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/UI/AppButton.vue';
import { useFavorites } from '@/hooks/useFavorites.js';
import { useCart } from '@/hooks/useCart.js';

export default {
  name: 'ProductListItem',
  components: { AppButton },
  props: {
    product: {
      type: Object,
      default: () => {}
    },
  },

  setup() {
    const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
    const { addToCartOrIncrement } = useCart();

    return {
      isInFavorites,
      addToCartOrIncrement,
      addToFavorites,
      removeFromFavorites
    }
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: $white;
  box-shadow: $box_shadow;
  border-radius: $border_radius;
  overflow: hidden;

  &__image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-grow: 1;
    height: 300px;
    padding: 10px 10px 10px 10px;
  }

  &__image {
    display: block;
    max-width: 100%;
    height: 100%;
  }

  &__rating-price {
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding: 0 24px;
  }

  &__rating {
    display: flex;
    align-items: flex-end;
    padding: 6px 10px;
    @include text-format(normal, normal, 14px, 17px);
    color: #fff;
    background: $primary;
    border-radius: 3px;
  }

  &__rating-text {
    display: flex;
    align-items: center;

    &:after {
      content: '';
      margin-left: 10px;
      display: inline-block;
      height: 14px;
      width: 14px;
      background: url('../assets/icons/star.svg') no-repeat 50% 50%;
      background-size: cover;
    }
  }

  &__price {
    flex-grow: 1;
    @include text-format(normal, normal, 18px, 21px);
    text-align: right;
    color: $text_color;
  }

  &__info {
    padding: 16px 24px;
  }

  &__name {
    font-weight: normal;
    @include text-format(normal, normal, 164px, 19px);
    font-size: 16px;
    line-height: 19px;
    color: $text_color;
  }

  &__name-link {
    color: $text_color;

    &:hover {
      color: $primary_text;
    }
  }

  &__description {
    @include text-format(normal, 300, 12px, 14px);
  }

  &__buttons {
    display: flex;
  }

  &__button {
    flex: 0 0 50%;
  }

  &__wishlist,
  &__addToCart {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__wishlist::before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    width: 16px;
    height: 13px;
    background: url('../assets/icons/heart.svg') no-repeat 50% 50%;
    background-size: cover;
  }

  &__addToCart::before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    width: 20px;
    height: 18px;
    background: url('../assets/icons/shopping-bag.svg') no-repeat 50% 50%;
    background-size: cover;
  }
}

/* Media Query */
@media screen and (max-width: 480px) {
  .product {
    max-width: 100%;
  }
}
</style>
