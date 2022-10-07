const Character = require('../models/Character');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');

// 1. Create a new association ManyToMany between Movie and Character
Character.belongsToMany(Movie, {
    through: 'character_movie'
});

Movie.belongsToMany(Character, {
    through: 'character_movie'
});

// 2. Create a new association OneToMany between Genre and Movie
Genre.hasMany(Movie, {as : 'movies', foreignKey: 'genreId'});
Movie.belongsTo(Genre, {as: 'genre'});

