<template>
  <div class="full-width">
    <div class="full-width__row">
      <main class="full-width__main">
        <h1>Cart Page</h1>
        <div
          v-if="!isCartLoading && !cartEmpty"
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
          v-if="!isCartLoading && cartEmpty"
          :text="'Not products in your cart yet'"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import AppNotFound from '@/components/UI/AppNotFound.vue';
import CartItem from './components/CartItem.vue';
import { useCart } from '@/hooks/useCart.js';

export default {
  name: 'CartPage',
  components: { CartItem, AppNotFound },

  setup() {
    const {
      isCartLoading,
      cartProducts,
    } = useCart();

    const cartTotalPrice = computed(() => {
      return cartProducts.value.reduce(
        (prevValue, currentValue) => prevValue + currentValue.price * currentValue.count,
        0,
      )
    });

    const cartEmpty = computed(() => cartProducts.value.length === 0)

    return {
      isCartLoading,
      cartTotalPrice,
      cartProducts,
      cartEmpty
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
