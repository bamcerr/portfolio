import crypto from 'crypto'
import Vue from 'vue'
import passParameterType from '@/utils/passParameterType'

function getItemIndexByKeyOrName(array, payload) {
  const { key, name } = payload
  const l = key ? '_key' : name ? 'name' : null
  const r = key ? 'key' : name ? 'name' : null

  return array.findIndex((motion) => motion[l] === payload[r])
}

const FIELDS = [
  { name: 'name', type: 'string' },
  { name: 'resource', type: 'array' },
  { name: 'shot', type: 'string' }
]

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
    if (!Object.prototype.hasOwnProperty.call(list[i], '_activated')) {
      Vue.set(list[i], '_activated', true)
    } else {
      list[i]._activated = true
    }
  },

  DEACTIVATE_MOTION({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    if (!Object.prototype.hasOwnProperty.call(list[i], '_activated')) {
      Vue.set(list[i], '_activated', false)
    } else {
      list[i]._activated = false
    }
  },

  SET_MOTION_STATUS_READY({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    if (!Object.prototype.hasOwnProperty.call(list[i], 'status')) {
      Vue.set(list[i], 'status', 'ready')
    } else {
      list[i].status = 'ready'
    }
  },

  SET_MOTION_STATUS_DOING({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    if (!Object.prototype.hasOwnProperty.call(list[i], 'status')) {
      Vue.set(list[i], 'status', 'doing')
    } else {
      list[i].status = 'doing'
    }
  },

  SET_MOTION_STATUS_DONE({ list }, { key, name }) {
    const i = getItemIndexByKeyOrName(list, { key, name })
    if (!Object.prototype.hasOwnProperty.call(list[i], 'status')) {
      Vue.set(list[i], 'status', 'done')
    } else {
      list[i].status = 'done'
    }
  },

  SET_MOTION_FIELD({ list }, { key, name, fields }) {
    const i = getItemIndexByKeyOrName(list, { key, name })

    for (const [key, value] of Object.entries(fields)) {
      const f = FIELDS.find((field) => field.name === key)
      if (f !== -1) {
        const passedValue = passParameterType(f.type)(value)
        if (!Object.prototype.hasOwnProperty.call(list[i], key)) {
          Vue.set(list[i], key, passedValue)
        } else {
          list[i][key] = passedValue
        }
      }
    }
  },

  ADD_MOTION({ list }, { key }) {
    list.push({ _key: key })
  },

  REMOVE_MOTION({ list }, { key }) {
    const i = getItemIndexByKeyOrName(list, { key })
    list.splice(i, 1)
  }
}

export const actions = {
  deactivate({ commit }, name) {
    commit('DEACTIVATE_MOTION', { name })
  },

  run({ commit, getters }, name) {
    const motion = getters.getMotionByName(name)
    if (!motion._activated) return

    let count = 0
    let prev = null

    const step = (timestamp) => {
      if (!prev) prev = timestamp
      const diff = timestamp - prev

      if (diff === 0 || diff >= 30) {
        commit('SET_MOTION_FIELD', {
          name,
          fields: { shot: motion.resource[count] }
        })

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

    commit('SET_MOTION_FIELD', {
      name,
      fields: { shot: '' }
    })
    commit('SET_MOTION_STATUS_DOING', { name })
    requestAnimationFrame(step)
  },

  add({ commit }, { name, resource, shot }) {
    const key = crypto.randomBytes(20).toString('hex')
    try {
      commit('ADD_MOTION', { key })
      commit('SET_MOTION_FIELD', {
        key,
        fields: { name, resource, shot: shot || '' }
      })
      commit('SET_MOTION_STATUS_READY', { key })
      commit('ACTIVATE_MOTION', { key })
    } catch (error) {
      // eslint-disable-next-line
      console.error(error)
      commit('REMOVE_MOTION', { key })
    }
  }
}
