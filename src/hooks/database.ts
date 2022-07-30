import { initializeApp } from 'firebase/app';
import {
  set,
  getDatabase,
  ref,
  child,
  push,
  update,
  onChildAdded,
  onChildRemoved,
  DataSnapshot,
  onValue,
} from 'firebase/database';

import { GameObj, UserObj, Users } from 'data/types';

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

export const writeNewGame = (game: GameObj): void => {
  const newGameKey = push(child(ref(database), 'Games')).key ?? '';
  const updates: { [key: string]: any } = {};
  updates[`Games/${newGameKey}`] = game;

  update(ref(database), updates)
    .then(() => {
      console.log(`new game wrote!`);
    })
    .catch((err) => {
      alert('エラー：ゲームを書き込みできませんでした');
      console.error(err);
    });
};

export const listenGame = (
  userKey: string,
  callback: (data: DataSnapshot) => any,
) => {
  const gamesRef = ref(database, 'Games/');
  onChildAdded(gamesRef, (data) => {
    const gameData = data.val() as GameObj;
    if (gameData.status === 'active' && gameData.users.includes(userKey))
      callback(data);
  });
};

export const listenGameDeleted = (gameKey: string, callback: () => any) => {
  const gamesRef = ref(database, `Games/${gameKey}`);
  onChildRemoved(gamesRef, () => {
    console.log(`gameの削除を受け取り: ${gameKey}`);
    callback();
  });
};

export const deleteGame = (gameKey: string): void => {
  set(ref(database, `Games/${gameKey}`), null)
    .then(() => {
      console.log(`gameを削除: ${gameKey}`);
    })
    .catch((err) => {
      alert('エラー：ゲームを終了できませんでした');
      console.error(err);
    });
};

export const newOnlineUser = (user: UserObj): string => {
  const newUserKey = push(child(ref(database), 'Users')).key ?? '';
  const updates: { [key: string]: any } = {};
  updates[`Users/${newUserKey}`] = user;

  update(ref(database), updates)
    .then(() => {
      console.log(`new user wrote!`);
    })
    .catch((err) => {
      alert('エラー：ユーザーを書き込みできませんでした');
      console.error(err);
    });

  return newUserKey;
};

export const toOfflineUser = (userKey: string): void => {
  set(ref(database, `Users/${userKey}`), null)
    .then(() => {
      console.log(`userを削除: ${userKey}`);
    })
    .catch((err) => {
      alert('エラー：ユーザーを削除できませんでした');
      console.error(err);
    });
};

export const listenUsers = (callback: (users: Users) => any) => {
  const users = ref(database, 'Users/');
  onValue(users, (data) => {
    callback(data.val() as Users);
  });
};
