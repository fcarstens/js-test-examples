describe("group a", function() {
    it("foo", function() {
        expect(5).toBe(5);
        expect(1 / 0).toBe(Infinity);
    });

    it("bar goes wrong", function() {
        expect(5).toBe("5");
    });
});
describe("group b", function() {
    it("baz", function() {
        expect(true).toBeTruthy();
    });
});
