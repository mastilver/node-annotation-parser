// @Useless()

var ImJustHereToBlockThePreviousAnnotation;


/*
    @testModuleMultiline()
*/
// @testModuleSingleline()
module.exports = {

    // @SingleLine()
    functionWithSingleLineAnnotation: function(){
        return 'SingleLine';
    },

    /*
     *  @MultipleLine()
    */
    functionWithMultipleLineAnnotation: function(){
        return 'MultipleLine';
    },


    // @Test1()

    /*

        @Test2()

    */

    // @Test3();

    functionWithALotOfAnnotation: function(){
        return 'ALot';
    },

    functionWithoutAnnotation: function(){
        return 'Nothing';
    },

    // @Test4('string', 5, {a: 10})
    //
    functionAnnotationWithArgument: function(){
        return 'WithArgument';
    }
};
