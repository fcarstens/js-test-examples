define(["exports", "module", "../eventemitter", "../data"], function (exports, module, _eventemitter, _data) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _EventEmitter2 = _interopRequireDefault(_eventemitter);

    var JasmineAdapter = (function (_EventEmitter) {
        function JasmineAdapter() {
            _classCallCheck(this, JasmineAdapter);

            _get(Object.getPrototypeOf(JasmineAdapter.prototype), "constructor", this).call(this);
            jasmine.getEnv().addReporter({
                specDone: this.onSpecDone.bind(this),
                specStarted: this.onSpecStarted.bind(this),
                suiteStarted: this.onSuiteStarted.bind(this),
                suiteDone: this.onSuiteDone.bind(this),
                jasmineDone: this.onJasmineDone.bind(this)
            });
            // a stack of test arrays. The top element on the stack is the currently active suite
            this.tests = [[]];
            // a stack of suite arrays
            this.suites = [[]];
        }

        _inherits(JasmineAdapter, _EventEmitter);

        _createClass(JasmineAdapter, [{
            key: "onSpecStarted",
            value: function onSpecStarted() {
                this.startTime = new Date();
            }
        }, {
            key: "onSpecDone",
            value: function onSpecDone(details) {
                var runtime = new Date() - this.startTime;
                var test = new _data.Test(details.description, details.status, runtime);
                this.emit("testEnd", test);
                this.tests[this.tests.length - 1].push(test);
            }
        }, {
            key: "onSuiteStarted",
            value: function onSuiteStarted() {
                this.tests.push([]);
                this.suites.push([]);
            }
        }, {
            key: "onSuiteDone",
            value: function onSuiteDone(details) {
                if (details.failedExpectations.length > 0) {
                    this.tests[this.tests.length - 1].push(new _data.Test("afterAll", "failed", 0));
                }
                var suite = new _data.Suite(details.description, this.suites.pop(), this.tests.pop());
                this.emit("suiteEnd", suite);
                this.suites[this.suites.length - 1].push(suite);
            }
        }, {
            key: "onJasmineDone",
            value: function onJasmineDone() {
                var globalSuite = new _data.Suite("", this.suites.pop(), this.tests.pop());
                this.emit("runEnd", globalSuite);
            }
        }]);

        return JasmineAdapter;
    })(_EventEmitter2["default"]);

    module.exports = JasmineAdapter;
});

//# sourceMappingURL=reporter.js.map