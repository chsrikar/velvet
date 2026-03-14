// localStorage utility helpers for Velvet Vision

export function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(`velvet_${key}`)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(`velvet_${key}`, JSON.stringify(value))
  } catch {
    // silently fail if storage is full
  }
}
