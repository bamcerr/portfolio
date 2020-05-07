export const state = () => ({
  ALL: { key: '', name: 'all' },
  list: [],
  tags: [],
  keysOfActivatedTags: []
})

export const getters = {
  getfilteredList({ list, keysOfActivatedTags }) {
    if (keysOfActivatedTags[0] === '') return list

    return list.filter((item) => {
      if (!item.keysOfTags) {
        return false
      }
      return item.keysOfTags.find((key) => {
        return key === keysOfActivatedTags[0]
      })
    })
  }
}

export const mutations = {
  SET_KEYS_OF_ACTIVED_TAGS(
    { keysOfActivatedTags, ALL },
    { keyOfActivatedTag }
  ) {
    keysOfActivatedTags.splice(0)
    keysOfActivatedTags.push(keyOfActivatedTag || ALL.key)
  },

  SET_TAGS({ tags, ALL }, payload) {
    tags.splice(0)
    tags.push(ALL)
    tags.push(...payload)
  },

  SET_LIST({ list }, payload) {
    list.splice(0)
    list.push(...payload)
  }
}

export const actions = {
  fetchTags({ commit }, workTags) {
    const tags = Object.keys(workTags).map((tag) => {
      return { key: tag, name: workTags[tag].name }
    })

    commit('SET_TAGS', tags)
  },

  fetchList({ commit }, workList) {
    workList = workList.map((work) => {
      work.keysOfTags = work.tags
      delete work.tags
      return work
    })

    commit('SET_LIST', workList)
  }
}
