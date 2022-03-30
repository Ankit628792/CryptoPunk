const express = require('express');
const router = express();

const get = require('./get');
const post = require('./post');
const put = require('./put');
const del = require('./delete');

// router.get('/', get.getAllUsers);
// router.get('/:id', get.getUser);
// router.post('/', post.createUser);
// router.put('/:id', put.updateUser);
// router.delete('/:id', del.deleteUser);

module.exports = { get, post, put, del };