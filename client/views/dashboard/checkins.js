Template.checkins.events.rendered = function(){
    CitySelectionSession.resetSelection();
};

Template.checkins.events({
    'mouseenter .items .checkin-item' : function(e){
        var cityId = $(e.target).data('city');
        CitySelectionSession.setSelection(cityId);
    },
    'mouseleave .items .checkin-item' : function(){
        CitySelectionSession.setSelection(null);
    }
});