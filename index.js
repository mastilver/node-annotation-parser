var fs = require('fs');
var path = require('path');


/*   public functions   */

module.exports = function getAllAnnotations(filePath, callback){

    getFile(filePath, function(err, fileContent){

        if(err) return callback(err);

        var result = {
            module: {},
            functions: [],
        };

        var moduleToLoad = getModule(filePath);

        result.module.annotations = getAnnotation(fileContent, 'module');
        result.module.ref = moduleToLoad;



        for(var name in moduleToLoad){
            if(moduleToLoad[name] instanceof Function){

                var r = getAnnotation(fileContent, 'function', name);

                if(r instanceof Error) return callback(err);

                result.functions[name] = {
                    annotations: r,
                    ref: moduleToLoad[name],
                };
            }
        }

        callback(null, result);
    });
};


/*   private functions   */

function getFile(filePath, callback){
    fs.readFile(filePath, {encoding: 'utf-8'}, callback);
}

function getModule(filePath){
    return require(path.join(process.cwd(), filePath));
}

function getAnnotation(fileContent, type, name){

    suffixes = ({
        function: [name + '\\s*:\\s*function\\(', '(module\\.)?exports\\.' + name + '\\s*=\\s*'],
        module: ['module\\.exports\\s*=\\s*{']
    })[type];

    var regex = new RegExp('((\\/\\/.*)|(\\/\\*[\\S\\s]*\\*\\/)|\\s)*(' + suffixes.join('|') + ')');

    var matches = regex.exec(fileContent);

    if(matches === null){
        return {};
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
