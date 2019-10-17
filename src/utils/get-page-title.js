import defaultSettings from '@/settings'

const title = defaultSettings.title || '软通动力'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
