# Google Firebase

Google Firebase is a comprehensive suite of cloud-based development tools designed to assist developers in building, deploying, and scaling mobile and web applications. Below are the key features of Firebase presented in points for clarity:

## Key Features of Firebase

- **Authentication**: 
  - Provides secure sign-in methods including email/password, Google Sign-In, Facebook Login, and more.

- **Realtime Database**: 
  - A NoSQL cloud-hosted database that allows data to be stored and synchronized in real-time across all connected devices, enabling offline capabilities.

- **Cloud Firestore**: 
  - A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.

- **Cloud Messaging**: 
  - Enables sending notifications and messages to users' devices even when the app is not in use. This feature supports push notifications and in-app messaging.

- **Crashlytics**: 
  - A powerful crash reporting tool that helps developers track, prioritize, and fix stability issues in their apps.

- **Performance Monitoring**: 
  - Offers insights into app performance metrics such as response times, CPU usage, and network latency to help optimize user experience.

- **Test Lab**: 
  - A cloud-based testing infrastructure that allows developers to test their apps on a wide variety of devices and configurations before release.

- **Hosting**: 
  - Provides fast and secure hosting for web applications with a global content delivery network (CDN).

- **Remote Config**: 
  - Allows developers to modify the behavior and appearance of their app without requiring users to download an update. This can be useful for feature flags and A/B testing.

- **Analytics**: 
  - Integrates Google Analytics for Firebase to provide detailed insights into user engagement and behavior within the app.

- **Cloud Storage**: 
  - A service for storing large files such as images, audio, and video securely in the cloud.

- **In-App Messaging**: 
  - Enables sending targeted messages to users while they are using the app to encourage engagement.

Firebase is particularly valued for its ease of integration with various platforms (iOS, Android, Web) and its ability to streamline the development process by providing a range of essential backend services in one package.

## RealTime Database
Firebase Realtime Database offers various methods for working with data. Below are some key methods along with code examples in React:
 
 ### Summary of Methods:
- `set()`: Writes or replaces data.
- `push()`: Adds a new child node with a unique key.
- `get()`: Retrieves data once.
- `onValue()`: Sets up a real-time listener.
- `update()`: Updates specific data fields.
- `remove()`: Deletes data.
- `runTransaction()`: Atomic updates.
- `query()`: Retrieves data based on conditions.
- `onChildAdded()`, `onChildChanged()`, `onChildRemoved()`: Listen for specific child changes.
 
### 1. **Setup Firebase in React**
 
Before using any Firebase methods, ensure that Firebase is initialized properly in your React app. Install Firebase if not already installed:
 
```bash
npm install firebase
```
Then, configure Firebase in your app:
 
```javascript
// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
 
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
 
export { database };
```
 
### 2. **Write Data**
To write data to Firebase Realtime Database, you can use the `set()` or `push()` method.
 
```javascript
import { ref, set, push } from 'firebase/database';
import { database } from './firebase';
 
// Write Data with set()
const writeData = () => {
  set(ref(database, 'users/1'), {
    username: 'JohnDoe',
    email: 'john@example.com'
  });
};
 
// Add a new entry with push()
const addNewData = () => {
  const newPostRef = push(ref(database, 'posts'));
  set(newPostRef, {
    title: 'New Post',
    content: 'This is a new post'
  });
};
```
 
### 3. **Read Data**
To read data, you can use `get()`, `onValue()`, or `once()`.
 
#### One-time Read (`get()`)
```javascript
import { ref, get, child } from 'firebase/database';
import { database } from './firebase';
 
const fetchData = async () => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `users/1`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error);
  }
};
```
 
#### Real-time Listener (`onValue()`)
```javascript
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';
import { useEffect, useState } from 'react';
 
const RealTimeData = () => {
  const [userData, setUserData] = useState(null);
 
  useEffect(() => {
    const userRef = ref(database, 'users/1');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  }, []);
 
  return (
    <div>
      {userData ? (
{`Username: ${userData.username}, Email: ${userData.email}`}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
```
 
### 4. **Update Data**
To update existing data, you can use the `update()` method.
 
```javascript
import { ref, update } from 'firebase/database';
import { database } from './firebase';
 
const updateData = () => {
  const updates = {};
  updates['/users/1/username'] = 'JaneDoe';
  updates['/users/1/email'] = 'jane@example.com';
 
  return update(ref(database), updates);
};
```
 
### 5. **Delete Data**
To delete data, use the `remove()` method.
 
```javascript
import { ref, remove } from 'firebase/database';
import { database } from './firebase';
 
const deleteData = () => {
  const userRef = ref(database, 'users/1');
  remove(userRef)
    .then(() => {
      console.log('Data removed successfully');
    })
    .catch((error) => {
      console.error('Error removing data:', error);
    });
};
```
 
