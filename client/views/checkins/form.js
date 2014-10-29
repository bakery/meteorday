var pictureUrl, suggestedLocations, updateLocation;

Template.checkinForm.helpers({
    currentGeoLocation : function(){
        return Geolocation.latLng();
    },

    formDocument : function(){
        return {
            userId : Meteor.userId()
        };
    },

    pictureUrl : function(){
        return pictureUrl.get();
    },

    currentLocation : function(){
        var selectedLocationId = LocationSession.getSelectedLocation();
        var locations = suggestedLocations.get() || [];

        if(selectedLocationId){
            return _.find(locations, function(l){
                return l.data && (l.data.id === selectedLocationId);
            });
        } else {
            return locations.length > 0 ? locations[0] : null;
        }
    },

    suggestedLocations : function(){
        var locations = suggestedLocations.get();
        return locations ? _.map(locations, function(location){
            var data =  {
                name : location.name
            };

            if(location.data){
                data.id = location.data.id;
            }

            return data;

        }) : null;
    },

    currentUserProfile : function(){
        var user = Meteor.user();
        return user ? user.profile : null;
    },

    isFormExpanded : function(){
        return Session.get('checkin-form-expanded');
    }
});

Template.checkinForm.created = function(){
    pictureUrl = new ReactiveVar(null);
    suggestedLocations = new ReactiveVar(null);
    updateLocation = new ReactiveVar(true);
};

Template.checkinForm.rendered = function(){
    this.autorun(function(){
        // keep an eye on the location
        var location = Geolocation.latLng();
        
        // only poll foursquare when we have a location 
        // and the form is expanded
        if(location && Session.get('checkin-form-expanded')){
            Foursquare.explore(location.lat, location.lng, function(locations){
                suggestedLocations.set(locations);
            });
        }
    });
};

Template.checkinForm.events({

    'change, keyup textarea[name="text"]' : function(e, template){
        var currentValue = $(e.currentTarget).val();
        if(currentValue && currentValue.length > 3){
            template.$('input[type="submit"]').removeAttr('disabled');
        } else {
            template.$('input[type="submit"]').attr('disabled','disabled');
        }
    },

    'click .checkin-prompt' : function(){
        Session.set('checkin-form-expanded',true);
    },

    'click .location-picker' : function(e, template){

        // XXX long lists interfere with the modal overlay
        // hide the list before showing the modal
        // and let the modal know what to restore via data-target

        var listSelector = '.items';
        $('.location-selector-modal').addClass('active')
            .data('target',listSelector);
        $(listSelector).hide();
    },

    'click .camera' : function(e, template){
        e.stopImmediatePropagation();

        template.$('input[type="submit"]')
            .attr('disabled','disabled');

        MeteorCamera.getPicture({
            width: 500,
            height: 500,
            quality: 100
        },
            function(error,data){
                if(!error){
                    pictureUrl.set(data);
                }

                template.$('input[type="submit"]')
                    .removeAttr('disabled');
            }
        );

        return false;
    }
});

AutoForm.hooks({
    checkinForm: {

        before: {
            insert: function(doc, template) {
                var locations = suggestedLocations ?
                    suggestedLocations.get() : [];
                
                if(doc.locationName){
                    var location = _.find(locations, function(l){
                        return l.name === doc.locationName;
                    });

                    if(location && location.data){
                        _.extend(doc, {
                            locationData : {
                                foursquare : location.data
                            }
                        });
                    }
                }


                if(typeof device !== 'undefined'){
                    _.extend(doc, {
                        device : {
                            model : device.model,
                            platform : device.platform,
                            version : device.version
                        }
                    });
                }

                return doc;
            }
        },

        onSuccess: function(operation, result, template) {
            // clean up reactive variables
            pictureUrl.set(null);
            Session.set('checkin-form-expanded',false);
            LocationSession.reset();
        },

        onError: function(operation, error, template) {
            if(operation !== 'validation'){
                console.error('checkin failed', error);
                alert('did not work');
            }
        }
    }
});