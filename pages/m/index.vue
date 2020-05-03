<template>
  <div>
    <TheHello />
    <WorkList />
    <AppSectionTitle>contact</AppSectionTitle>
    <TheContact />
  </div>
</template>
<script>
import TheHello from '@/components/TheHello'
import WorkList from '@/components/mobile/WorkList'
import TheContact from '@/components/mobile/TheContact'
import AppSectionTitle from '@/components/mobile/AppSectionTitle'

export default {
  layout: 'layoutMobile',
  components: {
    TheHello,
    WorkList,
    AppSectionTitle,
    TheContact
  },
  fetch({ store }) {
    store.commit('work/SET_KEYS_OF_ACTIVED_TAGS', { keyOfActivatedTag: '' })
  }
}
</script>

<style>
/* Large devices (desktops, less than 1200px) */
@media (max-width: 1199.98px) {
  html {
    font-size: 14px;
  }
}

/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {
  html {
    font-size: 11px;
  }
}

/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {
  html {
    font-size: 8px;
  }
}

@media (max-width: 469.98px) {
  html {
    font-size: 5px;
  }
}
</style>
