const express = require('express'), // Import express framework
    morgan = require('morgan'), // Import morgan logging middleware
    bodyParser = require('body-parser'), 
    uuid = require('uuid');

const app = express();


// Middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public')); // Get static file 'documentation.html'

let users = [
    {
        id: 1,
        name: 'Maria',
        favoriteMovies: ['Harry Potter and the Goblet of Fire']
    }, 
    {
        id: 2,
        name: 'Ben',
        favoriteMovies: []
    },
];
let movies = [
    {
        'title': 'Harry Potter and the Goblet of Fire', 
        'description': 'In his fourth year at Hogwarts, Harry Potter competes alongside young wizards from faraway schools in the treacherous Tri-Wizard Tournament.',
        'genre': {
            'name': 'Family Movie',
            'description': 'Family Movie is a film genre that generally relates to children in the context of home and family. Children\'s films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind. Children\'s films come in several major genres like realism, fantasy, adventure, war, musicals, comedy, and literary adaptations.'
        },
        'year': 2005,
        'duration': '2h 37m',
        'director': {
            'name': 'Mike Newell',
            'bio': 'Michael Cormac "Mike" Newell is an English director and producer of motion pictures for the screen and for television. After the release of Harry Potter and the Goblet of Fire in 2005, Newell became the third most commercially successful British director in recent years.',
            'birth': '28 Mar 1942'
        },
        'actors': ['Daniel Radcliffe', 'Emma Watson', 'Rupert Grint'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'Charlie and the Chocolate Factory', 
        'description': 'The eccentric Willy Wonka opens the doors of his candy factory to five lucky kids who learn the secrets behind his amazing confections.',
        'genre': {
            'name': 'Family Movie',
            'description': 'Family Movie is a film genre that generally relates to children in the context of home and family. Children\'s films are made specifically for children and not necessarily for a general audience, while family films are made for a wider appeal with a general audience in mind. Children\'s films come in several major genres like realism, fantasy, adventure, war, musicals, comedy, and literary adaptations.'
        },
        'year': 2005,
        'duration': '1h 54m',
        'director': {
            'name': 'Tim Burton',
            'bio': 'Timothy Walter Burton is an American film director, producer, screenwriter, and animator. Known for popularizing Goth culture in the American film industry, Burton is famous for his gothic horror and dark fantasy films.',
            'birth': '25 Aug 1958'
        },
        'actors': ['Johnny Depp', 'Freddie Highmore', 'David Kelly'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'Memoirs of a Geisha', 
        'description': 'Sold to a geisha house as a child, a fisherman\'s daughter becomes the most sought-after geisha in Kyoto, but rivalries threaten the destiny she desires.',
        'genre': {
            'name': 'Drama',
            'description': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. The drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy).'
        },
        'year': 2005,
        'duration': '2h 25m',
        'director': {
            'name': 'Rob Marshall',
            'bio': 'Robert Doyle Marshall Jr. is an American film and theater director, producer, and choreographer. He is best known for directing the film version of the Broadway musical Chicago, which was based on the play of the same name by playwright Maurine Dallas Watkins. He also directed the films Memoirs of a Geisha, Pirates of the Caribbean: On Stranger Tides, Into the Woods, Mary Poppins Returns, and the Disney live-action remake The Little Mermaid.',
            'birth': '17 Oct 1960'
        },
        'actors': ['Zhang Ziyi', 'Ken Watanabe', 'Koji Yakusho'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'John Wick', 
        'description': 'When a gangster\'s son steals his car and kills his dog, fearless ex-assassin John Wick takes on the entire mob to get his revenge.',
        'genre': {
            'name': 'Action',
            'description': 'The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
        },
        'year': 2014,
        'duration': '1h 41m',
        'director': {
            'name': 'Chad Stahelski',
            'bio': 'Charles F. Stahelski is an American stuntman and filmmaker. He is considered a highly-influential figure in the action film genre. He first achieved prominence as a stunt performer and coordinator, notably as the key stunt double for Keanu Reeves on The Matrix (1999), and as the martial arts stunt coordinator on its first two sequels. He subsequently directed the 2014 film John Wick, starring Reeves, and its three sequels.',
            'birth': '20 Sep 1968'
        },
        'actors': ['Keanu Reeves', 'Michael Nyqvist', 'Alfie Allen'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'Nowhere', 
        'description': 'Pregnant, alone and drifting in the sea, a woman trapped in a shipping container tries to survive after fleeing a devastated totalitarian country.',
        'genre': {
            'name': 'Drama',
            'description': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. The drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy).'
        },
        'year': 2023,
        'duration': '1h 49m',
        'director': {
            'name': 'Albert Pintó',
            'bio': 'Albert Pintó Pérez was born in Terrassa, Barcelona, Catalonia, Spain. He is a director and writer, known for Nowhere (2023), Berlin (2023) and Money Heist (2017).',
            'birth': '28 Oct 1985'
        },
        'actors': ['Anna Castillo', 'Tamar Novas', 'Tony Corvillo'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'The Hangover', 
        'description': 'A bachelor party in Las Vegas spins out of control when the groom goes missing and his three buddies can\'t remember the debauchery from the night before.',
        'genre': {
            'name': 'Comedy',
            'description': 'The comedy film is a film genre that emphasizes humor. These films are designed to amuse audiences and make them laugh. Films in this genre typically have a happy ending, with dark comedy being an exception to this rule. Comedy is one of the oldest genres in film, and it is derived from classical comedy in theatre.'
        },
        'year': 2009,
        'duration': '1h 39m',
        'director': {
            'name': 'Todd Phillips',
            'bio': 'Todd Phillips (born Todd Philip Bunzl) is an American filmmaker. Phillips began his career in 1993 and directed films in the 2000s such as "Road Trip", "Old School", "Starsky & Hutch", and "School for Scoundrels". He came to wider prominence in the early 2010s for directing "The Hangover" film series. In 2019, he co-wrote and directed the psychological thriller film "Joker", based on the "DC Comics" character of the same name, which premiered at the 76th Venice International Film Festival where it received the top prize, the Golden Lion. ',
            'birth': '20 Dec 1970'
        },
        'actors': ['Bradley Cooper', 'Ed Helms', 'Zach Galifianakis'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'The Conjuring', 
        'description': 'After moving into a Rhode Island farmhouse, a family experiences supernatural occurrences and seeks help from a pair of noted paranormal investigators.',
        'genre': {
            'name': 'Horror',
            'description': 'Horror films are centered around the dark side of life, the forbidden and strange, unexplainable events. They deal with our most primal nature and it\'s fears: our vulnerability, nightmares, alienation, our terror of the unknown, fear of death and/or our fear of sexuality.'
        },
        'year': 2013,
        'duration': '1h 51m',
        'director': {
            'name': 'James Wan',
            'bio': 'James Wan is an Australian filmmaker. He has primarily worked in the horror genre as the co-creator of the "Saw" and "Insidious franchises" and the creator of "The Conjuring Universe". The lattermost is the highest-grossing horror franchise at over $2 billion. Wan is also the founder of film and television production company Atomic Monster.',
            'birth': '26 Feb 1977'
        },
        'actors': ['Vera Farmiga', 'Patrick Wilson', 'Lili Taylor'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'The Godfather', 
        'description': 'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son, Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
        'genre': {
            'name': 'Crime',
            'description': 'Crime film, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film, but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir.'
        },
        'year': 1972,
        'duration': '2h 55m',
        'director': {
            'name': 'Francis Ford Coppola',
            'bio': 'Francis Ford Coppola is an American filmmaker. He is considered one of the leading figures of the New Hollywood and one of the greatest directors of all time. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d\'Or and a BAFTA Award.',
            'birth': '7 Apr 1939'
        },
        'actors': ['Marlon Brando', 'Al Pacino', 'James Caan'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        "title": 'Blood Red Sky', 
        "description": 'When a group of terrorists hijacks an overnight transatlantic flight, a mysteriously ill woman must unleash a monstrous secret to protect her young son.',
        'genre': {
            'name': 'Horror',
            'description': 'Horror films are centered around the dark side of life, the forbidden and strange, unexplainable events. They deal with our most primal nature and it\'s fears: our vulnerability, nightmares, alienation, our terror of the unknown, fear of death and/or our fear of sexuality.'
        },
        'year': 2021,
        'duration': '2h 3m',
        'director': {
            'name': 'Peter Thorwarth',
            'bio': 'Peter Thorwarth was born on June 3, 1971 in Dortmund, North Rhine-Westphalia, Germany. He is a writer and director, known for "Die Welle" (2008), "Was nicht paßt, wird passend gemacht" (1997) and "Blood Red Sky" (2021). He is married to Nele Kiper. They have one child.',
            'birth': '3 Jun 1971'
        },
        'actors': ['Peri Baumeister', 'Alexander Scheer', 'Kais Setti'],
        'image': 'https://placehold.co/600x400/png'
    },
    {
        'title': 'Step Brothers', 
        'description': 'Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.',
        'genre': {
            'name': 'Comedy',
            'description': 'The comedy film is a film genre that emphasizes humor. These films are designed to amuse audiences and make them laugh. Films in this genre typically have a happy ending, with dark comedy being an exception to this rule. Comedy is one of the oldest genres in film, and it is derived from classical comedy in theatre.'
        },
        'year': 2008,
        'duration': '1h 38m',
        'director': {
            'name': 'Adam McKay',
            'bio': 'Adam McKay is an American screenwriter, producer, and director. McKay began his career as a head writer for the NBC sketch comedy show "Saturday Night Live (SNL)" from 1995 to 2001. After leaving "SNL", McKay co-wrote with comedian Will Ferrell on his comedy films "Anchorman: The Legend of Ron Burgundy" (2004), "Talladega Nights: The Ballad of Ricky Bobby" (2006), and "The Other Guys" (2010). Ferrell and McKay later co-wrote and co-produced many television series and films, with McKay himself co-producing their website "Funny or Die" through their company, "Gary Sanchez Productions".',
            'birth': '17 Apr 1968'
        },
        'actors': ['Will Ferrell', 'John C. Reilly', 'Mary Steenburgen'],
        'image': 'https://placehold.co/600x400/png'
    },
]

// MOVIES

// Get the list of data about all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});


// Get the all data about a single movie by title
app.get('/movies/:title', (req, res) => {
    const movie = movies.find( movie => movie.title.toLowerCase() === req.params.title.toLowerCase()); // Allow case-insensitive searches

    // Check if movie exists
    if (!movie) {
        return res.status(404).send('Movie not found.');
    }

    res.json(movie);
});

// Get the data about a genre by name
app.get('/movies/genre/:genreName', (req, res) => {
    const movie = movies.find( movie => movie.genre.name.toLowerCase() === req.params.genreName.toLowerCase());

    // Check if genre exists
    if(!movie) {
        return res.status(404).send('Genre not found.');
    }

    res.json(movie.genre);
});

// Get the all data about a director by name
app.get('/movies/director/:directorName', (req, res) => {
    const movie = movies.find( movie => movie.director.name.toLowerCase() === req.params.directorName.toLowerCase());

    // Check if director exists
    if(!movie) {
        return res.status(404).send('Director not found.');
    }

    res.json(movie.director);
});


// USERS

// Add (register) new users
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    } else {
        res.status(400).send('Name needed in request body!');
    }
});

// Update (change) username
app.put('/users/:id', (req, res)  => {
    const { id } = req.params;
    const newUsername = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = newUsername.name;
        res.status(200).send('Username successfully updated!');
    } else {
        res.status(400).send('New username could not be updated!');
    }
});

// Add a movie to the user's favorites list
app.post('/users/:id/:newFavMovie', (req, res)  => {
    const { id, newFavMovie } = req.params;
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(newFavMovie);
        res.status(200).send('New favorite movie successfully added!');
    } else {
        res.status(400).send('New favorite movie could not be added!');
    }
});

// Delete a movie from user's list of favorites
app.delete('/users/:id/:newFavMovie', (req, res)  => {
    const { id, newFavMovie } = req.params;
    let user = users.find( user => user.id == id );

    // Check if user exists
    if (!user) {
        return res.status(404).send('User not found!');
    }
    const movieIndex = user.favoriteMovies.indexOf(newFavMovie);

    if(movieIndex !== -1) {
        user.favoriteMovies.splice(movieIndex, 1); // Properly remove the movie from the favoriteMovie array
        res.status(200).send(newFavMovie + ' successfully removed from the favorites list!');
    } else {
       return res.status(400).send('Movie not found in favorites!');
    }
});

// Delete user's account (deregester)
app.delete('/users/:id', (req, res)  => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id == id );

    if(userIndex === -1) {
        return res.status(404).send('User not found!');
    }
    users.splice(userIndex, 1); // Properly remove the user from the array
    res.status(200).send('User with ID ' + id + ' successfully deleted!');
});

// Listen for requests
app.listen(8080, () => {
    console.log('App is listening on port 8080.');
});