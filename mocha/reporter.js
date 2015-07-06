// https://github.com/mochajs/mocha/wiki/Third-party-reporters

module.exports = MyReporter;

function MyReporter(runner) {

  runner.on('suite end', function(test){
          console.log(test);
  });

}