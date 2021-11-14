const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');

// middle ware

app.set('view engine', 'ejs');
app.use(express.static('public'));

// routes section

app.get('/', (req, res) => {
	// res.sendFile(path.resolve(__dirname, 'pages/index.html')); without ejs

	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about');
});
app.get('/contact', (req, res) => {
	res.render('contact');
});
app.get('/post', (req, res) => {
	res.render('post');
});

app.listen(4000, () => {
	console.log('App listening on port 4000');
});
