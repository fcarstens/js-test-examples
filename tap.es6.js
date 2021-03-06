export default class TapReporter {
    constructor(adapter) {
        this.adapter = adapter;
        this.count = 0;

        adapter.on("testEnd", this.onTestEnd.bind(this));
        adapter.on("runEnd", this.onRunEnd.bind(this));
    }

    onTestEnd(test) {
        this.count++;
        if (test.status == "failed") {
            console.log("not ok " + this.count + " " + test.name);
        }
        else {
            console.log("ok " + this.count + " " + test.name);
        }
    }

    onRunEnd(suite) {
        console.log("1.." + this.count);
    }
}

