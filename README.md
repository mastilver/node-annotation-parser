# node-annotation-parser

### Presentation

Unlike many other languages (C#, Java, PHP...), JavaScript doesn't handle annotation.
This module is here to help you correcting that.

### Install

`$ npm install --save annotation-parser`


### Usage

`getModuleAnnotations(filePath, callback)`

`getFunctionAnnotations(filePath, functionName, callback)`


### Exemple

given this file (witch contains annotations) `controller.js`

```
/*
    @routePrefix('api')
*/
module.exports = {

    // @route('collection', 'GET')
    collection: function(){

    },

    // @route('collection/{id}', 'GET')
    index: function(){

    },
> };
```


You can then simply retrieve those annotations by doing so:

```

var parser = require('annotation-parser');

parser.getModuleAnnotations('controller.js', function(err, annotations){
    console.log(annotations);

    /*
        {
            routePrefix: [
                ['api'],
            ],
        }
    */
});


parser.getFunctionAnnotations('controller.js', 'index', function(err, annotations){
    console.log(annotations);

    /*
        {
            route: [
                ['collection/{id}', 'GET']
            ],
        }
    */
});


```


### Inspiration

My first goal was to create an [MVC](https://aspnetwebstack.codeplex.com/wikipage?title=Attribute%20Routing%20in%20MVC%20and%20Web%20API) like router for Node.js, but I found it would be better to split this up.

There is already an [annotation parser](https://www.npmjs.com/package/annotation) for node but it didn't suit my needs.


### Licence

MIT © Thomas Sileghem
