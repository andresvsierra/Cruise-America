import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getDatabase, ref, set, push, update } from 'firebase/database'

declare global {
  interface Window {
    __appCheckInitialized?: boolean
  }
}

const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

if (!databaseURL) {
  throw new Error('Missing NEXT_PUBLIC_FIREBASE_DATABASE_URL environment variable')
}

const firebaseConfig = {
  databaseURL,
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
