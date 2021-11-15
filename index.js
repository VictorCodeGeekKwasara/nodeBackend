const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload');

// npm install body-parser

const bodyParser = require('body-parser');

// connect to db

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

// middle ware

const validateMiddleWare = (req, res, next) => {
	if (req.files == null || req.body.title == null || req.body.body == null) {
		return res.redirect('/posts/new');
	}
	next();
};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
// routes section

app.get('/', async (req, res) => {
	// res.sendFile(path.resolve(__dirname, 'pages/index.html')); without ejs
	const blogposts = await BlogPost.find({});
	console.log(blogposts);
	res.render('index', { blogposts });
});

app.get('/about', (req, res) => {
	res.render('about');
});
app.get('/contact', (req, res) => {
	res.render('contact');
});
app.get('/post/:id', async (req, res) => {
	const blogpost = await BlogPost.findById(req.params.id);
	res.render('post', {
		blogpost,
	});
});

app.get('/posts/new', (req, res) => {
	res.render('create');
});

app.post('/posts/store', (req, res) => {
	console.log(req.body);

	let image = req.files.image;
	image.mv(
		path.resolve(__dirname, 'public/assets/img', image.name),
		async (error) => {
			await BlogPost.create({
				...req.body,
				image: '/assets/img/' + image.name,
			});

			res.redirect('/');
		}
	);

	// / model creates a new doc with browser data
});

app.listen(4000, () => {
	console.log('App listening on port 4000');
});
