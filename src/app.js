const express = require('express');
const { authRouter, userRouter, categoriesRouter } = require('./router');

// ...

const app = express();

app.use(express.json());
app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
