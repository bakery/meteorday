Template.checkinHeader.helpers({
    isFormExpanded : function(){
        return Session.get('checkin-form-expanded');
    },

    currentUserProfile : function(){
        var user = Meteor.user();
        return user ? user.profile : null;
    }
});

Template.checkinHeader.events({

    'click .checkin-prompt' : function(){
        Session.set('checkin-form-expanded',true);
    }
    
});