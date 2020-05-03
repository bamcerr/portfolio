import crypto from 'crypto'
import Vue from 'vue'
import passParameterType from '@/utils/passParameterType'

function getItemIndexByKeyOrName(array, payload) {
  const { key, name } = payload
  const l = key ? '_key' : name ? 'name' : null
  const r = key ? 'key' : name ? 'name' : null

  return array.findIndex((motion) => motion[l] === payload[r])
}

export const state = () => ({
  list: [
    // {
    //   _key: crypto.randomBytes(20).toString('hex'),
    //   _activated: true,
    //   status: 'ready',
    //   name: 'intro',
    //   resource: typingMotionData,
    //   shot: ''
    // }
  ]
})

export const getters = {
  getMotionByName({ list }) {
    return (name) => {
      return list[getItemIndexByKeyOrName(list, { name })]
    }
  }
}

export const mutations = {
  ACTIVATE_MOTION({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    list[i]._activated = true
  },

  DEACTIVATE_MOTION({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    list[i]._activated = false
  },

  SET_MOTION_STATUS_READY({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    list[i].status = 'ready'
  },

  SET_MOTION_STATUS_DONE({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    list[i].status = 'done'
  },

  SET_MOTION_SHOT({ list }, { key, name, shot }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    list[i].shot = shot
  },

  SET_MOTION_RESOURCE({ list }, { key, name, resource }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    list[i].resource = passParameterType('array')(resource) || []
  },

  SET_MOTION_NAME({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })

    if (Object.prototype.hasdOwnProperty.call(list[i], 'name')) {
      list[i].name = passParameterType('string')(name) || ''
    } else {
      throw new Error('add Motion first')
    }
  },

  ADD_MOTION({ list }, { name, resource }) {
    const key = crypto.randomBytes(20).toString('hex')
    list.push({ _key: key })
    const i = getItemIndexByKeyOrName(list, { key, name })

    Vue.set(list[i], 'name', name)
    Vue.set(list[i], 'resource', resource)
    Vue.set(list[i], 'shot', '')
    Vue.set(list[i], 'status', 'ready')
    Vue.set(list[i], '_activated', true)
  }
}

export const actions = {
  deactivate({ commit }, name) {
    commit('DEACTIVATE_MOTION', { name })
  },

  run({ state, commit, getters }, name) {
    const motion = getters.getMotionByName(name)
    if (!motion._activated) return

    let count = 0
    let prev = null

    const step = (timestamp) => {
      if (!prev) prev = timestamp
      const diff = timestamp - prev

      if (diff === 0 || diff >= 30) {
        commit('SET_MOTION_SHOT', { name, shot: motion.resource[count] })

        prev = timestamp

        if (count === motion.resource.length - 1) {
          setTimeout(() => {
            commit('SET_MOTION_STATUS_DONE', { name })
          }, 100)

          return
        }

        count++
      }

      requestAnimationFrame(step)
    }

    commit('SET_MOTION_SHOT', { name, shot: '' })
    requestAnimationFrame(step)
  },

  add({ commit }) {
    commit('ADD_MOTION')
  }
}
