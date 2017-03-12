var express = require('express');
var router = express.Router();

/* GET */
router.get('/api/posts', function (req, res) {
  req.getConnection(function (err, connection) {
    connection.query('SELECT * FROM posts', [], function (err, result) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  });

  //  res.writeHead(200, { 'Content-Type': 'text/html' });
  //   res.end('Hello, world!');
});

/* POST */
router.post('/api/posts', function(req, res) {
  req.getConnection(function (err, connection) {
    var post = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      post: req.body.post
    };

    connection.query('INSERT INTO posts SET ?', post, function(err, result) {
      if (err) {
        res.status(400).json(err);
      }
    });

    connection.query('SELECT * FROM posts', [], function (err, result) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  });
});

router.delete('/api/posts/:post_id', function(req, res) {
  req.getConnection(function(err, connection){
    var id = req.params.post_id;
    
    connection.query('DELETE FROM posts WHERE id = ? ', [id], function(err, result){
      if (err) {
        res.status(400).json(err);
      }
    });

    connection.query('SELECT * FROM posts', [], function (err, result) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  });
});

router.get('/api/posts/:post_id', function(req, res){
  req.getConnection(function(err, connection){
    var id = req.params.post_id;

    connection.query('SELECT * FROM posts WHERE id = ? ', [id], function(err, result){
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  });
});

router.put('/api/posts/:post_id', function(req, res){
  req.getConnection(function(err, connection){
    var post = req.body;
    var id = req.params.post_id;

    connection.query('UPDATE posts SET title = ?, description = ?, post = ? WHERE id = ?', [post.title, post.description, post.post, id], function(err, result){
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  });
});

// // DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
// router.get('*', function(req, res) {
//     // Carrega nossa view index.html que será a única da nossa aplicação
//     // O Angular irá lidar com as mudanças de páginas no front-end
//     res.sendfile('./public/index.html');
// });

module.exports = router;
