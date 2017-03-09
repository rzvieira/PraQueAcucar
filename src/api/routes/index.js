var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/posts', function (req, res, next) {
  //res.render('index', { title: 'Express' });

  req.getConnection(function (err, connection) {
    connection.query('SELECT * FROM posts', [], function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(result);
    });
  });
});

// // DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
// router.get('*', function(req, res) {
//     // Carrega nossa view index.html que será a única da nossa aplicação
//     // O Angular irá lidar com as mudanças de páginas no front-end
//     res.sendfile('./public/index.html');
// });

module.exports = router;
