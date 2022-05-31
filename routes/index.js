const express = require('express');

const indexRouter = express.Router();

const userRouter = require('./users');
const articleRouter = require('./articles');

indexRouter.use('/users', userRouter);
indexRouter.use('/articles', articleRouter);

module.exports = indexRouter;
