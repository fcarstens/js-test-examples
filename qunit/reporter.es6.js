import EventEmitter from "../eventemitter"
import {Test, Suite} from "../data"


export default class QUnitAdapter extends EventEmitter {
    constructor() {
        super();
        QUnit.done(this.onDone.bind(this));
        QUnit.testDone(this.onTestDone.bind(this));
        QUnit.moduleDone(this.onModuleDone.bind(this));

        this.tests = [];
        this.suites = [];
    }

    onTestDone(details) {
        var status;
        if (details.failed != 0) {
            status = "failed";
        }
        else {
            status = "passed";
        }
        var test = new Test(details.name, status, details.runtime);
        this.tests.push(test);
        this.emit("testEnd", test);

    }

    onDone(details) {
        var globalSuite = new Suite("", this.suites, []);
        this.emit("runEnd", globalSuite);
    }

    onModuleDone(details) {
        var suite = new Suite(details.name, [], this.tests);
        this.tests = [];
        this.suites.push(suite);
        this.emit("suiteEnd", suite);
    }
}