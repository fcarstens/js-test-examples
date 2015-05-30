QUnit.module("group a");
QUnit.test("foo", function(assert) {
    assert.equal(5, "5");
    assert.equal(1 / 0, Infinity);
});
QUnit.test("bar goes wrong", function(assert) {
    assert.deepEqual(5, "5");
});

QUnit.module("group b");
QUnit.test("baz", function(assert) {
    assert.ok(true);
});

QUnit.done(function(details) {
    console.log(details);
});