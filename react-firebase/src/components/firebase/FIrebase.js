import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD82j7xycnihCXVIUu1e3MWjmNLCRgBwNU",
  authDomain: "react-demo-ba31d.firebaseapp.com",
  projectId: "react-demo-ba31d",
  storageBucket: "react-demo-ba31d.appspot.com",
  messagingSenderId: "872107481064",
  appId: "1:872107481064:web:b0b2e5be66c78eb9d6365d",
  measurementId: "G-BJEK8ME9P2",
  databaseURL: "https://react-demo-ba31d-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BLZ-TaOQqBijYxgFzeRcA6ZU2NVo4TJk667sQ-4oVk-dY7v9Y3qqWQ12QHz6DOE9DC7on17k1oOJg_jix3x2Ur0" });

      if (token) {
        console.log("FCM Token:- \n", token);
        localStorage.setItem("FCM_Token", token);
        // Here you can send the token to your server
      } else {
        console.error("No registration token available.");
      }

    }
  } catch (error) {
    console.error("An error occurred while generating the token:", error);
  }
};
