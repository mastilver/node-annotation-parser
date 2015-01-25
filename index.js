var fs = require('fs');


module.exports = {

    getModuleAnnotations: function(path, callback){

            getAnnotation(path, ['module\\.exports'], callback);
    },

    getFunctionAnnotations: function(path, functionName, callback){

        getAnnotation(path, [functionName + '\\s*:\\s*function\\('], callback);
    },
};

function getAnnotation(path, suffixes, callback){

    var regex = new RegExp('((\\/\\/.*)|(\\/\\*[\\S\\s]*\\*\\/)|\\s)*(' + suffixes.join('|') + ')');

    fs.readFile(path, {encoding: 'utf-8'}, function(err, content){


        var matches = regex.exec(content);

        if(matches === null){
            return callback(new Error('Could not find: \'' + suffixes.join('\' or \'') + '\' in file: ' + path));
        }

        var match = matches[0];


        var annotationRegex = /@([a-zA-Z_][a-zA-Z0-9]*)\((.*)\)/g;
        var annotationMatches;

        var result = {};


        while(annotationMatches = annotationRegex.exec(match)){

            var functionName = annotationMatches[1];
            var argumentsString = annotationMatches[2];

            if(!result[functionName]){
                result[functionName] = [];
            }


            if(argumentsString.length > 0){
                result[functionName].push(eval('([' + argumentsString + '])'));
            }
            else{
                result[functionName].push([]);
            }
        }


        callback(null, result);
    });

}
