const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password: {type: String, required: true},
    email: {type: String, required: true},
    birthDate: Date,
    favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

// Hashing of submitted password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

// Compares submitted hashed password with hashed passwords stored in database
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;