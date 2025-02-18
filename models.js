const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String, 
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String], 
    ImagePath: String,
    Featured: boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, requiire: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

module.export.Movie = Movie;
module.export.User = User;