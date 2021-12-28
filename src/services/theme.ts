import { Uid } from '../common';

export type ThemeType = 'light' | 'dark'
type ThemeCallback = (theme: ThemeType) => void

let currentTheme: ThemeType
let onThemeChangeCallbacks: { [key: string]: ThemeCallback } = {}

function getTheme(): ThemeType {
  return currentTheme;
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

export const themeService = {
  getTheme,
  setTheme,
  onThemeChangeEvent,
  clearThemeChangeEvent,
}
