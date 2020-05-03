<template lang="html">
  <ul class="works">
    <WorkListItem
      v-for="(work, index) in works"
      :key="work.key"
      :class="{ _child_first: index === 0 }"
      v-bind="work"
      :order="index"
    />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkListItem from '@/components/WorkListItem'

export default {
  components: {
    WorkListItem
  },
  computed: {
    ...mapGetters({
      works: 'work/getfilteredList'
    })
  }
}
</script>

<style lang="postcss" scoped>
.works {
  max-width: 1200px;
  margin: auto;
}
</style>
