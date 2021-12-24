// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const firebaseService = {
  app,
  analytics,
}
