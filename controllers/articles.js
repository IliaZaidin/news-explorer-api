/* eslint-disable no-console */
const Article = require('../models/articles');
const { NotFoundError } = require('../middlewares/notFoundError');
const { Unauthorized } = require('../middlewares/unauthorizedError');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    if (articles.length === 0) {
      throw new NotFoundError('No articles found on server');
    } else res.send(articles);
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      throw new NotFoundError('Article ID not found');
    } else if (req.user._id !== article.owner.toString()) {
      throw new Unauthorized('Authorization required');
    } else {
      await Article.findByIdAndRemove(article._id.toString());
      res.status(200).send(article);
    }
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    req.body.owner = req.user;
    const article = await Article.create(req.body);
    res.status(201).send(article);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles, deleteArticle, createArticle,
};
