<template lang="html">
  <div>
    <AppSectionTitle>PROJECT</AppSectionTitle>

    <WorkFilter />

    <nuxt-child :key="$route.fullPath" />

    <AppPageSpacer />
  </div>
</template>

<script>
import WorkFilter from '@/components/WorkFilter'

export default {
  layout: 'layoutDecktop',
  components: {
    WorkFilter
  }
}
</script>
