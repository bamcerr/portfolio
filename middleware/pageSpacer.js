export default function({ store, route }) {
  let name = route.name.split('-')[0]
  if (name === 'index') name = 'hello'
  store.commit('SET_PAGE_SPACER_NAME', { name })
}
