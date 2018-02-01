'user strict'
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const note=require('./router/note');
const game=require('./router/game');
const user=require('./router/user');
const log=require('./router/log');

note(router);
game(router);
user(router);
log(router);

module.exports = router;


