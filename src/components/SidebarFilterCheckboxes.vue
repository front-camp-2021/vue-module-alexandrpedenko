<template>
  <div class="filter__item">
    <h5 class="filter__item-title">
      {{ filterCheckboxTitle }}
    </h5>
    <form ref="{checkboxFormRef}">
      <div
        v-for="filterCheckbox in filterCheckboxList"
        :key="filterCheckbox.value"
        class="filter__item-group"
      >
        <input
          :id="filterCheckbox.value"
          v-model="checkedItems"
          :value="filterCheckbox.value"
          type="checkbox"
          class="filter__item-checkbox"
          @change="updateCheckbox"
        >
        <label
          class="filter__item-label"
          :for="filterCheckbox.value"
        >
          {{ filterCheckbox.title }}
        </label>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onBeforeMount, watch } from 'vue'

export default {
  name: 'SidebarFilterCheckboxes',
  props: {
    filterCheckboxTitle: {
      type: String,
      default: ''
    },
    filterCheckboxList: {
      type: Array,
      default: () => {}
    },
    checkedItemsProps: {
      type: Array,
      default: () => {}
    }
  },
  
  emits: ['updateCheckboxes'],

  setup(props, { emit }) {
    const checkedItems = ref([])

    const updateCheckbox = () => {
      emit('updateCheckboxes', [ ...checkedItems.value ])
    }

    onBeforeMount(() => {
      checkedItems.value = [ ...props.checkedItemsProps ]
    })

    watch(() => [ ...props.checkedItemsProps ], (value) => {
      checkedItems.value = value
    })

    return {
      checkedItems,
      updateCheckbox
    }
  }
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.filter {
  &__item {
    width: 100%;
    max-width: 378px;
    padding-bottom: 38px;

    &:not(:last-child) {
      border-bottom: 1px solid #d6d6d6;
    }

    &:not(:first-child) {
      padding-top: 34px;
    }

    &-title {
      margin-bottom: 26px;
      @include text-format(normal, 600, 18px, 22px);
    }

    &-group {
      position: relative;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    &-label {
      position: relative;
      display: inline-block;
      padding-left: 34px;
      @include text-format(normal, 300, 16px, 32px);
      cursor: pointer;
      user-select: none;
    }

    &-checkbox:not(:checked),
    &-radio:not(:checked),
    &-checkbox:checked,
    &-radio:checked {
      position: absolute;
      pointer-events: none;
      margin-left: -20px;
      padding: 0;
      opacity: 0;
    }

    &-radio + &-label::before {
      content: '';
      position: absolute;
      top: 7px;
      left: 0;
      width: 18px;
      height: 16px;
      border: 1px solid #999999;
      border-radius: 50%;
      transition: 0.2s;
      z-index: 0;
    }

    &-checkbox + &-label::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 0;
      width: 20px;
      height: 18px;
      border: 1px solid #999999;
      border-radius: 3px;
      transition: 0.2s;
      z-index: 0;
    }

    &-radio:checked + &-label::before,
    &-checkbox:checked + &-label::before {
      background-color: $primary;
      border-color: transparent;
    }

    &-count {
      @include text-format(normal, 300, 14px, 32px);
    }
  }
}
</style>
