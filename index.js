var fs = require('fs');


/*   public functions   */

function getModuleAnnotations(path, callback){

        getFile(path, function(err, fileContent){

            if(err) return callback(err);

            var result = getAnnotation(fileContent, 'module');

            if(result instanceof Error) return callback(result);

            callback(null, result);
        });
}

function getFunctionAnnotations(path, functionName, callback){

    getFile(path, function(err, fileContent){

        if(err) return callback(err);

        var result = getAnnotation(fileContent, 'function', functionName);

        if(result instanceof Error) return callback(result);

        callback(null, result);
    });
}

function getAllAnnotations(path, callback){

    getFile(path, function(err, fileContent){

        if(err) return callback(err);

        var result = {
            module: null,
            functions: [],
        };

        result.module = getAnnotation(fileContent, 'module');

        var module = require(path);

        for(var name in module){
            if( module[name] instanceof Function){

                var r = getAnnotation(fileContent, 'function', name);

                if(r instanceof Error) return callback(err);

                result.functions[name] = r;
            }
        }

        callback(null, result);
    });
}


/*   private functions   */

function getFile(path, callback){
    fs.readFile(path, {encoding: 'utf-8'}, callback);
}

function getAnnotation(fileContent, type, name){

    suffixes = ({
        function: [name + '\\s*:\\s*function\\('],
        module: ['module\\.exports']
    })[type];

    var regex = new RegExp('((\\/\\/.*)|(\\/\\*[\\S\\s]*\\*\\/)|\\s)*(' + suffixes.join('|') + ')');

    var matches = regex.exec(fileContent);

    if(matches === null){
        return new Error('Could not find: \'' + suffixes.join('\' or \'') + '\'');
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

    return result;
}


// module definition
module.exports = {
    getModuleAnnotations: getModuleAnnotations,
    getFunctionAnnotations: getFunctionAnnotations,
    getAllAnnotations: getAllAnnotations,
};
