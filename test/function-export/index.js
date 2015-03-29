var should = require('should');

var annotationModule = require('../../index.js');

var mockPath = './test/function-export/mock.js';


describe('module exposing functions', function(){

    var err;
    var result;

    before(function(done){
        annotationModule(mockPath, function(e, a){
            err = e;
            result = a;

            done();
        });
    });

    describe('global result', function(){
        it('should have gone well', function(){
            should.ifError(err);
            should(result).not.be.equal(undefined);
        });
    });


    describe('function: firstFunction', function(){

        it('should have get the first annotation', function(){
            result.functions.firstFunction.annotations.should.have.property('first');
        });

        it('should have the function reference', function(){
            result.functions.firstFunction.ref().should.be.equal('first');
        });
    });

    describe('function: secondFunction', function(){

        it('should have get the second annotation', function(){
            result.functions.secondFunction.annotations.should.have.property('second');
        });

        it('should have the function reference', function(){
            result.functions.secondFunction.ref().should.be.equal('second');
        });
    });
});
