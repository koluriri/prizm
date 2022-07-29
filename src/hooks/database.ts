import { GameObj } from 'data/types';

import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  onChildAdded,
  DataSnapshot,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/* const writeUserData = async (userId: number, name: string) => {
  await set(ref(database, `sample/key${userId}`), {
    username: name,
  })
    .catch((error) => {
      alert('error!(1)');
      console.error(error);
    })
    .finally(() => {
      console.log('finally');
    });
};

void writeUserData(Date.now(), 'nezumi'); */

// GameObjを書き込む（ゲーム開始）
export const writeNewGame = (game: GameObj): void => {
  const newGameKey = push(child(ref(database), 'Games')).key ?? '';
  const updates: { [key: string]: any } = {};
  updates[`Games/${newGameKey}`] = game;

  update(ref(database), updates)
    .then(() => {
      console.log('new game writed!');
    })
    .catch((err) => {
      alert('エラー：ゲームを書き込みできませんでした');
      console.error(err);
    });
};

export const listenGame = (callback: (data: DataSnapshot) => any) => {
  const gamesRef = ref(database, 'Games/');
  onChildAdded(gamesRef, (data) => {
    callback(data);
  });
};
