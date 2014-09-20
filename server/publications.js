Meteor.publish('checkins', function(){
	return getAllCheckins();
});