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
// routes section

app.get('/', homeController);

app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostsController);

app.listen(4000, () => {
	console.log('App listening on port 4000');
});
