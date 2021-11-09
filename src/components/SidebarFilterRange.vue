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
export default {
  props: {
    title: {
      type: String,
      default: ''
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
    minVal: {
      type: Number,
      default: 0,
    },
    maxVal: {
      type: Number,
      default: 100,
    },
  },

  data() {
    return {
      refMinVal: this.$props.minVal,
      refMaxVal: this.$props.maxVal,
    };
  },

  computed: {
    leftRangeIndex() {
      return {
        'z-index': this.refMinVal > this.max - 100 ? '5' : undefined,
      };
    },
  },

  watch: {
    minVal(newValue) {
      this.refMinVal = newValue;
    },

    maxVal(newValue) {
      this.refMaxVal = newValue;
    },

    refMinVal(value) {
      const minPercent = this.getPercent(value);
      const maxPercent = this.getPercent(this.refMaxVal);

      this.$refs.rangeRef.style.left = `${minPercent}%`;
      this.$refs.rangeRef.style.width = `${maxPercent - minPercent}%`;
    },

    refMaxVal(value) {
      const minPercent = this.getPercent(this.refMinVal);
      const maxPercent = this.getPercent(value);

      this.$refs.rangeRef.style.width = `${maxPercent - minPercent}%`;
    },
  },

  mounted() {
    this.setRangeWidth();
  },

  methods: {
    getPercent(value) {
      return Math.round(((value - this.min) / (this.max - this.min)) * 100);
    },

    setRangeWidth() {
      const minPercent = this.getPercent(this.refMinVal);
      const maxPercent = this.getPercent(this.refMaxVal);

      this.$refs.rangeRef.style.left = `${minPercent}%`;
      this.$refs.rangeRef.style.width = `${maxPercent - minPercent}%`;
    },

    onMinValChangeHandler(event) {
      const value = Math.min(Number(event.target.value), this.refMaxVal - this.step);
      this.refMinVal = value;
    },

    onMaxValChangeHandler(event) {
      const value = Math.max(Number(event.target.value), this.refMinVal + this.step);
      this.refMaxVal = value;
    },

    onChangeRangeValueHandler() {
      this.$emit('update:modelValue', { minValue: this.refMinVal, maxValue: this.refMaxVal });
    },
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
