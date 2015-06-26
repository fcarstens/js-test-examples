import EventEmitter from "../eventemitter"
import {Test, Suite} from "../data"


export default class QUnitAdapter extends EventEmitter {
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
        var status;
         if (details.failed != 0){
            status = "failed";
        }
        else {
            status = "passed";
        }
        var test = new Test(details.name, status, details.runtime);

        this.emit("testEnd", test);

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