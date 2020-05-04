<template lang="html">
  <div>
    <AppSectionTitle>MESSAGE</AppSectionTitle>

    <TheContact />

    <AppPageSpacer />
  </div>
</template>

<script>
import TheContact from '@/components/TheContact'

export default {
  layout: 'layoutDecktop',
  components: {
    TheContact
  }
}
</script>
