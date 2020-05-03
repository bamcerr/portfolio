<template lang="html">
  <div>
    <WorkList />
  </div>
</template>

<script>
import WorkList from '@/components/WorkList'

export default {
  transition: 'tab',
  components: {
    WorkList
  },
  fetch({ store, params }) {
    store.commit('work/SET_KEYS_OF_ACTIVED_TAGS', {
      keyOfActivatedTag: params.tag
    })
  }
}
</script>
