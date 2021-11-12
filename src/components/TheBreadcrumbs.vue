<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link
        to="/"
        class="breadcrumbs__home"
      />
    </li>
    <li class="breadcrumbs__item">
      <router-link
        to="/favorites"
        class="breadcrumbs__link"
      >
        Favorites
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <router-link
        to="/cart"
        class="breadcrumbs__link"
      >
        Cart
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <span class="breadcrumbs__current">Electronics</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TheBreadcrumbs',
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.breadcrumbs {
  display: flex;
  align-items: center;
  list-style: none;

  &__item {
    position: relative;
    padding-right: 26px;
    @include text-format(normal, 400, 14px, 17px);

    &:not(:first-child) {
      padding-left: 14px;
    }

    &:not(:last-child):after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      display: block;
      width: 14px;
      height: 8px;
      background: url('../assets/icons/chevrons-right.svg') no-repeat 50% 50%;
      background-size: cover;
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &__home {
    display: block;
    width: 16px;
    height: 16px;
    background: url('../assets/icons/home.svg') no-repeat 50% 50%;
    background-size: cover;
  }
}
</style>
