var runner = mocha.run();
var testsPassed = 0;

var onTestPassedHandler = function(e){
      testsPassed++;
      console.log("onTestPassedHandler - title: " + e.title + " - total:" + testsPassed);

    };

runner.on("pass", onTestPassedHandler);
