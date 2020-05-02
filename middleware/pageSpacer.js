export default function({ store, route }) {
  /* eslint-disable*/
  let name = route.name.split('-')[0]
  if (name === 'index') name = 'hello'
  store.commit('setPageSpacerName', { name })
}
