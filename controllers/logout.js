module.exports = (req, res) => {
	req.session.destroy(() => {
		global.loggedIn = null;
		res.redirect('/');
	});
};
