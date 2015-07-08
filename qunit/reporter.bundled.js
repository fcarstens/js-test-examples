(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.QUnitAdapter = factory()
}(this, function () { 'use strict';

    "use strict";

    var EventEmitter___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function EventEmitter___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var EventEmitter = (function () {
        function EventEmitter() {
            EventEmitter___classCallCheck(this, EventEmitter);

            this.listeners = {};
        }

        EventEmitter___createClass(EventEmitter, [{
            key: "on",
            value: function on(name, fun) {
                if (this.listeners[name] == undefined) {
                    this.listeners[name] = [fun];
                } else {
                    this.listeners[name].push(fun);
                }
            }
        }, {
            key: "emit",
            value: function emit(name) {
                if (this.listeners[name]) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.listeners[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var fun = _step.value;

                            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                                params[_key - 1] = arguments[_key];
                            }

                            fun.apply(undefined, params); //callback
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        }]);

        return EventEmitter;
    })();

    "use strict";

    var data___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function data___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var data__Test = function Test(name, status, runtime) {
        data___classCallCheck(this, data__Test);

        this.name = name;
        this.status = status;
        this.runtime = runtime;
    };

    var Suite = (function () {
        /**
         *
         * @param name
         * @param childSuites
         * @param tests: array containing tests belonging to the suite but not to a child suite
         */

        function Suite(name, childSuites, tests) {
            data___classCallCheck(this, Suite);

            this.name = name;
            this.childSuites = childSuites;
            this.tests = tests;
        }

        data___createClass(Suite, [{
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

    var foo = new data__Test("foo", "passed", 42);
    var bar = new data__Test("bar goes wrong", "failed", 42);
    var baz = new data__Test("baz", "passed", 42);

    var groupA = new Suite("group a", [], [foo, bar]);
    var groupB = new Suite("group b", [], [baz]);
    var root = new Suite("root", [groupA, groupB], []);

    var demoData = root;

    "use strict";

    var reporter___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function reporter___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var QUnitAdapter = (function (_EventEmitter) {
        function QUnitAdapter() {
            reporter___classCallCheck(this, QUnitAdapter);

            _get(Object.getPrototypeOf(QUnitAdapter.prototype), "constructor", this).call(this);
            QUnit.done(this.onDone.bind(this));
            QUnit.testDone(this.onTestDone.bind(this));
            QUnit.moduleDone(this.onModuleDone.bind(this));

            this.tests = {};
            this.suites = [];
        }

        _inherits(QUnitAdapter, _EventEmitter);

        reporter___createClass(QUnitAdapter, [{
            key: "onTestDone",
            value: function onTestDone(details) {
                var status;
                if (details.failed != 0) {
                    status = "failed";
                } else {
                    status = "passed";
                }
                var test = new data__Test(details.name, status, details.runtime);
                this.tests[details.testId] = test;
                this.emit("testEnd", test);
            }
        }, {
            key: "onDone",
            value: function onDone(details) {
                var globalSuite = new Suite("", this.suites, []);
                this.emit("runEnd", globalSuite);
            }
        }, {
            key: "onModuleDone",
            value: function onModuleDone(details) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = details.tests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        test = _step.value;

                        // check if the module is actually finished:
                        // QUnit may trigger moduleDone multiple times if it reorders tests
                        // if not, return and wait for the next moduleDone
                        if (!(test.testId in this.tests)) {
                            return;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var testArray = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = details.tests[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        test = _step2.value;

                        testArray.push(this.tests[test.testId]);
                        delete this.tests[test.testId];
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                            _iterator2["return"]();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                var suite = new Suite(details.name, [], testArray);
                this.suites.push(suite);
                this.emit("suiteEnd", suite);
            }
        }]);

        return QUnitAdapter;
    })(EventEmitter);

    var reporter = QUnitAdapter;

    return reporter;

}));