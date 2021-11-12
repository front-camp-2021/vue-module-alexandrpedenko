<template>
  <div class="filter__item">
    <h5 class="filter__item-title">
      {{ title }}
    </h5>
    <div class="filter__item-body">
      <form class="range-container">
        <input
          v-model="refMinVal"
          type="range"
          class="thumb thumb--left"
          :style="leftRangeIndex"
          :min="min"
          :max="max"
          :step="step"
          @input="onMinValChangeHandler"
          @change="onChangeRangeValueHandler"
        >
        <input
          v-model="refMaxVal"
          type="range"
          class="thumb thumb--right"
          :min="min"
          :max="max"
          :step="step"
          @input="onMaxValChangeHandler"
          @change="onChangeRangeValueHandler"
        >
        <div class="slider">
          <div class="slider__track" />
          <div
            ref="rangeRef"
            class="slider__range"
          />
          <div
            class="slider__left-value"
            data-testid="sliderMinValue"
          >
            {{ refMinVal }}
          </div>
          <div
            class="slider__right-value"
            data-testid="sliderMaxValue"
          >
            {{ refMaxVal }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue';

export default {
  name: 'SidebarFilterRange',
  props: {
    title: {
      type: String,
      default: '',
    },
    step: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    rangeValue: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['updateRangeSlider'],
  setup(props, { emit }) {
    const refMinVal = ref(0);
    const refMaxVal = ref(0);
    const rangeRef = ref(null);

    const leftRangeIndex = computed(() => ({'z-index': refMinVal > props.max - 100 ? '5' : undefined}));

    const getPercent = (value) => {
      return Math.round(((value - props.min) / (props.max - props.min)) * 100);
    }

    const onMinValChangeHandler = (event) => {
      const value = parseFloat(Math.min(Number(event.target.value), refMaxVal.value - props.step).toFixed(1));
      refMinVal.value = value;
    }

    const onMaxValChangeHandler = (event) => {
      const value = parseFloat(Math.max(Number(event.target.value), refMinVal.value + props.step).toFixed(1));
      refMaxVal.value = value;
    }

    const onChangeRangeValueHandler = () =>  {
      emit('updateRangeSlider', { minValue: refMinVal.value, maxValue: refMaxVal.value });
    }

    const setRangeWidth = () => {
      const minPercent = getPercent(refMinVal.value);
      const maxPercent = getPercent(refMaxVal.value);

      rangeRef.value.style.left = `${minPercent}%`;
      rangeRef.value.style.width = `${maxPercent - minPercent}%`;
    }

    watch(refMinVal, (value) => {
      const minPercent = getPercent(value);
      const maxPercent = getPercent(refMaxVal.value);

      rangeRef.value.style.left = `${minPercent}%`;
      rangeRef.value.style.width = `${maxPercent - minPercent}%`;
    })

    watch(refMaxVal, (value) => {
      const minPercent = getPercent(refMinVal.value);
      const maxPercent = getPercent(value);
      rangeRef.value.style.width = `${maxPercent - minPercent}%`;
    })

    watch(() => props.rangeValue, (value) => {
      refMinVal.value = value.minValue;
      refMaxVal.value = value.maxValue;
    })

    onMounted(() => {
      refMinVal.value = props.rangeValue.minValue;
      refMaxVal.value = props.rangeValue.maxValue;

      setRangeWidth();
    })

    return {
      rangeRef,
      refMinVal,
      refMaxVal,
      leftRangeIndex,
      onMinValChangeHandler,
      onMaxValChangeHandler,
      onChangeRangeValueHandler
    }
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.filter {
  &__item {
    width: 100%;
    max-width: 378px;
    padding-bottom: 68px;
    overflow: hidden;

    &-body {
      padding: 0 5px;
    }

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
  }
}

.range-container {
  position: relative;
  margin-bottom: 40px;
}

.slider {
  position: relative;
}

.slider__track,
.slider__range,
.slider__left-value,
.slider__right-value {
  position: absolute;
}

.slider__track,
.slider__range {
  border-radius: 3px;
  height: 5px;
  margin-top: -2px;
}

.slider__track {
  background-color: #ced4da;
  width: 100%;
  z-index: 1;
}

.slider__range {
  background-color: $primary_text;
  z-index: 2;
}

.slider__left-value,
.slider__right-value {
  color: #b3b4b5;
  font-size: 14px;
  margin-top: 20px;
}

.slider__left-value {
  left: 6px;
}

.slider__right-value {
  right: 6px;
}

/* Removing the default appearance */
.thumb,
.thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.thumb {
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;
}

.thumb--left {
  z-index: 3;
}

.thumb--right {
  z-index: 4;
}

/* For Chrome browsers */
.thumb::-webkit-slider-thumb {
  background-color: #f1f5f7;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 1px 1px #ced4da;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin-top: 0px;
  pointer-events: all;
  position: relative;
}

/* For Firefox browsers */
.thumb::-moz-range-thumb {
  background-color: #f1f5f7;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 1px 1px #ced4da;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin-top: 10px;
  pointer-events: all;
  position: relative;
}
</style>
