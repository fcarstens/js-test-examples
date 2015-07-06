define(["exports", "module"], function (exports, module) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

    module.exports = EventEmitter;
});

//# sourceMappingURL=eventemitter.js.map