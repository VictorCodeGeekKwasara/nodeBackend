const express = require('express');
const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const validateMiddleware = require('./middleware/validationMiddleware');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const storePostsController = require('./controllers/storePosts');
const getPostController = require('./controllers/getPost');
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const contactController = require('./controllers/contact');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const flash = require('connect-flash');

global.loggedIn = null;
// npm install body-parser

const bodyParser = require('body-parser');

// connect to db

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

// middle ware

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware);
app.use(
	expressSession({
		secret: 'keyboard cat',
	})
);

app.use('*', (req, res, next) => {
	if (req.session.userId) loggedIn = req.session.userId;
	next();
});

app.use(flash());
// routes section

app.get('/', homeController);

app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/post/:id', getPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);

app.post(
	'/users/login',
	redirectIfAuthenticatedMiddleware,
	loginUserController
);
app.post('/posts/store', authMiddleware, storePostsController);
app.post(
	'/users/register',
	redirectIfAuthenticatedMiddleware,
	storeUserController
);

app.use((req, res) => res.render('notfound'));
app.listen(4000, () => {
	console.log('App listening on port 4000');
});
