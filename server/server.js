//Import dependencies
const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

//Connect to the mongoDB 
mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB is connected!'))
    .catch(err => {
        console.log('DB Connection Error: ${ err.message }');
    });

//Allow parsing on request bodies
app.use(express.json());

//Handle SyntaxError in request here.
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(500).send({ data: "Invalid request data" });
    } else {
        next();
    }
});

//Import routes for api
app.use('/api', require('./app/account/router'));
app.use('/api', require('./app/session/router'));
app.use('/api', require('./app/stats/router'));

//Start the express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is listening on port ", port);
})