import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBbxGcjWYQi-9mCuo1Npd8qTPPPvr8R_K4",
  databaseURL: "https://mychat-43570.firebaseio.com/",
  projectId: "mychat-43570",
  appId: "1:572570864286:android:58350baff8687695af898f",
};

export default Firebase.initializeApp(firebaseConfig);