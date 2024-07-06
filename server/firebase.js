const firebase = require("firebase/app");
const initializeApp = firebase.initializeApp;
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "gs://plant-care-assistant-database.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const imageApp = initializeApp(firebaseConfig);
const storage = getStorage(imageApp);
module.exports = storage;
