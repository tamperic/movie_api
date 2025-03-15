const express = require('express'), // A backend framework for building RESTful API with Node.js
    morgan = require('morgan'),
    bodyParser = require('body-parser'), 
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    { check, validationResult } = require('express-validator'); // Library with validation methods on backend for different types of inputted data

const Movies = Models.Movie; 
const Users = Models.User;

mongoose.connect(process.env.CONNECTION_URI) // Load the URI from environment variable
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// mongoose.connect('mongodb://localhost:27017/movieFetcherDB')
//  .then(() => console.log('MongoDB connected'))
//  .catch((err) => console.log('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Get static file 'documentation.html'

const cors = require('cors');
app.use(cors()); // By default set to allow requests from all origins 

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

// Welcome message
app.get('/', async (req, res) => {
    return res.send('Welcome to MovieFetcher Application!');
});

// MOVIES

// Get the list of data about all movies
// app.get('/movies', passport.authenticate('jwt', {session: false}), async (req, res) => {
  app.get('/movies', async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

// Add new movie
app.post('/movies', passport.authenticate('jwt', {session: false}), 
    [
        check('title', 'Title contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('title', 'Title is required').isLength({min: 2}),
        check('description', 'Description contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('description', 'Description is required.').not().isEmpty(),
        check('genre', 'Genre contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('genre', 'Name of genre is required.').not().isEmpty(),
        check('director', 'Director contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('director', 'Name of director is required.').not().isEmpty()
    ], async (req, res) => {
    await Movies.findOne({title: req.body.title}) // If a movie under requested title already exists
    .then((movie) => {
        if(movie) {
            res.status(400).send('Movie with title "' + req.body.title + '" already exists.');
        } else {
            Movies.create({
                title: req.body.title,
                description: req.body.description,
                'genre.name': req.body.genre,
                'director.name': req.body.director
            })
            .then()
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Get the all data about a single movie by title
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.findOne({title: { $regex: new RegExp(req.params.title, 'i') }})
        .then((movie) => {
            if (!movie) {
                res.status(404).send('Movie "' + req.params.title + '" was not found.')
            } else {
                res.status(200).json(movie);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

// Get the data about a genre by name
app.get('/movies/genre/:genreName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.find({ 'genre.name': { $regex: new RegExp(req.params.genreName, 'i') }})
        .then((movie) => {
            if (!movie) {
                res.status(404).send('Genre ' + req.params.genreName + ' was not found.')
            } else {
                const genres = movie.map(movie => ({...movie.genre, title: movie.title}));
                res.status(200).json(genres);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

// Get the all data about a director by name
app.get('/movies/director/:directorName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.find({ 'director.name': { $regex: new RegExp(req.params.directorName, 'i') }})
    .then((movie) => {
        if (!movie) {
            res.status(404).send('Director ' + req.params.directorName + ' was not found.')
        } else {
            const directors = movie.map(movie => ({...movie.director, title: movie.title}));
            res.status(200).json(directors);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Get a movie by actor
app.get('/movies/actors/:actorName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.find({ actors: { $regex: new RegExp(req.params.actorName, 'i') }})
    .then((movie) => {
        if (!movie) {
            res.status(404).send('Actor ' + req.params.actorName + ' was not found.')
        } else {
            const actors = movie.map(movie => ({actor: req.params.actorName, title: movie.title}));
            res.status(200).json(actors);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Get a movie by release year
app.get('/movies/releaseYear/:year', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.find({ releaseYear : req.params.year})
    .then((movie) => {
        if (!movie) {
            res.status(404).send('Movie released in ' + req.params.year + ' year was not found.')
        } else {
            res.status(200).json(movie);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Get a movie by rating
app.get('/movies/rating/:ratingNumber', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.find({ rating : req.params.ratingNumber})
    .then((movie) => {
        if (!movie) {
            res.status(404).send('Movie with rating ' + req.params.ratingNumber + ' was not found.')
        } else {
            res.status(200).json(movie);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Add new actor 
app.post('/movies/:title/:actorName', passport.authenticate('jwt', {session: false}), async (req, res)  => {
    await Movies.findOneAndUpdate({title: req.params.title}, {$push:
        {actors: req.params.actorName}
    },
    {new: true}) // Make sure that the updated document is returned
    .then((updatedMovie) => {
        res.status(200).json(updatedMovie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Delete a certain actor 
app.delete('/movies/:title/:actorName', passport.authenticate('jwt', {session: false}), async (req, res)  => {
    await Movies.findOneAndUpdate({title: req.params.title}, {$pull:
        {actors: req.params.actorName}
    },
    {new: true}) // Make sure that the updated document is returned
    .then((updatedMovie) => {
        res.status(200).json(updatedMovie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Delete a certain movie by title
app.delete('/movies/:title', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Movies.findOneAndDelete({title: req.params.title})
    .then((movie) => {
        if(!movie) {
            res.status(404).send('Movie doesn\'t exist.')
        } else {
            res.status(200).send('Movie was deleted.')
        }  
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
})

// USERS

//Get all users
app.get('/users', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.find()
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Get a user by username
app.get('/users/:username', passport.authenticate('jwt', {session: false}), async (req, res) => {
    await Users.findOne({username: req.params.username})
    .then((user) => {
        if(!user) {
            res.status(404).send('User ' + req.params.username + ' doesn\'t exist.')
        } else {
            res.status(200).json(user);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// Add (register) new users
app.post('/users', 
    [
        check('username', 'Username is required').isLength({min: 5}),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required.').not().isEmpty(),
        check('email', 'Email does not appear to be valid.').isEmail()
    ], async (req, res) => {
        // Check the validation object for errors
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let hashedPassword = Users.hashPassword(req.body.password);
        await Users.findOne({username: req.body.username}) // If a user with the requested username already exists
        .then((user) => {
            if(user) {
                res.status(400).send('User ' + req.body.username + ' already exists.')
            } else {
                Users.create({
                        username: req.body.username,
                        password: hashedPassword,
                        email: req.body.email,
                        birthDate: req.body.birthDate
                    })
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).send('Error: ' + err);
                    })
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
    }
);

// Update a user's information, by username
app.put('/users/:username', passport.authenticate('jwt', {session: false}), 
    [
        check('username', 'Username is required').isLength({min: 5}),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required.').not().isEmpty(),
        check('email', 'Email does not appear to be valid.').isEmail()
    ], async (req, res)  => {
        // Check the validation object for errors
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Condition to check match between username in URL param. and username of currently authenticated user
        if(req.user.username !== req.params.username){
            return res.status(400).send('Permission denied.');
        }
        // Condition ends
        let hashedPassword = Users.hashPassword(req.body.password);
        await Users.findOneAndUpdate({username: req.params.username}, {$set:
            {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                birthDate: req.body.birthDate
            }
        }, {new: true}) // Make sure that the updated document is returned
        .then((updatedUser) => {
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
    }
);

// Add a movie to the user's favorites list
app.post('/users/:username/movies/:movieID', passport.authenticate('jwt', {session: false}), async (req, res)  => {
    await Users.findOneAndUpdate({username: req.params.username}, {$push:
        {favoriteMovies: req.params.movieID}
    },
    {new: true}) // Make sure that the updated document is returned
    .then((updatedUser) => {
        res.status(201).json(updatedUser)
    })
   .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }) 
});

// Delete a movie from user's list of favorites
app.delete('/users/:username/movies/:movieID', passport.authenticate('jwt', {session: false}), async (req, res)  => {
    await Users.findOneAndUpdate({username: req.params.username}, {$pull:
        {favoriteMovies: req.params.movieID}
    },
    {new: true}) // Make sure that the updated document is returned
    .then((updatedUser) => {
        res.status(200).json(updatedUser)
    })
   .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }) 
});

// Delete user's account (deregester) by username
app.delete('/users/:username', passport.authenticate('jwt', {session: false}), async (req, res)  => {
    await Users.findOneAndDelete({username: req.params.username})
    .then((user) => {
        if(!user) {
            res.status(404).send('User ' + req.params.username + ' was not found.')
        } else {
            res.status(200).send('User ' + req.params.username + ' was deleted.')
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }) 
});

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('App is listening on Port ' + port);
});