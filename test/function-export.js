var should = require('should');

var annotationModule = require('../index.js');

var mockPath = './fixtures/functionsMock.js';


describe('module exposing functions', function(){

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

        describe('module', function(){
            it('should have gone well', function(){
                should(err).not.be.an.Error;
            });

            it('should have the module name', function(){
                result.module.name.should.be.equal('functionsMock');
            });
        });


        describe('function: firstFunction', function(){

            it('should have the first annotation', function(){
                result.functions.firstFunction.annotations.should.have.property('first');
            });

            it('should have the first rawAnnotation', function(){
                result.functions.firstFunction.rawAnnotations.should.have.property('first', ['first()']);
            })

            it('should have the function reference', function(){
                result.functions.firstFunction.ref().should.be.equal('first');
            });
        });

        describe('function: secondFunction', function(){

            it('should have the second annotation', function(){
                result.functions.secondFunction.annotations.should.have.property('second');
            });

            it('should have the second rawAnnotation', function(){
                result.functions.secondFunction.rawAnnotations.should.have.property('second', ['second()']);
            });

            it('should have the function reference', function(){
                result.functions.secondFunction.ref().should.be.equal('second');
            });
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

        describe('module', function(){
            it('should have gone well', function(){
                should(err).not.be.an.Error;
            });

            it('should have the module name', function(){
                result.module.name.should.be.equal('functionsMock');
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
});
