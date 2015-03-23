var should = require('should');

var annotationModule = require('../index.js');

var mockPath = './test/mock.js';


describe('annotations of a controllers using module.exports', function(){

    var err;
    var annotations;

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

        it('should get the first annotation', function(){
            result.module.annotations.should.have.property('testModuleMultiline');
        });

        it('should get the second annotation', function(){
            result.module.annotations.should.have.property('testModuleSingleline');
        });

        it('should not get the isolated annotation', function(){
            result.module.annotations.should.not.have.property('Useless');
        });
    });

    describe('function: functionWithSingleLineAnnotation', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionWithSingleLineAnnotation');
        });

        it('should get the annotation', function(){
            result.functions.functionWithSingleLineAnnotation.annotations.should.have.property('SingleLine');
        });
    });

    describe('function: functionWithMultipleLineAnnotation', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionWithMultipleLineAnnotation');
        });

        it('should get the annotation', function(){
            result.functions.functionWithMultipleLineAnnotation.annotations.should.have.property('MultipleLine');
        });
    });

    describe('function: functionWithALotOfAnnotation', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionWithALotOfAnnotation');
        });

        it('should get the first annotation', function(){
            result.functions.functionWithALotOfAnnotation.annotations.should.have.property('Test1');
        });

        it('should get the second annotation', function(){
            result.functions.functionWithALotOfAnnotation.annotations.should.have.property('Test2');
        });

        it('should get the third annotation', function(){
            result.functions.functionWithALotOfAnnotation.annotations.should.have.property('Test3');
        });
    });

    describe('function: functionWithoutAnnotation', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionWithoutAnnotation');
        });

        it('should have no annotations', function(){
            result.functions.functionWithoutAnnotation.annotations.should.be.empty;
        });
    });

    describe('function: functionAnnotationWithArgument', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionAnnotationWithArgument');
        });

        it('should get arguments', function(){
            result.functions.functionAnnotationWithArgument.annotations.should.have.property('Test4');

            result.functions.functionAnnotationWithArgument.annotations.Test4.should.have.length(1);

            should.deepEqual(result.functions.functionAnnotationWithArgument.annotations.Test4[0], ['string', 5, {a: 10}]);
        });
    });
});
