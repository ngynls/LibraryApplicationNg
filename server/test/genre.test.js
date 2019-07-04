require('./settings');
const assert=require('assert');
const Genre=require('../models/genre.model');

describe('Create new genres for testing', function(){
    it('saves a genre to db', function(){
        const newGenre=new Genre({
            genreName: 'Fantasy'
        });
        newGenre.save().then(function(){
            assert(newGenre.isNew === false);
        });
    });
    it('saves another genre to be modified in a later test', function(){
        const genreToBeModified=new Genre({
            genreName: 'Modify this'
        });
        genreToBeModified.save().then(function(){
            assert(genreToBeModified.isNew === false);
        });
    });
    it('saves another genre to be deleted in a later test', function(){
        const genreToBeDeleted=new Genre({
            genreName: 'Delete this'
        });
        genreToBeDeleted.save().then(function(){
            assert(genreToBeDeleted.isNew === false);
        });
    });
});

describe('Read a record from the db', function(){
    it('finds the newly inserted genre (Fantasy) in the db', function(){
        Genre.findOne({genreName: 'Fantasy'}).then(function(result){
            assert(result.genreName === 'Fantasy');
        }).catch(function(err){
            console.log(err);
        });
    });
});

describe('Update a record from the db', function(){
    it('updates Modify this to Thriller', function(){
        Genre.findOneAndUpdate({genreName: 'Modify this'},{genreName: 'Thriller'})
        .then(function(){
            Genre.findOne({genreName: 'Modify this'}).then(function(result){
                assert(result === null);
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    });
});

describe('Delete a record from the db', function(){
    it('deletes the record Delete this', function(){
        Genre.findOneAndDelete({genreName: 'Delete this'}).then(function(){
            Genre.findOne({genreName: 'Delete this'}).then(function(result){
                assert(result === null);
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        })
    });
})

