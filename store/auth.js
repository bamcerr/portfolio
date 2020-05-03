export const state = () => ({
  authUser: null
})

export const mutations = {
  RESET_AUTH_USER: (state) => {
    state.authUser = null
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  }
}

export const actions = {
  createUserWithEmailAndPassword(context, { email, password }) {
    return this.$fireAuth.createUserWithEmailAndPassword(email, password)
  },

  signInWithEmailAndPassword(context, { email, password }) {
    return this.$fireAuth.signInWithEmailAndPassword(email, password)
  },

  signInAnonymously() {
    return this.$fireAuth.signInAnonymously()
  },

  signOut() {
    return this.$fireAuth.signOut()
  },

  delete() {
    return this.$fireAuth.currentUser.delete()
  },

  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_AUTH_USER')
      return
    }
    commit('SET_AUTH_USER', { authUser })
  }
}
