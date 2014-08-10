Namespacer
==========

A simple utility for creating namespaces.

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
if (!RootNamespace.level1) {
    RootNamespace.level1 = {};
}

//You have to repeat this boilerplate for every level of the namespace
if(!RootNamespace.level1.level2) {
    RootNamespace.level1.level2 = {};
}
```

With Namespacer, it becomes simplified:

```js
//use Namespacer.createNamespace() once to declare a root namespace
window.RootNamespace = Namespacer.createNamespace();

//Add or extend namespaces to your heart's content
RootNamespace('mywebapp')('category')('level1')('level2').property = 'blah';
```

```js
//You can also use Namespacer() as a shortcut
window.RootNamespace = Namespacer();

//use this for any type of value you would like,
var MyClass = RootNamespace('mywebapp')('category')('level1')('level2').MyClass = function(){};

MyClass.prototype.myMethod = function () {};
```

Best Practices
--------------

Use the method invocation for adding namespaces, but dot notation can be used
for accessing properties.

```js
var instance = new RootNamespace.mywebapp.category.level1.level2.MyClass();
```

License
-------

ISC
