define([
    'intern!object',
    'intern/chai!assert',
], function (registerSuite, assert) {
    registerSuite({
        name: 'group a',

        'foo': function () {
            assert.equal(5, '5');
            assert.equal(1/0, Infinity);
        },
		
		'bar goes wrong': function() {
			assert.strictEqual(5, '5');
		}
    });
	
	registerSuite({
		name: 'group b',
		
		'baz': function(){
			assert.ok(true);
		}
	});
});