Template.checkinHeader.helpers({
    
    isFormExpanded : function(){
        return Session.get('checkin-form-expanded');
    }

});

Template.checkinHeader.events({

    'click .checkin-prompt' : function(){
        Session.set('checkin-form-expanded',true);
    }
    
});