var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
	twid				:String,
	active			:Boolean,
	author			:String,
	avatar			:String,
	body				:String,
	data				:Date,
	screenname	:String
});

schema.statics.getTweets = function(page, skip, callback){
	var tweets = [],
		start = (page * 10) + (skip * 1);

	Tweet.find({}, "twid active author avatar body date screenname",{
		skip: start,
		limit: 10
	}).sort({
		date: 'desc'
	}).exec(function(err, docs){

		if(!err) {
      tweets = docs;  // We got tweets
      tweets.forEach(function(tweet){
        tweet.active = true; // Set them to active
      });
    }

    // Pass them back to the specified callback
    callback(tweets);

	});
}

module.exports = Tweet = mongoose.model('Tweet', schema);
