class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(name, fun) {
        if (this.listeners[name] == undefined) {
            this.listeners[name] = [fun];
        } else {
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

class BusterAdapter extends EventEmitter {
    constructor() {
        super();
        buster.testRunner.on("suite:end", this.onDone.bind(this));
        buster.testRunner.on("suite:start", this.onStart.bind(this));
    }

    onStart(){
        this.startTime = new Date();
    }

    onDone(details) {

        var standard = {
            totalTests: details.tests,
            failedTests: details.failures + details.errors + details.timeouts,
            runtime: new Date() - this.startTime
        };
        standard.passedTests = standard.totalTests - standard.failedTests;

        this.emit("runEnd", standard);

    }
}

var adapter = new BusterAdapter();
adapter.on("runEnd", function (details) {
    console.log(details)
});