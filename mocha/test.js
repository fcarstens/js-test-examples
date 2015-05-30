describe('group a', function(){
    it('foo', function(){
		assert(5 == "5");
		assert(1/0 == Infinity);
	})
	it('bar goes wrong', function(){
		assert(5 === "5");
	});
})
describe('group b', function(){
	it('baz', function(){
			assert(true);
		});
});		


