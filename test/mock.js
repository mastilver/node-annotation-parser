// @Useless()

var ImJustHereToBlockThePreviousAnnotation;


/*
    @testModuleMultiline()
*/
// @testModuleSingleline()
module.exports = {

    // @SingleLine()
    functionWithSingleLineAnnotation: function(){

    },

    /*
     *  @Multiline()
    */
    functionWithMultipleLineAnnotation: function(){

    },


    // @Test1()

    /*

        @Test2()

    */

    // @Test3();

    functionWithALotOfAnnotation: function(){

    },

    functionWithoutAnnotation: function(){

    },

    // @Test4('string', 5, {a: 10})
    //
    functionAnnotationWithArgument: function(){

    }
};
