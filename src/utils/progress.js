const KEY = 'securelab-progress-v1'

export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function completeModule(slug) {
  const progress = getProgress()
  const updated = { ...progress, [slug]: true }
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export function resetProgress() {
  localStorage.removeItem(KEY)
}

export function percentComplete(modules) {
  const progress = getProgress()
  const completed = modules.filter((module) => progress[module.slug]).length
  return Math.round((completed / modules.length) * 100)
}
