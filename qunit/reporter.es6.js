import EventEmitter from "../eventemitter"
import {Test, Suite} from "../data"


class QUnitAdapter extends EventEmitter {
    constructor() {
        super();
        this.total = 0;
        this.failed = 0;
        this.passed = 0;
        QUnit.done(this.onDone.bind(this));
        QUnit.testDone(this.onTestDone.bind(this));
    }

    onTestDone(details) {
        this.total++;
        if (details.failed != 0) {
            this.failed++;
        }
        else {
            this.passed++;
        }

    }

    onDone(details) {
        var standard = {
            totalTests: this.total,
            failedTests: this.failed,
            passedTests: this.passed,
            runtime: details.runtime

        };
        this.emit("runEnd", standard);
    }
}

var adapter = new QUnitAdapter();
adapter.on("runEnd", function (details) {
    console.log(details);
});