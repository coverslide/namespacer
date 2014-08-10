var test = require('tape');
var Namespacer = require('./namespacer');

test('it puts the lotion on its skin', function (t) {
    var RootNamespace = Namespacer.createNamespace();

    RootNamespace('level1')('level2').value = 'Level 2 value';
    RootNamespace('level1')('level2').value2 = 'Level 2 value 2';
    RootNamespace('level1').value = 'Level 1 value';
    RootNamespace('zzy').value = 'Zzy value';

    t.equal(typeof RootNamespace, 'function');
    t.equal(typeof RootNamespace.level1, 'function');
    t.equal(typeof RootNamespace.level1.level2, 'function');
    t.equal(typeof RootNamespace.zzy, 'function');
    t.equal(RootNamespace.level1, RootNamespace('level1'));
    t.equal(RootNamespace.level1.level2, RootNamespace('level1')('level2'));
    t.equal(RootNamespace.zzy, RootNamespace('zzy'));
    t.equal(RootNamespace.level1.level2.value, 'Level 2 value');
    t.equal(RootNamespace.level1.level2.value2, 'Level 2 value 2');
    t.equal(RootNamespace.level1.value, 'Level 1 value');
    t.equal(RootNamespace.zzy.value, 'Zzy value');
    t.end();
});

if (typeof Proxy != 'undefined') {
    test('or else it gets the hose again', function (t) {
        var RootNamespace = Namespacer.createProxy();

        RootNamespace.level1.level2.value = 'Level 2 value';
        RootNamespace['level1.1'].level2.value = 'Level 1.1.2 value';
        //console.log(Object.getOwnPropertyDescriptor({a:1}, 'a'));

        t.equal(typeof RootNamespace, 'object');
        t.ok('level1' in RootNamespace);
        t.ok('level2' in RootNamespace.level1);
        t.ok('level2' in RootNamespace['level1']);
        t.equal(2, Object.getOwnPropertyNames(RootNamespace).length);
        t.notEqual(-1, Object.getOwnPropertyNames(RootNamespace).indexOf('level1'));
        t.notEqual(-1, Object.getOwnPropertyNames(RootNamespace).indexOf('level1.1'));
        t.equal(typeof RootNamespace.level1, 'object');
        t.equal(typeof RootNamespace.level1.level2, 'object');
        t.equal(typeof RootNamespace.level1.level2.value, 'string');
        t.equal(RootNamespace.level1.level2.value, 'Level 2 value');
        t.end();
    });
}
