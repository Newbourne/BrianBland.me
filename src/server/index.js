require("babel/polyfill")

require("babel/register")({
  optional: ['es7.decorators',
          'es7.asyncFunctions',
          'es7.classProperties']
});

require('./server')