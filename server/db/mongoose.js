const mongoose = require('mongoose');

//Set the DB url
var DB_URL = process.env.DB_URL;
if (process.env.NODE_ENV == 'test') {
    DB_URL = process.env.DB_TEST_URL
}

//Connect to the mongoDB 
mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB is connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${ err.message }`);
    });