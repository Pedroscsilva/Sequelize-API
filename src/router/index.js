const authRouter = require('./auth.router');
const userRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const postsRouter = require('./posts.router');

module.exports = {
  authRouter,
  userRouter,
  categoriesRouter,
  postsRouter,
};