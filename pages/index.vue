<template>
  <div class="">
    <TheHello />

    <AppPageSpacer />
  </div>
</template>

<script>
import TheHello from '@/components/TheHello'

export default {
  layout: 'layoutDecktop',
  name: 'Index',
  components: {
    TheHello
  }
}
</script>
