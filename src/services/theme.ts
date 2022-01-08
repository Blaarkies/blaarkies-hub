import { Uid, userThemePreferenceKey } from '../common'
import { firebaseService } from './firebase'

export enum ThemeTypeEnum {
  Light = 'light',
  Dark = 'dark',
}

export type ThemeType = ThemeTypeEnum.Light | ThemeTypeEnum.Dark
type ThemeCallback = (theme: ThemeType) => void

let themeToggleMap = {
  [ThemeTypeEnum.Light]: ThemeTypeEnum.Dark,
  [ThemeTypeEnum.Dark]: ThemeTypeEnum.Light,
  includes: (theme: string) => Object.keys(themeToggleMap).includes(theme),
}

let currentTheme: ThemeType
let onThemeChangeCallbacks: { [key: string]: ThemeCallback } = {}

function getTheme(): ThemeType {
  if (currentTheme) {
  return currentTheme
  }

  let localPreference = localStorage.getItem(userThemePreferenceKey)
  if (localPreference && themeToggleMap.includes(localPreference)) {
    currentTheme = localPreference as ThemeType
    return currentTheme
  }

  const browserPreferenceDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  currentTheme = browserPreferenceDarkMode ? ThemeTypeEnum.Dark : ThemeTypeEnum.Light
  localStorage.setItem(userThemePreferenceKey, currentTheme)
  firebaseService.log(`Default color scheme was ${currentTheme}`)
  return currentTheme
}

function setTheme(newValue: ThemeType) {
  currentTheme = newValue
  Object.values(onThemeChangeCallbacks).forEach(cb => cb(newValue))
}

function onThemeChangeEvent(callback: ThemeCallback): string {
  let key = Uid.new
  onThemeChangeCallbacks[key] = callback
  return key
}

function clearThemeChangeEvent(key: string) {
  delete onThemeChangeCallbacks[key]
}

function toggleTheme(): ThemeType {
  currentTheme = themeToggleMap[currentTheme] ?? ThemeTypeEnum.Dark
  localStorage.setItem(userThemePreferenceKey, currentTheme)
  setTheme(currentTheme)
  return currentTheme
}

export const themeService = {
  getTheme,
  setTheme,
  onThemeChangeEvent,
  clearThemeChangeEvent,
  toggleTheme,
}
