Meteor.publish('checkins', function(){
    
    // use this for throttling purposes (e.g. to debug loading template)
    // var self = this;

    // Meteor.setTimeout(function(){
    //     var checkins = getAllCheckins().fetch();
    //     _.each(checkins, function(c){
    //         self.added('checkins', c._id, c);
    //     });

    //     self.ready();
    // }, 5000);

    return getAllCheckins();
});