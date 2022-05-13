const express = require('express');
const router = express.Router();
const get = require('./get');
const post = require('./post');
const put = require('./put');
const del = require('./delete');


// router.get('/', get.getAllCollections);
// router.get('/:id', get.getCollection);
// router.post('/', post.createCollection);
// router.put('/:id', put.updateCollection);
// router.delete('/:id', del.deleteCollection);
// module.exports = router;

module.exports = { get, post, put, del }
