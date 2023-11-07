const express = require('express');
const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var firebaseConfig = {
    apiKey: "AIzaSyCebiwmgVov-Z5G4hZbhEL4IV4zwYoT9W8",
    authDomain: "autenticacao-87c74.firebaseapp.com",
    projectId: "autenticacao-87c74",
    storageBucket: "autenticacao-87c74.appspot.com",
    messagingSenderId: "778355577088",
    appId: "1:778355577088:web:92a57ccaf3a27eb522a3e5",
    measurementId: "G-ZXKEF3F3MR"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); // Adicione esta linha
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});


app.get('/home', (req, res) => {
    const user = auth.currentUser;
    console.log(user); // Adicione esta linha
    if (user) {
        res.render('home', { user: user });
    } else {
        res.redirect('/');
    }
});


app.listen(3000, () => console.log('Server started on port 3000'));
