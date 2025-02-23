const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    releaseYear: Number,
    rating: String, 
    genre: {
        name: {type: String, required: true}, 
        description: String
    },
    director: {
        name: {type: String, required: true},
        bio: String,
        birth: String,
        death: String
    },
    actors: [String], 
    imagePath: String,
    duration: String,
    featured: Boolean
});

let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, requiire: true},
    email: {type: String, required: true},
    birthDate: Date,
    favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;