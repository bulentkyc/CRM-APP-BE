const connectDB = async () => {
//We moved constants here to don't load again env variables.
const mongoose = require('mongoose');
//require('dotenv').config();
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@my-projects-41x9h.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    console.log(db);
    console.log(`${process.env.DB_USER} 
    ${process.env.DB_PASS}
    ${process.env.DB_NAME}
    `);
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Mongo Atlas server is ready');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;