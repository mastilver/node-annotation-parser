var should = require('should');

var annotationModule = require('../index.js');

var mockPath = './test/mock.js';


describe('module annotations', function(){

    var err;
    var annotations;

    before(function(done){
        annotationModule.getModuleAnnotations(mockPath, function(e, a){
            err = e;
            annotations = a;

            done();
        });
    });


    it('should have gone well', function(){
        should.ifError(err);
    });

    it('should get the first annotation', function(){
        annotations.should.have.property('testModuleMultiline');
    });

    it('should get the second annotation', function(){
        annotations.should.have.property('testModuleSingleline');
    });

    it('should not get the isolated annotation', function(){
        annotations.should.not.have.property('Useless');
    });
});

describe('single line annotations', function(){

    var err;
    var annotations;

    before(function(done){
        annotationModule.getFunctionAnnotations(mockPath, 'functionWithSingleLineAnnotation', function(e, a){
            err = e;
            annotations = a;

            done();
        });
    });

    it('should have gone well', function(){
        should.ifError(err);
    });

    it('should get the annotation', function(){
        annotations.should.have.property('SingleLine');
    });
});

describe('multi line annotations', function(){

    var err;
    var annotations;

    before(function(done){
        annotationModule.getFunctionAnnotations(mockPath, 'functionWithMultipleLineAnnotation', function(e, a){
            err = e;
            annotations = a;

            done();
        });
    });

    it('should have gone well', function(){
        should.ifError(err);
    });

    it('should get the annotation', function(){
        annotations.should.have.property('Multiline');
    });
});

describe('mixed type annotations', function(){

    var err;
    var annotations;

    before(function(done){
        annotationModule.getFunctionAnnotations(mockPath, 'functionWithALotOfAnnotation', function(e, a){
            err = e;
            annotations = a;

            done();
        });
    });

    it('should have gone well', function(){
        should.ifError(err);
    });

    it('should get the first annotation', function(){
        annotations.should.have.property('Test1');
    });

    it('should get the second annotation', function(){
        annotations.should.have.property('Test2');
    });

    it('should get the third annotation', function(){
        annotations.should.have.property('Test3');
    });
});

describe('no annotations', function(){

    var err;
    var annotations;

    before(function(done){
        annotationModule.getFunctionAnnotations(mockPath, 'functionWithoutAnnotation', function(e, a){
            err = e;
            annotations = a;

            done();
        });
    });

    it('should have gone well', function(){
        should.ifError(err);
    });

    it('should have no annotations', function(){
        annotations.should.be.empty;
    });
});

describe('annotations with arguments', function(){

    var err;
    var annotations;

    before(function(done){
        annotationModule.getFunctionAnnotations(mockPath, 'functionAnnotationWithArgument', function(e, a){
            err = e;
            annotations = a;

            done();
        });
    });

    it('should have gone well', function(){
        should.ifError(err);
    });

    it('should get arguments', function(){
        annotations.should.have.property('Test4');

        annotations.Test4.should.have.length(1);

        should.deepEqual(annotations.Test4[0], ['string', 5, {a: 10}]);
    });
});
