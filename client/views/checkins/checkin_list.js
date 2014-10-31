Template.checkinsList.helpers({
    
    isFormCollapsed : function(){
        return !Session.get('checkin-form-expanded');
    }

});