import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getDatabase, ref, set, push, update } from 'firebase/database'

declare global {
  interface Window {
    __appCheckInitialized?: boolean
  }
}

const fallbackDatabaseURL =
  'https://rentalbuddy-intro-default-rtdb.firebaseio.com/'

const envDatabaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL?.trim()

if (!envDatabaseURL && process.env.NODE_ENV === 'development') {
  console.warn(
    'NEXT_PUBLIC_FIREBASE_DATABASE_URL is not set; using the RentalBuddy Intro default database URL.'
  )
}

const firebaseConfig = {
  databaseURL: envDatabaseURL || fallbackDatabaseURL,
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const initializeClientAppCheck = () => {
  if (typeof window === 'undefined') {
    return
  }

  if (window.__appCheckInitialized) {
    return
  }

  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY

  if (!recaptchaKey) {
    throw new Error('Missing NEXT_PUBLIC_RECAPTCHA_KEY environment variable')
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaKey),
    isTokenAutoRefreshEnabled: true,
  })

  window.__appCheckInitialized = true
}

initializeClientAppCheck()

export { database, ref, set, push, update }
