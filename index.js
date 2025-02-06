const express = require('express'), // Import express framework
    morgan = require('morgan'); // Import morgan logging middleware
    morgan = require('morgan'), // Import morgan logging middleware
    bodyParser = require('body-parser'), 
    uuid = require('uuid');

const app = express();


// Middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public')); // Get static file 'documentation.html'


// GET routes

// Get a default welcome message
app.get('/', (req, res) => {
    res.send('Welcome to MovieFether!');
});

// Get top 10 movies
app.get('/movies', (req, res) => {
    const top10Movies = [
        {title: 'The Godfather', year: 1972, duration: '2h 55m'},
        {title: 'The Lord of the Rings: Return of the King', year: 2003, duration: '3h 21m'},
        {title: 'Schindelr\'s List', year: 1993, duration: '3h 15m'},
        {title: 'The Good, the Bad and the Ugly', year: 1966, duration: '2h 28m'},
        {title: 'Forrest Gump', year: 1994, duration: '2h 22m'},
        {title: 'Fight Club', year: 1999, duration: '2h 19m'},
        {title: 'Inception', year: 2010, duration: '2h 28m'},
        {title: 'The Matrix', year: 1999, duration: '2h 16m'},
        {title: 'GoodFellas', year: 1990, duration: '2h 25m'},
        {title: 'Interstellar', year: 2014, duration: '2h 49m'}
    ]
    res.json(top10Movies);
});

// Throw errors at all app-level
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something went wrong!');
});

// Listen for requests
app.listen(8080, () => {
    console.log('App is listening on port 8080.');
});