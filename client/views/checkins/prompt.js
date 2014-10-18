Template.prompt.helpers({
    currentUserProfile : function(){
        var user = Meteor.user();
        return user ? user.profile : null;
    }
});

Template.prompt.events({
    'click .checkin' : function(){
        Router.go('checkinForm');
    }
});