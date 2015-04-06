var should = require('should');

var annotationModule = require('../../index.js');

var mockPath = './mock.js';


describe('module exposing an object', function(){

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

        it('should have the module reference', function(){
            result.module.ref.should.be.equal(require('./mock.js'));
        });

        it('should have the module name', function(){
            result.module.name.should.be.equal('mock');
        });
    });

    describe('function: functionWithSingleLineAnnotation', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionWithSingleLineAnnotation');
        });

        it('should get the annotation', function(){
            result.functions.functionWithSingleLineAnnotation.annotations.should.have.property('SingleLine');
        });

        it('should have the function reference', function(){
            result.functions.functionWithSingleLineAnnotation.ref().should.be.equal('SingleLine');
        });
    });

    describe('function: functionWithMultipleLineAnnotation', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionWithMultipleLineAnnotation');
        });

        it('should get the annotation', function(){
            result.functions.functionWithMultipleLineAnnotation.annotations.should.have.property('MultipleLine');
        });

        it('should have the function reference', function(){
            result.functions.functionWithMultipleLineAnnotation.ref().should.be.equal('MultipleLine');
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

        it('should have the function reference', function(){
            result.functions.functionWithALotOfAnnotation.ref().should.be.equal('ALot');
        });
    });

    describe('function: functionWithoutAnnotation', function(){

        it('should be set', function(){
            result.functions.should.have.property('functionWithoutAnnotation');
        });

        it('should have no annotations', function(){
            result.functions.functionWithoutAnnotation.annotations.should.be.empty;
        });

        it('should have the function reference', function(){
            result.functions.functionWithoutAnnotation.ref().should.be.equal('Nothing');
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

        it('should have the function reference', function(){
            result.functions.functionAnnotationWithArgument.ref().should.be.equal('WithArgument');
        });
    });
});