### 6. **Transaction**
To perform atomic updates, use `runTransaction()`.
 
```javascript
import { ref, runTransaction } from 'firebase/database';
import { database } from './firebase';
 
const incrementData = () => {
  const countRef = ref(database, 'counters/1');
  runTransaction(countRef, (currentCount) => {
    if (currentCount === null) {
      return 1;
    }
    return currentCount + 1;
  });
};
```
 
### 7. **Querying Data**
To query data based on certain conditions, you can use methods like `orderByChild()`, `limitToFirst()`, etc.
 
```javascript
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { database } from './firebase';
 
const queryData = async () => {
  const usersRef = ref(database, 'users');
  const queryRef = query(usersRef, orderByChild('username'), equalTo('JohnDoe'));
 
  const snapshot = await get(queryRef);
  snapshot.forEach((childSnapshot) => {
    console.log(childSnapshot.key, childSnapshot.val());
  });
};
```
 
### 8. **Listening for Child Changes**
You can listen for child added, changed, or removed using `onChildAdded()`, `onChildChanged()`, `onChildRemoved()`.
 
```javascript
import { ref, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';
import { database } from './firebase';
 
const listenForChildChanges = () => {
  const postsRef = ref(database, 'posts');
 
  onChildAdded(postsRef, (snapshot) => {
    console.log('Child added:', snapshot.val());
  });
 
  onChildChanged(postsRef, (snapshot) => {
    console.log('Child changed:', snapshot.val());
  });
 
  onChildRemoved(postsRef, (snapshot) => {
    console.log('Child removed:', snapshot.val());
  });
};
```

These examples demonstrate how to work with Firebase Realtime Database in React.

## Firebase Cloud Message 
In Firebase Cloud Messaging (FCM), the `messaging` object provides several essential functions for handling messaging in web applications. Below is an overview of the key functions available within the `messaging` object, particularly focusing on those relevant to receiving and managing messages.

### Key Functions of `messaging`

1. **getToken()**
   - **Description**: This function retrieves the current registration token for the client app instance. The token is used to identify the device for sending notifications.
   - **Usage**: It requests permission from the user to receive notifications and, if granted, retrieves a token that can be sent to your server for targeting messages.
   - **Example**:
     ```javascript
     import { getToken } from 'firebase/messaging';
     
     const requestForToken = async () => {
         const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
         console.log("Token:", token);
     };
     ```

2. **onMessage()**
   - **Description**: This function sets up a listener for incoming messages when the app is in the foreground. It triggers a callback function whenever a message is received.
   - **Usage**: Use this function to handle notifications while the user is actively using your web application.
   - **Example**:
     ```javascript
     import { onMessage } from 'firebase/messaging';
     
     onMessage(messaging, (payload) => {
         console.log("Message received. ", payload);
         // Handle the message here
     });
     ```

3. **onBackgroundMessage()**
   - **Description**: This function allows you to specify a handler for background messages received when the app is not in focus or closed. It must be defined in a service worker file (`firebase-messaging-sw.js`).
   - **Usage**: Use this to handle notifications that should be displayed even when the app is not active.
   - **Example**:
     ```javascript
     import { onBackgroundMessage } from 'firebase/messaging/sw';
     
     onBackgroundMessage(messaging, (payload) => {
         console.log('Received background message ', payload);
         // Customize notification display here
     });
     ```

4. **setBackgroundMessageHandler()**
   - **Description**: Similar to `onBackgroundMessage`, this function allows you to set a background message handler directly on the messaging instance.
   - **Usage**: This is typically used in service worker scripts to define how to handle background messages.
   - **Example**:
     ```javascript
     import { setBackgroundMessageHandler } from 'firebase/messaging/sw';

     setBackgroundMessageHandler((payload) => {
         console.log('[firebase-messaging-sw.js] Received background message ', payload);
         // Customize notification here
     });
     ```

5. **deleteToken()**
   - **Description**: This function deletes the current registration token, which can be useful if you want to stop receiving messages or if the user logs out.
   - **Usage**: Call this function when you want to unregister the device from receiving notifications.
   - **Example**:
     ```javascript
     import { deleteToken } from 'firebase/messaging';

     const removeToken = async () => {
         await deleteToken(messaging);
         console.log("Token deleted");
     };
     ```

### Summary of Usage

| Function                     | Description                                      | Usage Context                                   |
|------------------------------|--------------------------------------------------|------------------------------------------------|
| `getToken()`                 | Retrieves current registration token              | On app initialization or after user login      |
| `onMessage()`                | Listens for foreground messages                   | When the app is active                          |
| `onBackgroundMessage()`       | Handles background messages                       | In service worker when app is not active       |
| `setBackgroundMessageHandler()`| Sets handler for background messages             | In service worker                               |
| `deleteToken()`              | Deletes current registration token                | When logging out or stopping notifications      |

