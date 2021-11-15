const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
	// res.sendFile(path.resolve(__dirname, 'pages/index.html')); without ejs
	const blogposts = await BlogPost.find({});
	console.log(blogposts);
	res.render('index', { blogposts });
};
