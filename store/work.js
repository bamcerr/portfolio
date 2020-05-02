// export const strict = false

export const state = () => ({
  ALL: { key: '', name: 'all' },
  items: [],
  tags: [],
  activeTagsAtKey: []
})

export const getters = {
  getItemsfiltered({ items, activeTagsAtKey }) {
    if (activeTagsAtKey[0] === '') return items

    return items.filter((item) => {
      if (!item.tagsAtKey) {
        return false
      }
      return item.tagsAtKey.find((tagAtKey) => {
        return tagAtKey === activeTagsAtKey[0]
      })
    })
  },

  getItems({ activeTagsAtKey, items, ALL }, { getItemsfiltered, getItemsAll }) {
    const isAll = activeTagsAtKey.includes(ALL.key)
    return isAll ? items : getItemsfiltered
  }
}

export const mutations = {
  setActiveTags({ activeTagsAtKey, ALL }, { tagAtKey }) {
    activeTagsAtKey.splice(0)
    activeTagsAtKey.push(tagAtKey || ALL.key)
  },

  patchTags({ tags, ALL }, payload) {
    tags.splice(0)
    tags.push(ALL)
    tags.push(...payload)
  },

  patchItems({ items }, payload) {
    items.splice(0)
    items.push(...payload)
  }
}

export const actions = {
  fetchTags({ commit }) {
    this.$fireStore
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
        commit('patchTags', tags)
      })
  },

  async fetchItems({ commit }) {
    const resData = await this.$fireStore
      .collection('works')
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          data.key = doc.id
          if (data.tags) {
            data.tagsAtKey = data.tags.map((tag) => tag.id)
          }
          delete data.tags
          items.push(data)
        })
        return items
      })
    commit('patchItems', resData)
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
