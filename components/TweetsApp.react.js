module.exports = TweetsApp = React.createClass(
  render: function(){
    return {
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets}/>
        <Loader pagin={this.state.paging} />
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets} />
      </div>
    }
  }
);
