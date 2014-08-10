//umdjs
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Namespacer = factory();
  }
}(this, function () {
    'use strict';
    function Namespacer () {
        function currentNamespace (namespace) {
            if (typeof currentNamespace[namespace] === 'undefined') {
                currentNamespace[namespace] = Namespacer.createNamespace();
            }
            return currentNamespace[namespace];
        };

        return currentNamespace;
    }

    Namespacer.createNamespace = Namespacer;

    return Namespacer;
}));
