class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(name, fun) {
        if (this.listeners[name] == undefined) {
            this.listeners[name] = [fun];
        }
        else {
            this.listeners[name].push(fun);
        }
    }

    emit(name, ...params) {
        if (this.listeners[name]) {
            for (var fun of this.listeners[name]) {
                fun(...params); //callback
            }
        }
    }
}

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
    console.log(details)
});