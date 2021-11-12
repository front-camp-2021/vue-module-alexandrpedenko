<template>
  <div class="wrapper">
    <TheHeader />
    <TheBreadcrumbs />

    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import TheHeader from '@/components/TheHeader.vue'
import TheBreadcrumbs from '@/components/TheBreadcrumbs.vue';
import { useCart } from '@/hooks/useCart.js'

export default {
  components: {
    TheHeader,
    TheBreadcrumbs
  },
  setup() {
    const { fetchByCartIdList } = useCart();
    
    onMounted(() => {
      fetchByCartIdList();
    })
  },
}
</script>

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
