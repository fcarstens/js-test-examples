var strftime = window.strftime;

var assert = buster.assert;

buster.testCase("group a", {
    
    "foo": function () {
        assert.equals(5, "5");
		assert.equals(1/0, Infinity);
    },

    "bar goes wrong": function () {
        assert.same(5,"5");
		assert.same(4,"4");
    },
});

buster.testCase("group b", {
    
    "baz": function () {
        assert.isTrue(true);
    }
});