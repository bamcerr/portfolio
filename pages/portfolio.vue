<template lang="html">
  <div>
    <AppSectionTitle>PROJECT</AppSectionTitle>

    <ProductFilter />

    <nuxt-child :key="$route.fullPath" />

    <AppPageSpacer />
  </div>
</template>

<script>
import ProductFilter from '@/components/ProductFilter'

export default {
  components: {
    ProductFilter
  }
}
</script>
