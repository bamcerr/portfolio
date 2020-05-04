<template>
  <div class="">
    <keep-alive>
      <TheHello />
    </keep-alive>
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
