<template lang="html">
  <div>
    <ProductList></ProductList>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  transition: 'tab',
  components: {
    ProductList
  },
  asyncData({ store, params }) {
    store.commit('work/setActiveTags', { tagAtKey: params.tag })
  }
}
</script>
