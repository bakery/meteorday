Template.locationSelector.helpers({
    isSelected : function(){
        return LocationSession.getSelectedLocation() === this.id;
    }
});

Template.locationSelector.events({
    'click .location' : function(e, template){
        var selectedId = $(e.currentTarget).data('id');
        if(selectedId){
            LocationSession.setSelectedLocation(selectedId);

            var modal = template.$('.location-selector-modal');

            // XXX check checkins/form.js for explanations
            var restore = modal.data('target');
            $(restore).show();
            modal.removeClass('active');

            LocationSession.setIsLocationSelectorActive(false);
        }
    }
});