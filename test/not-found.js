var should = require('should');

var annotationModule = require('../index.js');

var mockPath = './fixtures/notfound.js';


describe('module could not be found', function(){

    describe('asynchronous', function() {

        var err;
        var result;

        before(function(done){
            annotationModule(mockPath, function(e, a){
                err = e;
                result = a;

                done();
            });
        });

        it('should return an error', function(){
            should(err).be.an.Error;
        });
    });




    describe('asynchronous', function() {

        var err;
        var result;

        before(function(){

            try {
                result = annotationModule.sync(mockPath);
            } catch (e) {
                err = e;
            }
        });

        it('should return an error', function(){
            should(err).be.an.Error;
        });
    });
});
