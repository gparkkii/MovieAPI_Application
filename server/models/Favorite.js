const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRuntime: {
        type: String
    }
},{ timestamps: true });

const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports = { Favorite }