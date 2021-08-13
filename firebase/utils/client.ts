import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { config } from "dotenv";

config();

const dev = process.env.NODE_ENV !== "production";

if (firebase.apps.length < 1) {
	firebase.initializeApp({
		apiKey: "AIzaSyC98nDjp7jYXYTMwUGtHA-YUoLLcZXPY_o",
		authDomain: "moistened-d6474.firebaseapp.com",
		projectId: "moistened-d6474",
		storageBucket: "moistened-d6474.appspot.com",
		messagingSenderId: "1080727215809",
		appId: "1:1080727215809:web:0aa288b7263503bc53fe40",
	});

	if (dev) {
		firebase.firestore().useEmulator("localhost", 8080);
	}
}

export default firebase;
