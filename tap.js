define(["exports", "module"], function (exports, module) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var TapReporter = (function () {
        function TapReporter(adapter) {
            _classCallCheck(this, TapReporter);

            this.adapter = adapter;
            this.count = 0;

            adapter.on("testEnd", this.onTestEnd.bind(this));
            adapter.on("runEnd", this.onRunEnd.bind(this));
        }

        _createClass(TapReporter, [{
            key: "onTestEnd",
            value: function onTestEnd(test) {
                this.count++;
                if (test.status == "failed") {
                    console.log("not ok " + this.count + " " + test.name);
                } else {
                    console.log("ok " + this.count + " " + test.name);
                }
            }
        }, {
            key: "onRunEnd",
            value: function onRunEnd(suite) {
                console.log("1.." + this.count);
            }
        }]);

        return TapReporter;
    })();

    module.exports = TapReporter;
});

//# sourceMappingURL=tap.js.map