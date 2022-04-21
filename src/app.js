const express = require('express');
//for including the env
require('dotenv').config();
const mongooseConfig = require('./config/mongoose');
const userAuthRoutes = require('./routes/userAuth.routes');
const noteRoutes = require('./routes/note.routes');

const bodyParser = require('body-parser')
const app = express();
const port = process.env.APP_PORT;
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('WELCOME TO API HOME.'));
app.use('/api/v1/auth', userAuthRoutes);
app.use('/api/v1/note', noteRoutes);
app.use(express.static(`${__dirname}/uploads`));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        },
    });
});
async function dbConnect() {
    try {
        await mongooseConfig.connectToServer();
        // saleforceClientQueue.queue.add({ date: new Date() });
        console.log('connected now to mongo db');
    } catch (error) {
        console.log('error in mongo connection', error);
    }
}

dbConnect();
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});