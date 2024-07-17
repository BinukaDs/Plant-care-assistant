const admin = require("firebase-admin");
const serviceAccount = require("./plant-care-assistant-database-firebase-adminsdk-iegel-3cc9ba05d6.json");
const { getFirestore } = require('firebase-admin/firestore');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://plant-care-assistant-database.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;