By utilizing these functions effectively, you can manage notifications and messaging in your web application using Firebase Cloud Messaging, ensuring that users receive timely updates whether they are actively using your app or not.

--------------------------------------------------------------------------------------------------------------------------------------

## Detection user Inactivity
means chekc user active or inactive by event listenr or library.

### react-idle-timer (use library)
mousemove ,keydown, wheel, mousedown, touchstart, visibilitychange

The `useIdleTimer` hook from the `react-idle-timer` library provides a flexible way to manage user inactivity in React applications. Below are all the props you can use with `useIdleTimer`, along with their descriptions and default values.

### **Props for `useIdleTimer`**

| Name                  | Type        | Default Value               | Description                                                                                      |
|-----------------------|-------------|-----------------------------|--------------------------------------------------------------------------------------------------|
| **timeout**           | `Number`    | `1000 * 60 * 20` (20 mins) | Idle timeout in milliseconds. Defines how long the user can be inactive before triggering idle actions. |
| **events**            | `Array`     | Default events              | An array of events to bind for detecting user activity. Default includes mouse and keyboard events. |
| **onIdle**            | `Function`  | `() => {}`                  | Function to call when the user is now idle. This is where you can implement logic for session expiration or alerts. |
| **onActive**          | `Function`  | `() => {}`                  | Function to call when the user is no longer idle. Useful for resetting any idle-related state. |
| **onAction**          | `Function`  | `() => {}`                  | Function to call on user action, which can be used to track interactions that reset the idle timer. |
| **debounce**          | `Number`    | `0`                         | Debounce the `onAction` function with a delay in milliseconds. Cannot be set if `throttle` is used. |
| **throttle**          | `Number`    | `0`                         | Throttle the `onAction` function with a delay in milliseconds. Cannot be set if `debounce` is used. |
| **eventsThrottle**    | `Number`    | `200`                       | Throttles the event handler to help decrease CPU usage on certain events like mouse movements. |
| **element**           | `Object`    | `document`                  | The DOM element to attach the event listeners to; defaults to the document object but can be a specific element ref. |
| **startOnMount**      | `Boolean`   | `true`                      | If true, starts the timer when the component mounts. Set to false to wait for user action before starting the timer. |
| **stopOnIdle**        | `Boolean`   | `false`                     | If true, stops the timer when the user goes idle; requires manual calls to reset() to restart the timer. |
| **crossTab**          | `Boolean`   | `false`                     | If true, enables cross-tab reconciliation of onIdle and onActive events, allowing shared state across multiple tabs. |
| **name**              | `String`    | `'idle-timer'`              | A name for the timer instance, useful for debugging purposes or when managing multiple timers. |
| **syncTimers**        | `Number`    | `0`                         | Synchronizes timers across tabs with a specified delay in milliseconds; useful for managing session states across multiple tabs. |
| **leaderElection**    | `Boolean`   | `false`                     | If true, enables leader election mode where only one tab emits onIdle and onActive events, preventing duplicate actions across tabs. |

### **Methods Available with `useIdleTimer`**

In addition to props, the following methods are available through the hook:

| Method                     | Returns      | Description                                                                                   |
|----------------------------|--------------|-----------------------------------------------------------------------------------------------|
| **reset()**                | `Void`       | Resets the idle timer and calls the onActive function.                                       |
| **pause()**                | `Void`       | Pauses the idle timer without resetting it.                                                  |
| **resume()**               | `Void`       | Resumes a paused idle timer, continuing from where it left off.                             |
| **getRemainingTime()**     | `Number`     | Returns the remaining time until the user is considered idle, in milliseconds.              |
| **getElapsedTime()**       | `Number`     | Returns the elapsed time since the last active state, in milliseconds.                      |
| **getLastIdleTime()**      | `Number`     | Returns a timestamp of when the user was last idle.                                         |
| **getTotalIdleTime()**     | `Number`     | Returns the total amount of time in milliseconds that the user has been idle during this session. |
| **getLastActiveTime()**    | `Number`     | Returns a timestamp of when the user was last active.                                       |
| **getTotalActiveTime()**   | `Number`     | Returns the total amount of time in milliseconds that the user has been active during this session. |
| **isIdle()**               | `Boolean`    | Returns whether or not the user is currently considered idle (true) or active (false).      |
| **isLeader()**             | `Boolean`    | Returns whether this tab is currently designated as the leader tab in cross-tab scenarios (only true if crossTab is enabled). |

