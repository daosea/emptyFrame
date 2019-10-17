import store from '@/store'
export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const btns = store.getters && store.getters.btns

    if (value && value.length > 0) {
      const permissionBtns = value
      const hasPermission = btns.some(btn => {
        return permissionBtns.includes(btn)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`权限呢？！！！`)
    }
  }
}
