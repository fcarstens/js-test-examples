"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

import EventEmitter from "../eventemitter";
import { Test, Suite } from "../data";

var QUnitAdapter = (function (_EventEmitter) {
    function QUnitAdapter() {
        _classCallCheck(this, QUnitAdapter);

        _get(Object.getPrototypeOf(QUnitAdapter.prototype), "constructor", this).call(this);
        QUnit.done(this.onDone.bind(this));
        QUnit.testDone(this.onTestDone.bind(this));
        QUnit.moduleDone(this.onModuleDone.bind(this));

        this.tests = {};
        this.suites = [];
    }

    _inherits(QUnitAdapter, _EventEmitter);

    _createClass(QUnitAdapter, [{
        key: "onTestDone",
        value: function onTestDone(details) {
            var status;
            if (details.failed != 0) {
                status = "failed";
            } else {
                status = "passed";
            }
            var test = new Test(details.name, status, details.runtime);
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

export default QUnitAdapter;
