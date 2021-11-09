<template>
  <button
    class="button"
    :class="classObject"
  >
    <img
      v-if="isIcon"
      :src="iconElement"
      alt=""
    >
    <span v-if="isText">
      {{ text }}
    </span>
  </button>
</template>

<script>
import { computed } from 'vue';
import Heart from '@/assets/icons/heart.svg';
import HeartWhite from '@/assets/icons/heart-white.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import ShoppingBag from '@/assets/icons/shopping-bag.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ChevronsRight from '@/assets/icons/chevrons-right.svg';

const icons = {
  Heart,
  HeartWhite,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
};

export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const classObject = computed(() => ({
      button_medium: props.size === 'medium',
      button_icon: props.size === 'icon',
      button_primary: props.color === 'primary',
      button_white: props.color === 'white',
      button_secondary: props.color === 'secondary',
    }));

    const iconElement = computed(() => (props.icon ? icons[props.icon] : null));
    const isIcon = computed(() => !!props.icon);
    const isText = computed(() => !!props.text);

    return {
      isIcon,
      isText,
      classObject,
      iconElement,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.button {
  &-wrapper {
    position: relative;
  }

  &-counts {
    position: absolute;
    top: -6px;
    right: -6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
    width: 22px;
    height: 22px;
    color: #ffffff;
    background-color: rgb(224, 75, 75);
    border-radius: 50%;
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-family: $main_font;
  border: none;
  cursor: pointer;

  &_medium {
    height: 45px;
    padding: 0 8px;
    @include text-format(normal, 600, 14px, 18px);

    img {
      margin-right: 10px;
    }
  }

  &_icon {
    width: 46px;
    height: 40px;
    box-shadow: $box_shadow;
    border-radius: $border_radius;
  }

  &_primary {
    color: #ffffff;
    background-color: $primary;
    transition: background 0.2s ease;

    &:hover {
      background-color: $primary_text;
    }
  }

  &_white {
    color: $text_color;
    background-color: #ffffff;
    transition: background 0.2s ease;

    &:hover {
      background-color: darken($secondary, 10%);
    }
  }

  &_secondary {
    color: $text_color;
    background-color: $secondary;
    transition: background 0.2s ease;

    &:hover {
      background-color: darken($secondary, 10%);
    }
  }
}
</style>
