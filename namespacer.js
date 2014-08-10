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
    
    function Namespacer() {
        function currentNamespace (namespace) {
            if (typeof currentNamespace[namespace] === 'undefined') {
                currentNamespace[namespace] = Namespacer.createNamespace();
            }
            return currentNamespace[namespace];
        };

        return currentNamespace;
    };

    if (typeof Proxy != 'undefined') {

        //TODO: figure out all edge cases for this API
        var createProxyHandler = function (obj) {
            return {
                getPropertyDescriptor: function (name) {
                    return Object.getOwnPropertyDescriptor(obj, name);
                },
                getPropertyNames: function () {
                    return Object.getOwnPropertyNames(obj);
                },
                getOwnPropertyDescriptor: function (name) {
                    return Object.getOwnPropertyDescriptor(obj, name);
                },
                getOwnPropertyNames: function () {
                    return Object.getOwnPropertyNames(obj);
                },
                get: function (receiver, name) {
                    if (typeof obj[name] == 'undefined') {
                        obj[name] = Namespacer.createProxy();
                    }
                    return obj[name];
                },
                set: function (receiver, name, val) {
                    obj[name] = val;
                }
            };
        };
        if (typeof Proxy == 'function') {
            Namespacer.createProxy = function () {
                var obj = {};
                var proxyHandler = createProxyHandler(obj);
                var currentNamespace = Proxy(obj, proxyHandler);
                return currentNamespace;
            }
        } else if (typeof Proxy.create == 'function') {
            Namespacer.createProxy = function () {
                var obj = {};
                var proxyHandler = createProxyHandler(obj);
                var currentNamespace = Proxy.create(proxyHandler, obj);
                return currentNamespace;
            }
        }
    }

    Namespacer.createNamespace = Namespacer;

    return Namespacer;
}));
