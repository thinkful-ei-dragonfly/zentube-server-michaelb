const express = require('express')
const postsService = require('./posts-service')
const { requireAuth } = require('../middleware/jwt-auth')

const postsRouter = express.Router()

postsRouter
  .route('/')
  .get((req, res, next) => {
    postsService.getAllPosts(req.app.get('db'))
      .then(posts => {
        res.json(posts.map(postsService.serializePost))
      })
      .catch(next)
  })

postsRouter
  .route('/:post_id')
  .all(requireAuth)
  .all(checkPostExists)
  .get((req, res) => {
    res.json(postsService.serializePost(res.post))
  })

postsRouter.route('/:post_id/comments/')
  .all(requireAuth)
  .all(checkPostExists)
  .get((req, res, next) => {
    postsService.getCommentsForPost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(comments => {
        res.json(comments.map(postsService.serializePostComment))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkPostExists(req, res, next) {
  try {
    const post = await postsService.getById(
      req.app.get('db'),
      req.params.post_id
    )

    if (!post)
      return res.status(404).json({
        error: `post doesn't exist`
      })

    res.post = post
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = postsRouter
