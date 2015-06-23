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

    result.module.rawAnnotations = getRawAnnotations(fileContent, 'module');
    result.module.annotations = parseAnnotations(result.module.rawAnnotations);
    result.module.ref = moduleToLoad;
    result.module.name = path.basename(filePath, path.extname(filePath));



    for(var name in moduleToLoad){
        if(moduleToLoad[name] instanceof Function){

            result.functions[name] = {
                rawAnnotations: getRawAnnotations(fileContent, 'function', name),
                ref: moduleToLoad[name],
            };

            result.functions[name].annotations = parseAnnotations(result.functions[name].rawAnnotations);
        }
    }

    return result;
}


function getRawAnnotations(fileContent, type, name){
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


    var annotationRegex = /@(([a-zA-Z_][a-zA-Z0-9]*)\(.*\))/g;
    var annotationMatches;

    var result = {};


    while(annotationMatches = annotationRegex.exec(match)){

        var key = annotationMatches[2];
        var value = annotationMatches[1];

        if(key in result){
            result.push(value);
        }
        else{
            result[key] = [value];
        }
    }

    return result;
}

function parseAnnotations(rawAnnotations){

    var annotationRegex = /([a-zA-Z_][a-zA-Z0-9]*)\((.*)\)/;

    var result = {};

    for(var i in rawAnnotations){

        result[i] = [];

        for(var j in rawAnnotations[i]){
            var argumentsString = annotationRegex.exec(rawAnnotations[i][j])[2];
            result[i].push(eval('([' + argumentsString + '])'));
        }
    }

    return result;
}
