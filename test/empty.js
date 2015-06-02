var should = require('should');

var annotationModule = require('../index.js');

var mockPath = './fixtures/emptyMock.js';

describe('empty module', function() {

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

        it('should have gone well', function(){
            should.ifError(err);
        });

        it('should have the module name', function(){
            result.module.name.should.be.equal('emptyMock');
        });

        it('module annotations should be empty', function(){
            result.module.annotations.should.be.empty;
        });

        it('ref should be the empty module', function(){
            result.module.ref.should.be.equal(require(mockPath));
        });

        it('functions should be empty', function(){
            result.functions.should.be.empty;
        });
    });




    describe('synchronous', function() {

        var err;
        var result;

        before(function(){

            try {
                result = annotationModule.sync(mockPath);
            } catch (e) {
                err = e;
            }
        });

        it('should have gone well', function(){
            should.ifError(err);
        });

        it('should have the module name', function(){
            result.module.name.should.be.equal('emptyMock');
        });

        it('module annotations should be empty', function(){
            result.module.annotations.should.be.empty;
        });

        it('ref should be the empty module', function(){
            result.module.ref.should.be.equal(require(mockPath));
        });

        it('functions should be empty', function(){
            result.functions.should.be.empty;
        });
    });


});
