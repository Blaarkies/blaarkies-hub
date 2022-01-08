import { Common, Uid } from '../common'

type DeviceType = 'mobile' | 'tablet' | 'desktop'
type DeviceCallback = (device: Device) => void

interface Device {
  type: DeviceType
}

let deviceMeasures: { [key: string]: DeviceType } = {
  '(max-width: 500px) and (orientation: portrait)': 'mobile',
  '(max-height: 500px) and (orientation: landscape)': 'mobile',

  '(max-width: 800px) and (orientation: portrait)': 'tablet',
  '(max-height: 800px) and (orientation: landscape)': 'tablet',

  '(min-width: 800px) and (orientation: portrait)': 'desktop',
  '(min-height: 800px) and (orientation: landscape)': 'desktop',
}

let device: Device
let deviceChangeCallbacks: { [key: string]: DeviceCallback } = {}
let isMobile: boolean

setupUpdates()

function setupUpdates() {
  let measureEntries = Object.entries(deviceMeasures)

  const updateDevice = () => {
    let [, type] = Common.findBreak(measureEntries, ([measure]) => window.matchMedia(`screen and ${measure}`).matches)

    device = {
      type,
    }

    isMobile = type === 'mobile'

    Object.values(deviceChangeCallbacks).forEach((cb: DeviceCallback) => cb(device))
  }
  window.addEventListener('orientationchange', updateDevice)
  window.addEventListener('resize', updateDevice)
  updateDevice()
}

function getDevice(): Device {
  return device
}

function onDeviceChangeEvent(callback: DeviceCallback): string {
  let key = Uid.new
  deviceChangeCallbacks[key] = callback
  return key
}

function clearDeviceChangeEvent(key: string) {
  delete deviceChangeCallbacks[key]
}

export const deviceService = {
  getDevice,
  onDeviceChangeEvent,
  clearDeviceChangeEvent,
  isMobile,
}
