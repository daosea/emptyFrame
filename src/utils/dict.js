import store from '@/store'
export function getDictDatas(element) {
  for (const ele in element) {
    store.dispatch('GetDict', ele, false).then(response => {
      element[ele] = response
    })
  }
}
