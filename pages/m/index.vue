<template>
  <div>
    <template v-if="!isMobile">
      <TheNavToDesktop />
    </template>

    <TheHello />
    <WorkList />
    <AppSectionTitle>contact</AppSectionTitle>
    <TheContact />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHello from '@/components/TheHello'
import WorkList from '@/components/mobile/WorkList'
import TheContact from '@/components/mobile/TheContact'
import AppSectionTitle from '@/components/mobile/AppSectionTitle'
import TheNavToDesktop from '@/components/TheNavToDesktop'

export default {
  components: {
    TheHello,
    WorkList,
    AppSectionTitle,
    TheContact,
    TheNavToDesktop
  },

  layout: 'layoutMobile',

  fetch({ store }) {
    store.commit('work/SET_KEYS_OF_ACTIVED_TAGS', { keyOfActivatedTag: '' })
  },

  computed: {
    ...mapState({
      isMobile: (state) => !!state.mobileDevice
    })
  },

  head() {
    return {
      link: [{ rel: 'stylesheet', href: '/mobile.css' }]
    }
  }
}
</script>
