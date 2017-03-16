var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

//var User = require('')

router.post('/api/authenticate', function (req, res) {
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM useraccount WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (err, result) {
            if (err) {
                res.json({
                    type: false,
                    data: 'Error ocurred: ' + err
                });
            }
            else {
                console.log(result.length);
                if (result.length > 0) {
                    res.json({
                        type: true,
                        data: result,
                        token: result.token
                    });
                }
                else {
                    res.json({
                        type: false,
                        data: 'Incorrect email/password'
                    })
                }

            }
        });
    });
});

router.post('/api/signin', function (req, res) {
    let user = [];
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM useraccount WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (err, result) {
            if (err) {
                res.json({
                    type: false,
                    data: 'Error ocurred: ' + err
                });
            }
            else {
                if (result.length > 0 && result[0].token !== null) {
                    res.json({
                        type: false,
                        data: 'User already exists'
                    });
                }
                else {
                    //console.log(jwt.sign(user, process.env.JWT_SECRET));
                    var secret = process.env.JWT_SECRET;
                    console.log(secret);

                    user = {
                        email: req.body.email,
                        password: req.body.password,
                        active: 1,
                        lastAuthentication: new Date(),
                        token: jwt.sign(user, 'rarararara')
                    }

                    console.log(user);
                    connection.query('INSERT INTO useraccount SET ?', user, function (err, result) {
                        if (err) {
                            res.status(400).json(err);
                        }
                        else {
                            res.json({
                                type: true,
                                data: user,
                                token: user.token
                            });
                        }
                    });
                }
            }
        });
    });
});

module.exports = router;