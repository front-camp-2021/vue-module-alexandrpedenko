import { ref, onMounted, computed } from "vue";
import CartService from '../services/CartService'

const cartService = new CartService();

const isCartLoading = ref(false);
const cartError = ref('');
const cartIdList = ref([]);
const cartProducts = ref([]);

export function useCart() {
  const addToCart = async (id) => {
    cartService.setCartToLocalStorage(id);
    const { data } = await cartService.getSingleCartProduct(id);
    const cartProduct = data[0];

    cartIdList.value.push(id);
    cartProducts.value = [...cartProducts.value, {...cartProduct, count: 1}]
  };

  const removeFromCart = (id) => {
    cartService.removeCartItemFromLocalStorage(id);

    cartIdList.value = cartIdList.value.filter(
      (idItem) => idItem !== id,
    );
    cartProducts.value = cartProducts.value.filter((product) => product.id !== id);
  };

  const getCartIdList= () => {
    cartIdList.value = cartService.getCartFromStorage();
  }

  const incrementCartProduct = (productId) => {
    cartProducts.value = cartProducts.value.map((cartItem) => {
      if (cartItem.id === productId) {
        return { ...cartItem, count: cartItem.count + 1 };
      }
      return cartItem;
    });
  }

  const decrementCartProduct = (productId) => {
    cartProducts.value = cartProducts.value.map((cartItem) => {
      if (cartItem.id === productId) {
        return { ...cartItem, count: cartItem.count - 1 };
      }
      return cartItem;
    });
  }

  const fetchByCartIdList = async () => {
    try {
      isCartLoading.value = true;

      const cartIdList = cartService.getCartFromStorage();
      cartIdList.value = cartIdList;

      const { data } = await cartService.getCartProducts(cartIdList);
      cartProducts.value = data.map((cartItem) => ({ ...cartItem, count: 1 }));
    } catch (error) {
      cartError.value = error.message;
    } finally {
      isCartLoading.value = false;
    }
  }

  const addToCartOrIncrement = (productId) => {
    if (cartIdList.value.includes(productId)) {
      incrementCartProduct(productId);
    } else {
      addToCart(productId);
    }
  }

  const cartCount = computed(() => {
    return cartIdList.value.length > 0 ? cartIdList.value.length : null;
  })

  onMounted(
    getCartIdList
  );

  return {
    isCartLoading,
    cartProducts,
    cartIdList,
    cartError,
    cartCount,

    addToCart,
    getCartIdList,
    removeFromCart,
    fetchByCartIdList,
    incrementCartProduct,
    decrementCartProduct,
    addToCartOrIncrement,
  }

}