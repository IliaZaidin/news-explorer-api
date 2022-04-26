const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/validateURL');

const articleRouter = express.Router();
const {
  getArticles, deleteArticle, createArticle,
} = require('../controllers/articles');

articleRouter.get(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getArticles,
);

articleRouter.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().alphanum().hex().length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  deleteArticle,
);

articleRouter.post(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
    }),
  }),
  createArticle,
);

module.exports = articleRouter;
