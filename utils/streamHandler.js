var Tweet = require('../models/Tweet');

module.exports = function(stream, io){
  // When tweets get sent our way ...

  stream.on('data', function(data){
    // Construct a new tweet object

    var tweet = {
      twid: data['id'],
      active: false,
      author: data['user']['name'],
      avatar: data['user']['profile_image_url'],
      body: data['text'],
      date: data['created_at'],
      screenname: data['user']['screen_name']
    };

    var tweetEntry = new Tweet(tweet);

    tweetEntry.save(function(err){
      if(!err)
        io.emit('tweet', tweet);
    });

  });
};
