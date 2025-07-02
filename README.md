# 🎬 MovieFetcher - Movie API

This is the backend project for a **movie database API** built with **Node.js**, **Express**, and **MongoDB**. It allows users to create or delete an account, log in, view list of all movies, get detailed information about movies, directors, genres, as well as to manage their favorite movies.

---

## 📦 Tech Stack

- **Node.js** - a JavaScript runtime used to build the server-side logic of the application.
- **MongoDB** with **Mongoose** - a NoSQL database used to store user and movie data, with Mongoose providing a schema-based modeling interface.
- Middlwares: **Morgan** - a logging middleware that outputs HTTP request details to the console for easy monitoring and debugging, **bodyParser** and **Express.js** - middlewares used to parse incoming request bodies (JSON and form data) so the server can access client input.
- **Passport.js** (Local and JWT Strategies) - handle user authentication securely.
- **Bcrypt** - a library used to hash user passwords before storing them in the database.
- **JSDoc** - for a clean documentation from code comments.
- **Express-Validator** - for an user's input validation.
- **Postman** - a tool used to test and visualize HTTP requests and responses during API development.
- **Heroku** - a cloud platform used to deploy and host the backend server so it's accessible online.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tamperic/movie_api.git
cd movie_api
```

### 2. Install Dependencies 

```bash 
npm install
```
or
```bash 
yarn install
```

### 3. Start the sSrver
```bash 
npm start
```

---

## 📘 API Endpoints

### 🔐 Login Endpoint
| Method        | Endpoint                  | Description                                     |
|---------------|---------------------------|-------------------------------------------------|
| **POST**      | `/login`                  | Authenticate user credentials and return a JWT  |


### 🎥 Movies Endpoints
| Method        | Endpoint                        | Description                   |
|---------------|---------------------------------|-------------------------------|
| **GET**       | `/movies`                       | Get all movies                |
| **POST**      | `/movies`                       | Adds a new movie to the DB    |
| **GET**       | `/movies/:title`                | Get a movie by title          |
| **GET**       | `/movies/genre/:genreName`      | Get movies by genre           |
| **GET**       | `/movies/director/:directorName`| Get movies by director        |
| **GET**       | `/movies/actors/:actorName`     | Get movies by actor           |
| **GET**       | `/movies/releaseYear/:year`     | Get movies by release year    |
| **GET**       | `/movies/rating/:ratingNumber`  | Get movies by rating          |
| **POST**      | `/movies/:title/:actorName`     | Add actor to a movie          |
| **DELETE**    | `/movies/:title/:actorName`     | Delete actor from a movie     |
| **DELETE**    | `/movies/:title`                | Delete a movie by title       |


### 👤 Users Endpoints
| Method        | Endpoint                           | Description                  |
|---------------|------------------------------------|------------------------------|
| **POST**      | `/users`                           | Register a new user          |
| **GET**       | `/users`                           | Get all users                |
| **GET**       | `/users/:username`                 | Get user details             |
| **PUT**       | `/users/:username`                 | Update user details          |
| **DELETE**    | `/users/:username`                 | Delete user account          |
| **POST**      | `/users/:username/movies/:movieID` | Add movie to favorites       |
| **DELETE**    | `/users/:username/movies/:movieID` | Delete movie from favorites  |


