/**
 * Secret key for signing the JWT tokens.
 * This has to be the same key used in the passport JWTStrategy.
 */
const jwtSecret = 'your_jwt_secret';


// Required modules
const jwt = require('jsonwebtoken'),
    passport = require('passport');

// Import local Passport configuration
require('./passport'); 


/**
 * Generates a JWT (JSON Web Token) for the given user
 * @function generateJWTToken
 * @param {Object} user - The user object to encode into the JWT
 * @returns {String} A signed JWT valid for 7 days
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.username,         // This is the username that is encoding in the JWT
        expiresIn: '7d',                // Token will expire in 7 days
        algorithm: 'HS256'              // Algorithm used to "sign" or encode the values of the JWT (to sign the token)
       });
}


/**
 * Logic for authenticating users with basic HTTP authentication and generating a JWT token for authenticating future requests.
 * Handles user login using Passport's local strategy.
 * @route POST /login
 * @param {Object} router - Express router object
 * @returns a JWT if authentication is successful
 * @returns {Error} 400 - if authentication fails
 */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        // Authenticate using Passport's 'local' strategy
        passport.authenticate('local', { session: false }, (error, user, info) => {
             if(error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            // Manually log in the user without starting a session
            req.login(user, { session: false }, (error) => {
                if(error) {
                    res.send(error);
                }
                // Generate JWT from the user object and return it
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);   // Invoke the middleware
    });
}