import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBizfyrzm3tWAqItPODDtTl-WHqrOanb70",
  authDomain: "ecig-usage-pattern.firebaseapp.com",
  projectId: "ecig-usage-pattern",
  storageBucket: "ecig-usage-pattern.appspot.com",
  messagingSenderId: "693576652033",
  appId: "1:693576652033:web:23e6cf5943e213dd7a7700",
  measurementId: "G-8571Q7LJ4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
