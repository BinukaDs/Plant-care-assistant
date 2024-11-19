const admin = require("firebase-admin");
const serviceAccount = {
  type: process.env.SERVICE_TYPE,
  project_id: process.env.SERVICE_PROJECT_ID,
  private_key_id: process.env.SERVICE_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.SERVICE_CLIENT_EMAIL,
  client_id: process.env.SERVICE_CLIENT_ID,
  auth_uri: process.env.SERVICE_AUTH_URI,
  token_uri: process.env.SERVICE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SERVICE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SERVICE_CLIENT_X509_CERT_URL
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://plant-care-assistant-database.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;
