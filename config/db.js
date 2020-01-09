const mongoose = require('mongoose');
const db = 'mongodb+srv://admin:ir10etTFL4R4n20l@my-projects-41x9h.mongodb.net/CRM_APP?retryWrites=true&w=majority';

const connectDB = async () => {
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