require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3003;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTSTRING, {useNewUrlParser: true, useUnifiedTopology: true})

    .then(() => {
        console.log('BD started');
        app.emit('ready')
    });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const routes = require('./routes');
const path = require('path');
const csrf = require('csurf');
const { otherMiddleware, myMiddleware, checkCsrfErr, csrfMiddleware } = require('./src/middleware/middlewareGlob');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

// app.use(helmet());
const sessionOptions = session({
    secret: 'Dd8@Bh1_Uh3_At4!Pm1#',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(myMiddleware);
// app.use(otherMiddleware);
app.use(checkCsrfErr);
app.use(csrfMiddleware);
app.use(routes)

app.on('ready', () => {
    app.listen(port, () => {
        console.log(`Acess http://localhost:${port}`)
    });
});
