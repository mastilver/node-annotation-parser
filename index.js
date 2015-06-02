var fs = require('fs');
var path = require('path');

var caller = require('caller');


/*   public functions   */

module.exports = function getAllAnnotations(filePath, callback){

    var absolutePath = path.resolve(path.dirname(caller()), filePath);

    fs.readFile(absolutePath, {encoding: 'utf-8'}, function(err, fileContent){

        if(err) return callback(err);

        var result = getAnnotationFromFile(absolutePath, filePath, fileContent);

        callback(null, result);
    });
};

module.exports.sync = function(filePath){
    var absolutePath = path.resolve(path.dirname(caller()), filePath);

    var fileContent = fs.readFileSync(absolutePath, {encoding: 'utf-8'});

    return getAnnotationFromFile(absolutePath, filePath, fileContent);
};


/*   private functions   */


function getAnnotationFromFile(absolutePath, filePath, fileContent){
    var result = {
        module: {},
        functions: [],
    };

    var moduleToLoad = require(absolutePath);

    result.module.annotations = getAnnotation(fileContent, 'module');
    result.module.ref = moduleToLoad;
    result.module.name = path.basename(filePath, path.extname(filePath));



    for(var name in moduleToLoad){
        if(moduleToLoad[name] instanceof Function){

            result.functions[name] = {
                annotations: getAnnotation(fileContent, 'function', name),
                ref: moduleToLoad[name],
            };
        }
    }

    return result;
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
