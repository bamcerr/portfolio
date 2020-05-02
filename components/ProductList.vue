<template lang="html">
  <ul class="products">
    <li
      v-for="(product, index) in products"
      :key="product.key"
      class="products__item"
      :class="{ _child_first: index === 0 }"
    >
      <ProductListItem v-bind="product" :order="index" />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductListItem from '@/components/ProductListItem'

export default {
  components: {
    ProductListItem
  },
  computed: {
    ...mapGetters('work', {
      products: 'getItemsfiltered'
    })
  }
}
</script>

<style lang="postcss" scoped>
.products {
  max-width: 1200px;
  margin: auto;
}

.products__item {
  margin: 450px auto;
  overflow: hidden;

  &._child_first {
    margin-top: 150px;
  }
}
</style>
