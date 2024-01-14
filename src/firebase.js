import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyCLFbodwKVj1RPZbPVcIfmcKihdnUJvYw0",
    authDomain: "dubucket.firebaseapp.com",
    projectId: "dubucket",
    storageBucket: "dubucket.appspot.com",
    messagingSenderId: "25830009537",
    appId: "1:25830009537:web:36974c0cb19b580dc74240"
};

const app = initializeApp(firebaseConfig);

export default app;
