require("@babel/register")
require("@babel/polyfill")
require('./app')
//if (typeof window === 'undefined') {
//   global.window = {};
//   global.window.Element = {};
//   global.window.Element.prototype = {};
//}
//if (typeof document === 'undefined') {
//   global.document = {};
//   global.document.documentElement = {};
//   global.document.documentElement.style = {};
//   global.document.addEventListener = function(){};
//   global.document.createElement = function(){};
//}
//if (typeof $ === 'undefined') {
//   var $ = function(arg){
//      if(!(this instanceof $))
//         return new $(arg);
//      this.myArg = arg;
//   };
//   $.fn = $.prototype = {init: function(){}};
//   global.window.$ = $;
//}
