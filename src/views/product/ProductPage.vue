<template>
  <div class="full-width">
    <div class="full-width__row">
      <main class="full-width__main">
        <div
          v-if="!isProductLoading"
          class="product"
        >
          <div class="product__image">
            <img
              class="product__image"
              :src="product.images && product.images[0]"
              :alt="product.title"
            >
          </div>
          <div class="product__right">
            <h1 class="product__name">
              {{ product.title }}
            </h1>
            <div class="product__info">
              <div class="product__description">
                <router-link
                  :to="{
                    path: `/${currentParentPath}`,
                    query: { page: 1, category: product.category },
                  }"
                >
                  {{ product.category }}
                </router-link>
                <router-link
                  :to="{ path: `/${currentParentPath}`, query: { page: 1, brand: product.brand } }"
                >
                  {{ product.brand }}
                </router-link>
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
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute} from 'vue-router'
import AppButton from '@/components/UI/AppButton.vue';
import { useSingleProduct } from '@/hooks/useSingleProduct.js';
import { useFavorites } from '@/hooks/useFavorites.js';
import { useCart } from '@/hooks/useCart.js';

export default {
  name: 'ProductPage',
  components: { AppButton },
  props: ['id'],

  setup(props) {
    const route = useRoute();
    const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
    const { addToCartOrIncrement } = useCart();
    const {
      fetchSingleProduct,
      isProductLoading,
      product,
    } = useSingleProduct();

    const currentParentPath = computed(() => route.path.split('/')[1])

    onMounted(() => {
      fetchSingleProduct(props.id);
    })

    return {
      product,
      isInFavorites,
      addToFavorites,
      isProductLoading,
      removeFromFavorites,
      addToCartOrIncrement,
      currentParentPath
    }
  }
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

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

.product {
  padding: 140px;
  display: flex;
  border-radius: $border_radius;
  background-color: #fff;
  box-shadow: $box_shadow;

  &__image {
    flex: 0 0 30%;

    img {
      max-width: 100%;
    }
  }

  &__right {
    padding-left: 40px;
  }

  &__name {
    font-size: 24px;
  }

  &__rating-price {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 30px;
  }

  &__info {
    margin-top: 20px;
    max-width: 300px;
  }

  &__description {
    display: flex;
    justify-content: space-between;
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
      background: url('../../assets/icons/star.svg') no-repeat 50% 50%;
      background-size: cover;
    }
  }

  &__price {
    flex-grow: 1;
    @include text-format(normal, normal, 28px, 28px);
    text-align: right;
    color: $text_color;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
  }

  &__button {
    margin-top: 20px;
    height: 45px;
    border-radius: $border_radius;
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
    background: url('../../assets/icons/heart.svg') no-repeat 50% 50%;
    background-size: cover;
  }

  &__addToCart::before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    width: 20px;
    height: 18px;
    background: url('../../assets/icons/shopping-bag.svg') no-repeat 50% 50%;
    background-size: cover;
  }
}

</style>
