<template>
  <div class="pagination">
    <div class="pagination__items">
      <span
        v-for="page in paginationPages"
        :key="page"
        class="pagination__item-link"
        :class="{ 'pagination__item-current': page == currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </span>
    </div>
  </div>
</template>

<script>
import range from '../utils/range';

export default {
  name: 'ThePagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      paginationPages: [],
    };
  },

  watch: {
    totalPages() {
      this.paginationPages = this.countPaginationPages();
    },
  },
  beforeMount() {
    this.paginationPages = this.countPaginationPages();
  },

  methods: {
    goToPage(page) {
      this.$router.push({
        path: 'products',
        query: { ...this.$route.query, page },
      });

      window.scrollTo(0, 0);
    },

    countPaginationPages() {
      const pageLimit = parseInt(process.env.VUE_APP_PAGE_LIMIT, 10);
      const paginationTotal = Math.ceil(this.$props.totalPages / pageLimit);
      return range(1, paginationTotal);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/vars.scss';
@import './src/assets/styles/mixins.scss';

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;

  &__items {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: $secondary;
    border-radius: 20px;
    overflow: hidden;
  }

  &__item-link,
  &__item-current {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    @include text-format(normal, normal, 18px, 21px);
    border-radius: 100%;
    cursor: pointer;
  }

  &__item-link {
    width: 40px;
    height: 40px;
    color: $text_color;
    background-color: $secondary;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #dddddd;
    }
  }

  &__item-current {
    color: $white;
    background-color: $primary;

    &:hover {
      color: $white;
      background-color: $primary;
    }
  }

  &__previous {
    margin-right: 18px;
  }

  &__next {
    margin-left: 18px;
  }
}
</style>
