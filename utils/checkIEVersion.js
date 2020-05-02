export default function checkIeVersion() {
  let word

  const agent = navigator.userAgent.toLowerCase()

  // IE old version ( IE 10 or Lower )
  if (navigator.appName === 'Microsoft Internet Explorer') word = 'msie '
  // IE 11
  else if (agent.search('trident') > -1) word = 'trident/.*rv:'
  // Microsoft Edge
  else if (agent.search('edge/') > -1) word = 'edge/'
  // 그외, IE가 아니라면 ( If it's not IE or Edge )
  else return -1

  const reg = new RegExp(word + '([0-9]{1,})(\\.{0,}[0-9]{0,1})')

  if (reg.exec(agent) != null) return parseFloat(RegExp.$1 + RegExp.$2)

  return -1
}
