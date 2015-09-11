module.exports = function(app, config) {
    require('./users')(app, config);
    /* GET home page. */
    app.get('/', function(req, res, next) {
        // res.render('index', { title: 'Express' });
        res.sendFile('../public/index.html');
    });
};