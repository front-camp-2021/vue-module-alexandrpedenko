<template>
  <div class="wrapper">
    <h1>Start vue</h1>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px 40px 30px;
}

@media screen and (max-width: 480px) {
  .wrapper {
    padding: 0 15px;
  }
}
</style>
