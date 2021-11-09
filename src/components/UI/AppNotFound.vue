<template>
  <div class="not-found">
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.not-found {
  padding: 20px 15px;
  font-size: 20px;
  text-align: center;
  color: $primary_text;
}
</style>
