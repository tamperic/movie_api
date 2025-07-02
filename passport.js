// Import Passport core, local strategy, and JWT strategy
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,  // Handles login with username and password
    Models = require('./models.js'),                    // Import Mongoose models
    passportJWT = require('passport-jwt');              // For handling JWT authentication


// Destructure User model from imported models
let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,         // Strategy for verifying JWTs
    ExtractJWT = passportJWT.ExtractJwt;        // Helper to extract JWT from request headers


/**
 * Local Strategy for username/password login
 * This is used during login to verify credentials manually
 */  
passport.use(new LocalStrategy(
        {
            usernameField: 'username',          // Field name in the request body for username
            passwordField: 'password'           // Field name in the request body for password
        },
        async (username, password, callback) => {
            // console.log(`${username} ${password}`);

            // Look for the user in the database
            await Users.findOne({username: username})
            .then((user) => {
                if(!user) {
                    // No user found with that username or password
                    console.log('incorrect username');
                    return callback(null, false, {message: 'Incorrect username or password.'});
                }

                /**
                 * Validate password using method defined in the schema.
                 * Checks if entered user's password is validated (if it machtes the password stored in db).
                 */
                if (!user.validatePassword(password)) {
                    console.log('incorrect password.');
                    return callback(null, false, {message: 'Incorrect password.'});
                } 

                // Valid credentials, return user
                console.log('finished');
                return callback(null, user);
            })
            .catch((error) => {
                if(error) {
                    console.log(error);
                    return callback(error); // Return DB or server error
                }
            })
        }
));


/**
 * JWT Strategy for verifying JWT token on protected routes.
 * Used after login, when client sends JWT in Authorization header.
 */
passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),        // Extract the JWT from the Authorization header as a Bearer token
        secretOrKey: 'your_jwt_secret'          // Secret key used to verify the signature of the JWT. Must be same as 'jwtSecret' in auth.js.
    }, 
    async (jwtPayload, callback) => {
        return await Users.findById(jwtPayload._id)         // Look up user by ID stored in JWT payload
        .then((user) => {
            return callback(null, user);            // Attach the user to the request
        })
        .catch((error) => {
            return callback(error);         // Return DB or server error
        });
    }
));