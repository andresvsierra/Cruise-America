import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, update } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://onboarding-shakkii-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, push, update };
