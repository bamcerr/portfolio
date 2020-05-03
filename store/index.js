import MobileDetect from 'mobile-detect'
import checkIEVersion from '@/utils/checkIEVersion'

export const state = () => ({
  pageSpacerName: null,
  mobileDevice: null
})

export const mutations = {
  SET_PAGE_SPACER_NAME(state, { name }) {
    state.pageSpacerName = name
  },

  SET_MOBILE_DEVICE(state, { os, userAgent }) {
    state.mobileDevice = { os, userAgent }
  }
}

export const actions = {
  async nuxtClientInit({ dispatch, commit }, { redirect, route }) {
    const ieVersion = checkIEVersion()
    if (+ieVersion > -1 && +ieVersion < 12) {
      redirect(200, '/notSupported')
      setTimeout(() => {
        redirect(200, '/notSupported')
      }, 0)

      return
    }

    const md = new MobileDetect(window.navigator.userAgent)
    if (md.mobile()) {
      commit('SET_MOBILE_DEVICE', {
        os: md.os(),
        userAgent: md.userAgent()
      })

      redirect(200, '/m/')
      setTimeout(() => {
        redirect(200, '/m/')
      })
    }

    await dispatch('work/fetchTags')
    await dispatch('work/fetchList')
  }
}
