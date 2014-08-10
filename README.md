Namespacer
==========

A simple utility for creating namespaces.

Installation
------------

### Bower

```
bower install namespacer
```

### NPM

```
npm install namespacer
```

----

Namespacer is mostly meant for the browser, but it also works with AMD and 
CommonJS modules, although namespaces usually are not necessary in those
environments.

Usage
-----

Using namespaces is a great way for organizing code. In most other languages,
this is a built-in feature. With JavaScript, it must be done using objects.

Typical namespacing with JavaScript occurs like this:

```js
//Usually this step can be skipped, as the root namespace would be declared
//once in the beginning
if (typeof RootNamespace == 'undefined') {
    RootNamespace = {};
}

//To add a property on a namespace, you have to check for its existence first
//One disadvantage is you have to repeat this boilerplate for every level 
//of the namespace.
if (!RootNamespace.level1) {
    RootNamespace.level1 = {};
}

//This way is more compact, but still very cumbersome to write
RootNamespace.level1.level2 = (RootNamespace.level1.level2 || {});
```

With Namespacer, it becomes simplified:

```js
//use Namespacer.createNamespace() once to declare a root namespace
RootNamespace = Namespacer.createNamespace();

//Add or extend namespaces to your heart's content
RootNamespace('mywebapp')('category')('level1')('level2').property = 'blah';

//When you want to retrieve a value, it can be accessible via dot notation
var prop = RootNamespace.mywebapp.category.level1.level2.property;
```

Each namespace is a function which, when called with a string, will check for that
namespace's existence, and return it, or create a new namespace if not found.
Since `Function` extends `Object` in JavaScript, this is perfectly valid, and can be
treated like a regular object. Note that you cannot assign a value to a namespace,
but you can always assign to the property of a namespace.

Tips
----

```js
//You can also use Namespacer() as a shortcut
RootNamespace = Namespacer();

//For function classes, it is recommended to assign it to a separate variable
//for easier access to the prototype.
var MyClass = RootNamespace('mywebapp')('category')('level1')('level2').MyClass = function(){};

MyClass.prototype.myMethod = function () {};
```

License
-------

ISC
