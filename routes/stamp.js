var config = require('../config');
var SnowShoeStamp = require('snowshoestamp')

module.exports = function(app) {

    app.post('/stamped', function(req, res) {
        console.dir(req.body);
        console.dir(config);
        var auth = new SnowShoeStamp(config.APP_KEY, config.APP_SECRET);
        auth.validateStamp(req.body,function(response) {
            console.dir(response);
            res.redirect("http://www.busmsn.com/a/0161");
            //res.send("<html><body><h1 style='font-size:88px;'>Let's play frisbee!</h1></body></html>");
        });
    });

};
