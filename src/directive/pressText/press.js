export default {
  inserted(el, binding, vnode) {
    const text = el.textContent
    if (!text) {
      return
    }
    el.innerHTML = ''
    let innerText = ''
    let i = 0
    const interval = setInterval(() => {
      innerText += text[i]
      el.innerHTML = innerText
      i++
      if (i === text.length) {
        clearInterval(interval)
      }
    }, 100)

    // if (value && value.length > 0) {
    //   // console.log(getText(value))
    // } else {
    //   throw new Error(`木有检测到内容`)
    // }
  }
}
