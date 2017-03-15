var express = require('express');
var router = express.Router();

//var User = require('')

router.post('/api/authenticate', function (req, res) {
    req.getConnection(function (err, connection) {
        connection.query('SELECT * WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (err, result) {
            if (err) {
                res.json({
                    type: false,
                    data: 'Error ocurred: ' + err
                });
            }
            else
            {
                if(result){
                    res.json({
                        type: true,
                        data: result,
                        token: result.token
                    });
                }
                else{
                    res.json({
                        type: false,
                        data: 'Incorrect email/password'
                    })
                }
                
            }
        });
    });
});

module.exports = router;