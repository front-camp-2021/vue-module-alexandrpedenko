<template>
  <div class="wrapper">
    <TheHeader />
    <TheBreadcrumbs />
    <router-view />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheBreadcrumbs from "@/components/TheBreadcrumbs.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheBreadcrumbs,
  },
  mounted() {
    this.$store.dispatch("favorites/getFavoritesIdListFromStorage");
    this.$store.dispatch("cart/fetchByCartIdList");
  },
};
</script>

<style lang="scss">
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
