<template>
  <form class="search__form">
    <input
      type="text"
      placeholder="Search"
      class="search__form-input"
      :value="internalValue"
      @input="updateInternalValue"
    >
  </form>
</template>

<script>
import { ref } from 'vue'
import debounce from '../../utils/debounce';

export default {
  name: 'AppSearch',

  emits: ['updateSearch'],

  setup(props, { emit }) {
    const internalValue = ref('');

    const updateValue = (value) => {
      internalValue.value = value
      emit('updateSearch', value)
    }

    const updateValueDebounced = debounce(updateValue, 500)

    const updateInternalValue = (event) => {
      updateValueDebounced(event.target.value)
    }

    return {
      internalValue,
      updateInternalValue
    }
  }
};
</script>

<style lang="scss" scope>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.search {
  &__form {
    position: relative;
    &::after {
      position: absolute;
      right: 16px;
      top: 50%;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      background: url('../../assets/icons/search.svg') no-repeat 50% 50%;
      background-size: cover;
      transform: translateY(-50%);
    }

    &-input {
      display: block;
      width: 100%;
      height: 62px;
      padding-left: 32px;
      padding-right: 58px;
      font-family: $main_font;
      @include text-format(normal, 300, 22px, 26px);
      border: none;
      background: #ffffff;
      box-shadow: $box_shadow;
      border-radius: $border_radius;
      outline: 0;
    }

    &-input::placeholder {
      font-family: $main_font;
      @include text-format(normal, 300, 22px, 26px);
      color: #999999;
    }
  }

  &__form-button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: block;
    padding: 0 25px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
