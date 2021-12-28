import { initializeApp } from 'firebase/app'
import { environmentService } from './environment';

const firebaseConfig = {
  apiKey: 'AIzaSyBvRGEq7amTw_r-vWa7heNYm0fM93e7oFE',
  authDomain: 'blaarkies-hub.firebaseapp.com',
  projectId: 'blaarkies-hub',
  storageBucket: 'blaarkies-hub.appspot.com',
  messagingSenderId: '369973275759',
  appId: '1:369973275759:web:d8237fae5b114c6de8719a',
  measurementId: 'G-ZB5TCMYX9H'
}

// Initialize Firebase
// TODO: error when offline
// FirebaseError: Installations: Could not process request. Application offline. (installations/app-offline).
//   at triggerRegistrationIfNecessary (get-installation-entry.ts:98)
const app = initializeApp(firebaseConfig)

let analytics;
let logEvent = (instance, name, details) => void 0

const importAnalytics = async () => {
  await import('firebase/analytics')
    .then(module => {
      analytics = module.getAnalytics(app)
      logEvent = module.logEvent
    })
}
importAnalytics().catch(e => console.error('AdBlocker prevented loading the Firebase Analytics module.\n', e))

let env = environmentService.buildType
const log = (name: string, details: Object = {}) => {
  let newDetails = {
    ...flattenObject(details),
    environment: env === 'production' ? 'prod' : 'dev',
  }

  env === 'production'
    ? logEvent(analytics, name, newDetails)
    : console.info('%c analytics.logEvent()', 'color: #9ff',
      name, details)
}

function flattenObject(object: {} | null, parentKey = ''): {} {
  const keyPrefix = parentKey ? parentKey + '_' : ''
  return !object // don't traverse null values
    ? object
    : Object.entries(object)
      .reduce((sum, [key, value]) => (typeof value === 'object')
        ? {
          ...sum,
          ...this.flattenObject(value, key),
        }
        : {
          ...sum,
          [keyPrefix + key]: value,
        }, {})
}

export const firebaseService = {
  log,
}
