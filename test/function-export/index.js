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

    describe('module', function(){
        it('should have gone well', function(){
            should.ifError(err);
        });

        it('should have the module name', function(){
            result.module.name.should.be.equal('mock');
        });
    });


    describe('function: firstFunction', function(){

        it('should have the first annotation', function(){
            result.functions.firstFunction.annotations.should.have.property('first');
        });

        it('should have the function reference', function(){
            result.functions.firstFunction.ref().should.be.equal('first');
        });
    });

    describe('function: secondFunction', function(){

        it('should have the second annotation', function(){
            result.functions.secondFunction.annotations.should.have.property('second');
        });

        it('should have the function reference', function(){
            result.functions.secondFunction.ref().should.be.equal('second');
        });
    });
});
