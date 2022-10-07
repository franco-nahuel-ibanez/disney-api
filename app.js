const express = require('express');
const sequelize = require('./src/db');
require('./src/db/asociations');

const app = express();

//database connection
sequelize.sync()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

const port = process.env.PORT || 3000;

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//routes
app.use('/api/characters', require('./src/routes/characters.routes'));
app.use('/api/movies', require('./src/routes/movies.routes'));
app.use('/api/genres', require('./src/routes/genre.routes'));


module.exports = app;