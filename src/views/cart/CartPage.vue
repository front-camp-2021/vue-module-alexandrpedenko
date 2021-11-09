<template>
  <div class="full-width">
    <div class="full-width__row">
      <main class="full-width__main">
        <h1>Cart Page</h1>
        <div
          v-if="!isLoading && !cartEmpty"
          class="cart"
        >
          <CartItem
            v-for="product in cartProducts"
            :key="product.id"
            :product="product"
          />
          <div class="cart-total-price">
            <div class="cart-total-price__title">
              Total Cart Price
            </div>
            <div class="cart-total-price__price">
              ${{ cartTotalPrice }}
            </div>
          </div>
        </div>
        <AppNotFound
          v-if="!isLoading && cartEmpty"
          :text="'Not products in your cart yet'"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppNotFound from '@/components/UI/AppNotFound.vue';
import CartItem from './components/CartItem.vue';

export default {
  name: 'CartPage',
  components: { CartItem, AppNotFound },
  computed: {
    ...mapState({
      isLoading: (state) => state.cart.isLoading,
      cartProducts: (state) => state.cart.cartProducts,
    }),

    ...mapGetters({
      cartTotalPrice: 'cart/cartTotalPrice',
    }),

    cartEmpty() {
      return this.cartProducts.length === 0;
    },
  },
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

.cart {
  margin: 30px 0;
  padding: 30px;
  background-color: #fff;
  border-radius: $border_radius;
  box-shadow: $box_shadow;
}

.cart-total-price {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  &__title {
    font-size: 24px;
  }

  &__price {
    margin-left: 30px;
    font-size: 30px;
  }
}

@media screen and (max-width: 480px) {
  .cart {
    padding: 10px;
  }

  .cart-total-price {
    flex-direction: column;

    &__price {
      margin-left: 0;
    }
  }
}
</style>
