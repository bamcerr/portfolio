import checkIEVersion from '@/utils/checkIEVersion'

export default async function(context) {
  const ieVersion = checkIEVersion()

  if (!context.store.state.checkedBrowser) {
    context.store.commit('onCheckBrowser', true)

    if (+ieVersion > -1 && +ieVersion < 12) {
      await context.app.router.push({ path: '/notSupported' })
    }
  }
}
