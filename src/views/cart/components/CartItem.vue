<template>
  <div class="cart-item">
    <div class="cart-item__title-image">
      <img
        class="cart-item__image"
        :src="product.images[0]"
        :alt="product.title"
      >
      <div class="cart-item__title">
        <router-link :to="{ path: `/products/${product.id}` }">
          {{ product.title }}
        </router-link>
      </div>
    </div>
    <div class="cart-item__price">
      ${{ product.price }} x
    </div>
    <div class="cart-item__counts">
      <AppButton
        :text="'-'"
        :size="'icon'"
        :color="'secondary'"
        class="product__button"
        @click="decrementCartProductHandler(product.id)"
      />
      <span class="cart-item__count-input">{{ product.count }}</span>
      <AppButton
        :text="'+'"
        :size="'icon'"
        :color="'secondary'"
        class="product__button"
        @click="incrementCartProductHandler(product.id)"
      />
    </div>
    <div class="cart-item__total-price">
      ${{ cartProductTotalPrice }}
    </div>
    <AppButton
      :text="'Delete'"
      :size="'medium'"
      :color="'secondary'"
      class="cart-item__button cart-item__button-delete"
      @click="deleteCartProductHandler(product.id)"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import AppButton from '@/components/UI/AppButton.vue';

export default {
  name: 'CartItem',
  components: { AppButton },
  props: {
    product: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    cartProductTotalPrice() {
      return this.$props.product.price * this.$props.product.count;
    },
  },

  methods: {
    ...mapActions({
      removeFromCartAction: 'cart/removeFromCartAction',
    }),

    ...mapMutations({
      incrementCartProduct: 'cart/incrementCartProduct',
      decrementCartProduct: 'cart/decrementCartProduct',
    }),

    incrementCartProductHandler(productId) {
      this.incrementCartProduct(productId);
    },

    decrementCartProductHandler(productId) {
      if (this.$props.product.count < 2) {
        return;
      }
      this.decrementCartProduct(productId);
    },

    deleteCartProductHandler(producId) {
      this.removeFromCartAction(producId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.cart-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 30px 0;
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  &__title-image {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 0 10px;
  }

  &__image {
    max-width: 100px;
  }

  &__title {
    padding-left: 20px;
  }

  &__price {
    padding: 0 20px;
  }

  &__counts {
    padding: 0;
    display: flex;
    align-items: center;
    background-color: darken($background_color, 3%);
    border-radius: $border_radius;
  }

  &__count-input {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 80px;
    padding: 0 5px;
    text-align: center;
    border: none;
    outline: 0;
    background-color: darken($background_color, 3%);
  }

  &__total-price {
    width: 200px;
    text-align: center;
    font-weight: bold;
    padding: 0 20px;
  }

  &__button-delete {
    padding: 4px;
    font-weight: normal;
    font-size: 11px;
    text-transform: lowercase;
    border-radius: $border_radius;
    overflow: hidden;
  }
}

/* Media Query */
@media screen and (max-width: 992px) {
  .cart-item {
    flex-wrap: wrap;
    justify-content: center;

    &__title-image {
      flex: 0 0 100%;
      margin-bottom: 14px;
    }

    &__button-delete {
      margin-top: 20px;
    }
  }
}

@media screen and (max-width: 480px) {
  .cart-item {
    &__title-image {
      justify-content: center;
      flex-wrap: wrap;
    }

    &__title {
      flex: 0 0 100%;
      margin-top: 10px;
    }
  }
}
</style>
