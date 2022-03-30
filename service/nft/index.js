const express = require('express');
const router = express.Router();

const get = require('./get');
const post = require('./post');
const put = require('./put');
const del = require('./delete');

// router.get('/', get.getAllNfts);
// router.get('/:id', get.getNft);
// router.post('/', post.createNft);
// router.put('/:id', put.updateNft);
// router.delete('/:id', del.deleteNft);

// module.exports = router;

module.exports = { get, post, put, del }