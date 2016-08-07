var should = require('should');

var annotationModule = require('../index.js');

var mockPath = './fixtures/moduleFunctionMock.js';


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

        it('should get the multiline annotation', function(){
            result.module.annotations.should.have.property('testModuleMultiline');
        });

        it('should get the multiline raw annotation', function(){
            result.module.rawAnnotations.should.have.property('testModuleMultiline', ['testModuleMultiline()']);
        });

        it('should get the module annotation', function(){
            result.module.annotations.should.have.property('module');
        });

        it('should get the module annotation', function(){
            result.module.rawAnnotations.should.have.property('module', ['module()']);
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

        it('should get the multiline annotation', function(){
            result.module.annotations.should.have.property('testModuleMultiline');
        });

        it('should get the multiline raw annotation', function(){
            result.module.rawAnnotations.should.have.property('testModuleMultiline', ['testModuleMultiline()']);
        });

        it('should get the module annotation', function(){
            result.module.annotations.should.have.property('module');
        });

        it('should get the module annotation', function(){
            result.module.rawAnnotations.should.have.property('module', ['module()']);
        });
    });
});
