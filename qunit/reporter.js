define(["exports", "module", "../eventemitter", "../data"], function (exports, module, _eventemitter, _data) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var _EventEmitter2 = _interopRequireDefault(_eventemitter);

    var QUnitAdapter = (function (_EventEmitter) {
        function QUnitAdapter() {
            _classCallCheck(this, QUnitAdapter);

            _get(Object.getPrototypeOf(QUnitAdapter.prototype), "constructor", this).call(this);
            this.total = 0;
            this.failed = 0;
            this.passed = 0;
            QUnit.done(this.onDone.bind(this));
            QUnit.testDone(this.onTestDone.bind(this));
        }

        _inherits(QUnitAdapter, _EventEmitter);

        _createClass(QUnitAdapter, [{
            key: "onTestDone",
            value: function onTestDone(details) {
                this.total++;
                if (details.failed != 0) {
                    this.failed++;
                } else {
                    this.passed++;
                }
                var status;
                if (details.failed != 0) {
                    status = "failed";
                } else {
                    status = "passed";
                }
                var test = new _data.Test(details.name, status, details.runtime);

                this.emit("testEnd", test);
            }
        }, {
            key: "onDone",
            value: function onDone(details) {
                var standard = {
                    totalTests: this.total,
                    failedTests: this.failed,
                    passedTests: this.passed,
                    runtime: details.runtime

                };
                this.emit("runEnd", standard);
            }
        }]);

        return QUnitAdapter;
    })(_EventEmitter2["default"]);

    module.exports = QUnitAdapter;
});

//# sourceMappingURL=reporter.js.map