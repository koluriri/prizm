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
  startAt,
  query,
  orderByChild,
} from 'firebase/database';

import {
  AnswerMessage,
  GameMessage,
  GameObj,
  isAnswerMessage,
  MessageObject,
  UserObj,
  Users,
} from 'utils/types';

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

/* Message */
export const listenMessage = (
  gameKey: string,
  callback: (data: MessageObject) => any,
) => {
  const gamesRef = ref(database, `Games/${gameKey}/messages`);
  const unSubscribe = onChildAdded(gamesRef, (data) => {
    let message;
    if (isAnswerMessage(data.val())) {
      message = data.val() as AnswerMessage;
    } else {
      message = data.val() as GameMessage;
      if (message.type === 'end') unSubscribe();
    }
    callback({
      ...message,
      key: data.key,
    });
  });
};

export const pushMessage = (
  gameKey: string,
  message: MessageObject,
): string => {
  const newMessageKey =
    push(child(ref(database), `Games/${gameKey}/messages`)).key ?? '';
  const updates: { [key: string]: any } = {};
  updates[`Games/${gameKey}/messages/${newMessageKey}`] = message;

  update(ref(database), updates).catch((err) => {
    alert('エラー：メッセージを書き込みできませんでした');
    console.error(err);
  });

  return newMessageKey;
};

/* Game */

export const writeNewGame = (game: GameObj): void => {
  const newGameKey = push(child(ref(database), 'Games')).key ?? '';
  const updates: { [key: string]: any } = {};
  updates[`Games/${newGameKey}`] = game;

  update(ref(database), updates)
    .then(() => {
      pushMessage(newGameKey, {
        type: 'start',
        value: `${game.startBy}が\nゲーム開始\n参加者${game.users.length}人`,
      });
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
    if (gameData.users && gameData.users.includes(userKey)) callback(data);
  });
};

export const listenGameDeleted = (gameKey: string, callback: () => any) => {
  const gamesRef = ref(database, `Games/${gameKey}`);
  onChildRemoved(gamesRef, () => {
    callback();
  });
};

export const deleteGame = (gameKey: string): void => {
  set(ref(database, `Games/${gameKey}`), null).catch((err) => {
    alert('エラー：ゲームを終了できませんでした');
    console.error(err);
  });
};

/* User */

export const newOnlineUser = (user: UserObj): string => {
  const newUserKey = push(child(ref(database), 'Users')).key ?? '';
  const updates: { [key: string]: any } = {};
  updates[`Users/${newUserKey}`] = user;

  update(ref(database), updates).catch((err) => {
    alert('エラー：ユーザーを書き込みできませんでした');
    console.error(err);
  });

  return newUserKey;
};

export const deleteUser = (userKey: string): void => {
  set(ref(database, `Users/${userKey}`), null).catch((err) => {
    alert('エラー：ユーザーを削除できませんでした');
    console.error(err);
  });
};

export const listenUsers = (callback: (users: Users) => any) => {
  // const users = ref(database, 'Users/');
  const users = query(
    ref(database, 'Users/'),
    orderByChild('pingStamp'),
    startAt(Date.now() - 3000),
  );
  onValue(users, (data) => {
    callback(data.val() as Users);
  });
};

export const updatePingStamp = (userKey: string): void => {
  const updates: { [key: string]: any } = {};
  updates[`Users/${userKey}/pingStamp`] = Date.now();

  void update(ref(database), updates);
};
