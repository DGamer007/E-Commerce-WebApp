const express = require('express');
const path = require('path');
const authRouter = require('./routers/server/authRouter');
const userRouter = require('./routers/server/userRouter');
const productRouter = require('./routers/server/productRouter');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

app.use('/api', authRouter, userRouter, productRouter);

app.listen(port, () => {
    console.log('Server is up on PORT ', port);
});