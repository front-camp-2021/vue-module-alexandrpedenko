<template>
  <div class="not-found-page">
    <AppNotFound :text="'Oops page not found!'" />
    <p class="not-found-page__description">
      Go to 
      <router-link to="/">
        Home page
      </router-link> and try again
    </p>
  </div>
</template>

<script>
import AppNotFound from '@/components/UI/AppNotFound.vue';

export default {
  name: 'NotFoundPage',
  components: { AppNotFound },
};
</script>

<style lang="scss" scoped>
.not-found-page {
  padding-top: 100px;

  &__description {
    text-align: center;
    font-size: 18px;
  }
}
</style>
