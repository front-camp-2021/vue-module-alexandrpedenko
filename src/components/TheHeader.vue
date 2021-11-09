<template>
  <header class="header">
    <router-link to="/">
      <div class="header__logo">
        <img
          :src="logo"
          class="header__logo-img"
          alt="Store Logo"
        >
        <div class="header__logo-text">
          Online Store
        </div>
      </div>
    </router-link>
  </header>
</template>

<script>
import logo from '../assets/logo.svg';

export default {
  name: 'TheHeader',
  setup() {
    return {
      logo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.header {
  padding: 30px 0;

  &__logo {
    display: inline-flex;
    align-items: center;

    &-img {
      margin-right: 22px;
    }

    &-text {
      color: $primary_text;
      @include text-format(normal, 600, 48px, 27px);
    }
  }
}
</style>
