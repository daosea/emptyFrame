
import press from './press'

const install = function(Vue) {
  Vue.directive('press-text', press)
}

if (window.Vue) {
  window['press-text'] = press
  Vue.use(install); // eslint-disable-line
}

press.install = install
export default press

