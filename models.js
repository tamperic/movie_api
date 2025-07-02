/** Import required packages */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


/**
 * Movie Schema
 * @typedef {Object} Movie
 * @property {String} title - Movie title (required)
 * @property {String} description - Description of the movie (required)
 * @property {Number} [releaseYear] - Year the movie was released
 * @property {String} [rating] - Movie rating (e.g., PG-13, R)
 * @property {Object} genre - Genre information
 * @property {String} genre.name - Genre name (required)
 * @property {String} [genre.description] - Genre description
 * @property {Object} director - Director information
 * @property {String} director.name - Director name (required)
 * @property {String} [director.bio] - Biography of the director
 * @property {String} [director.birth] - Director's birth date
 * @property {String} [director.death] - Director's death date
 * @property {Array.<String>} [actors] - List of actor names
 * @property {String} [imagePath] - Path to movie image/poster
 * @property {String} [duration] - Duration of the movie 
 * @property {Boolean} [featured] - If the movie is featured
 */
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


/**
 * User Schema
 * @typedef {Object} User
 * @property {String} username - Unique username (required)
 * @property {String} password - Hashed password (required)
 * @property {String} email - User email (required)
 * @property {Date} [birthDate] - Date of birth
 * @property {Array.<mongoose.ObjectId>} [favoriteMovies] - List of favorite movie IDs
 */
let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    birthDate: Date,
    favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});


/**
 * Hashes a submitted plain-text password and then stores it in the database
 * @function
 * @name hashPassword
 * @memberof User
 * @param {String} password - Plain-text password
 * @returns {String} Hashed password
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};


/**
 * Compares the submitted hashed password with the hashed passwords stored in database
 * @function
 * @name validatePassword
 * @memberof User
 * @param {String} password - Plain-text password input
 * @returns {Boolean} If the passwords match
 */
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


// Create Mongoose models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);


// Export the models
module.exports.Movie = Movie;
module.exports.User = User;