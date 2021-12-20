import { Uid } from '../common/uid'

export type ThemeType = 'light' | 'dark'

let currentTheme: ThemeType
let onThemeChangeCallbacks: { [key: string]: Function } = {}

function getTheme(): ThemeType {
  return currentTheme;
}

function setTheme(newValue: ThemeType) {
  currentTheme = newValue
  Object.values(onThemeChangeCallbacks).forEach(cb => cb())
}

function onThemeChangeEvent(callback: Function): string {
  let key = Uid.new
  onThemeChangeCallbacks[key] = callback
  return key
}

function clearThemeChangeEvent(key: string) {
  delete onThemeChangeCallbacks[key]
}

export const themeService = {
  getTheme,
  setTheme,
  onThemeChangeEvent,
  clearThemeChangeEvent,
}
