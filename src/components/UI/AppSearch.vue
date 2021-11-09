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
import debounce from '../../utils/debounce';

export default {
  name: 'AppSearch',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      internalValue: this.value,
      touched: false,
      // @ts-ignore
      // eslint-disable-next-line
      updateValueDebounced: (value) => {},
    };
  },

  watch: {
    modelValue(value) {
      if (!this.touched) this.internalValue = value;
    },
  },

  created() {
    this.updateValueDebounced = debounce(this.updateValue, 1500);
  },

  methods: {
    updateInternalValue(event) {
      this.touched = true;
      this.updateValueDebounced(event.target.value);
    },

    updateValue(value) {
      this.touched = false;
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    },
  },
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
