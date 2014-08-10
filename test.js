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
})
