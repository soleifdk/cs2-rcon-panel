const express = require('express');
const session = require('express-session');
const ejs = require('ejs');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'cs2rconpanel',
    resave: false,
    saveUninitialized: true,
}));


const gameModule = require('./routes/game');
const gameRoutes = gameModule.router;

const serverRoutes = require('./routes/server');
const authRoutes = require('./routes/auth');

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.use('/cs2server', gameRoutes);
app.use('/cs2server', serverRoutes);
app.use('/cs2server', authRoutes)

app.get('/cs2server', (req, res) => {
    if (req.session.user) {
        res.redirect('/cs2server/servers');
    } else {
        res.render('login');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
