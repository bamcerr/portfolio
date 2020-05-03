export const state = () => ({
  ALL: { key: '', name: 'all' },
  list: [],
  tags: [],
  keysOfActivatedTags: [] // keys of activated tags
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
  async fetchTags({ commit }) {
    await this.$fireStore
      .collection('tags')
      .get()
      .then(function(querySnapshot) {
        const tags = []
        querySnapshot.forEach(function(doc) {
          tags.push({ key: doc.id, ...doc.data() })
        })

        return tags
      })
      .then((tags) => {
        commit('SET_TAGS', tags)
      })
  },

  async fetchList({ commit }) {
    const resData = await this.$fireStore
      .collection('works')
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          data.key = doc.id
          if (data.tags) {
            data.keysOfTags = data.tags.map((tag) => tag.id)
          }
          delete data.tags
          items.push(data)
        })
        return items
      })
    commit('SET_LIST', resData)
    return resData
    // const categoryDocRef = firebase
    //   .firestore()
    //   .collection('categories')
    //   .doc('5gF5FqRPvdroRF8isOwd')
    // db.collection("rooms").where('floor','==',docRef)
    // db.collection('products').get()
    // .then(res => {
    //   vm.mainListItems = [];
    //   res.forEach(doc => {
    //     let newItem = doc.data();
    //     newItem.id = doc.id;
    //     if (newItem.userRef) {
    //       newItem.userRef.get()
    //       .then(res => {
    //         newItem.userData = res.data()
    //         vm.mainListItems.push(newItem);
    //       })
    //       .catch(err => console.error(err));
    //     } else {
    //       vm.mainListItems.push(newItem);
    //     }
    //
    //   });
    // })
    // .catch(err => { console.error(err) });
  }
}
