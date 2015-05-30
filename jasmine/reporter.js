var myReporter = {

	specDone: function(details){
		console.log("specDone", details);
	},
	
	suiteDone: function(details){
		console.log("suiteDone", details);
	}
};
jasmine.getEnv().addReporter(myReporter);	