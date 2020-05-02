import crypto from 'crypto'
import Vue from 'vue'
import passParameterType from '@/utils/passParameterType'

function getIndex(array, { key, name }) {
  const payload = arguments[1]
  const l = key ? '_key' : name ? 'name' : null
  const r = key ? 'key' : name ? 'name' : null

  return array.findIndex((motion) => motion[l] === payload[r])
}

export const state = () => ({
  items: [
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
  getItemByName({ items }, getters) {
    return (name) => {
      return items.find((motion) => motion.name === name)
    }
  }
}

export const mutations = {
  activate({ items }, { key, name }) {
    const i = getIndex(items, { key, name })
    items[i]._activated = true
  },

  deactivate({ items }, { key, name }) {
    const i = getIndex(items, { key, name })
    items[i]._activated = false
  },

  setStatusReady({ items }, { key, name }) {
    const i = getIndex(items, { key, name })
    items[i].status = 'ready'
  },

  setStatusDone({ items }, { key, name }) {
    const i = getIndex(items, { key, name })
    items[i].status = 'done'
  },

  setShot({ items }, { key, name, shot }) {
    const i = getIndex(items, { key, name })
    items[i].shot = shot
  },

  setResource({ items }, { key, name, resource }) {
    const i = getIndex(items, { key, name })
    items[i].resource = passParameterType('array')(resource) || []
  },

  setName({ items }, { key, name }) {
    const i = getIndex(items, { key, name })
    items[i].name = passParameterType('string')(name) || ''
  },

  addItem({ items }, { key, name, resource }) {
    items.push({ _key: key })
    const i = getIndex(items, { key, name })

    Vue.set(items[i], 'name', name)
    Vue.set(items[i], 'resource', resource)
    Vue.set(items[i], 'shot', '')
    Vue.set(items[i], 'status', 'ready')
    Vue.set(items[i], '_activated', true)
  }
}

export const actions = {
  run({ state, commit, getters }, name) {
    const motion = getters.getItemByName(name)
    if (!motion._activated) return

    let count = 0
    let prev = null

    const step = (timestamp) => {
      if (!prev) prev = timestamp
      const diff = timestamp - prev

      if (diff === 0 || diff >= 30) {
        commit('setShot', { name, shot: motion.resource[count] })

        prev = timestamp

        if (count === motion.resource.length - 1) {
          setTimeout(() => {
            commit('setStatusDone', { name })
          }, 100)

          return
        }

        count++
      }

      requestAnimationFrame(step)
    }

    commit('setShot', { name, shot: '' })
    requestAnimationFrame(step)
    commit('deactivate', { name })
  },

  add({ commit, state }, { name, resource }) {
    const key = crypto.randomBytes(20).toString('hex')

    commit('addItem', { key, name, resource })
  }
}
