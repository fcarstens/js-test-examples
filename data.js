define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Test = function Test(name, status, runtime) {
        _classCallCheck(this, Test);

        this.name = name;
        this.status = status;
        this.runtime = runtime;
    };

    exports.Test = Test;

    var Suite = (function () {
        function Suite(name, childSuites, tests) {
            _classCallCheck(this, Suite);

            this.name = name;
            this.childSuites = childSuites;
            this.tests = tests;
        }

        _createClass(Suite, [{
            key: "getAllTests",
            value: function getAllTests(arr) {
                if (arr === undefined) {
                    arr = [];
                }
                this.tests.forEach(function (test) {
                    arr.push(test);
                });
                this.childSuites.forEach(function (child) {
                    child.getAllTests(arr);
                });
                return arr;
            }
        }, {
            key: "getTotal",
            value: function getTotal() {
                var summary = {
                    passed: 0,
                    failed: 0,
                    runtime: 0
                };

                var allTests = this.getAllTests();
                allTests.forEach(function (test) {
                    if (test.status != "passed") {
                        summary.failed++;
                    } else {
                        summary.passed++;
                    }
                    summary.runtime += test.runtime;
                });

                return summary;
            }
        }]);

        return Suite;
    })();

    exports.Suite = Suite;

    var foo = new Test("foo", "passed", 42);
    var bar = new Test("bar goes wrong", "failed", 42);
    var baz = new Test("baz", "passed", 42);

    var groupA = new Suite("group a", [], [foo, bar]);
    var groupB = new Suite("group b", [], [baz]);
    var root = new Suite("root", [groupA, groupB], []);

    var demoData = root;
    exports.demoData = demoData;
});

//# sourceMappingURL=data.js.map