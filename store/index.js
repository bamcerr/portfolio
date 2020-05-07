import MobileDetect from 'mobile-detect'
import checkIEVersion from '@/utils/checkIEVersion'
import typingMotionData from '@/assets/data/typingMotion.js'
import { workTags, workList } from '@/assets/data/works.js'

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
  nuxtClientInit({ dispatch, commit }, { redirect, route }) {
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

    dispatch('typing-motion/add', { name: 'intro', resource: typingMotionData })

    dispatch('work/fetchTags', workTags)
    dispatch('work/fetchList', workList)
  }
}
