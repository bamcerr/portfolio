import checkIEVersion from '@/utils/checkIEVersion'

export const state = () => ({
  pageSpacerName: null,
  checkedBrowser: false
})

export const getters = {}

export const mutations = {
  setPageSpacerName(state, { name }) {
    state.pageSpacerName = name
  },

  onCheckBrowser(state, payload) {
    state.checkedBrowser = payload
  }
}

export const actions = {
  async nuxtClientInit({ dispatch, commit }, context) {
    const ieVersion = checkIEVersion()
    if (+ieVersion > -1 && +ieVersion < 12) {
      return
    }
    await dispatch('work/fetchTags')
    await dispatch('work/fetchItems')
  }
}
