const mongoose=require('mongoose');
const testDbUrl=require('../config/keys').mongoTest;

before(function(done){

    function clearDb(){
        for(var i in mongoose.connection.collections){
            mongoose.connection.collections[i].deleteOne(function(){});
        }
        done();
    }

    if(mongoose.connection.readyState === 0){
        mongoose.connect(testDbUrl, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true}, function(err){
            if(err){
                throw err;
            }
            return clearDb();
        });
    }
    else
        return clearDb();
});

after(function(done){
    mongoose.connection.db.dropDatabase(function(){
        mongoose.connection.close();
    });
    done();
});