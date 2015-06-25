"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = (function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.listeners = {};
    }

    _createClass(EventEmitter, [{
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
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            if (this.listeners[name]) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.listeners[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var fun = _step.value;

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

var BusterAdapter = (function (_EventEmitter) {
    function BusterAdapter() {
        _classCallCheck(this, BusterAdapter);

        _get(Object.getPrototypeOf(BusterAdapter.prototype), "constructor", this).call(this);
        buster.testRunner.on("suite:end", this.onDone.bind(this));
        buster.testRunner.on("suite:start", this.onStart.bind(this));
    }

    _inherits(BusterAdapter, _EventEmitter);

    _createClass(BusterAdapter, [{
        key: "onStart",
        value: function onStart() {
            this.startTime = new Date();
        }
    }, {
        key: "onDone",
        value: function onDone(details) {

            var standard = {
                totalTests: details.tests,
                failedTests: details.failures + details.errors + details.timeouts,
                runtime: new Date() - this.startTime
            };
            standard.passedTests = standard.totalTests - standard.failedTests;

            this.emit("runEnd", standard);
        }
    }]);

    return BusterAdapter;
})(EventEmitter);

var adapter = new BusterAdapter();
adapter.on("runEnd", function (details) {
    console.log(details);
});

//# sourceMappingURL=reporter.es6-compiled.js.map