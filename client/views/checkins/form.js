var pictureUrl = new ReactiveVar(null);
var suggestedLocations = new ReactiveVar(null);

Template.checkinForm.helpers({
    currentLocation : function(){
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

    suggestedLocations : function(){
        var locations = suggestedLocations.get();
        return locations ? _.map(locations, function(location){

            // adjust data presentation to work nicely with
            // Autoform's select component

            return {
                label : location,
                value : location
            };
        }) : null;
    }
});

Template.checkinForm.rendered = function(){
    var template = this;
    this.$('.form-container').addClass('animated bounceInDown');

    this.autorun(function(){
        // keep an eye on the location
        var location = Geolocation.latLng();
        if(location){
            Foursquare.explore(location.lat, location.lng, suggestedLocations);
        }
    });
};

Template.checkinForm.events({
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
                } else {
                    console.error('faield to take a picture. faking.', error);
                    pictureUrl.set('http://s2.favim.com/orig/35/cute-dog-puppy-Favim.com-281670.jpg');
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
        onSuccess: function(operation, result, template) {
            $('.form-container').addClass('animated bounceOutUp')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                    function(){
                        $('.form-container').css('display','none');
                        $('.result-container').css('display','block')
                            .addClass('animated bounceInUp');
                    });
        },

        onError: function(operation, error, template) {
            if(operation !== 'validation'){
                console.error('checkin failed', error);
                alert('did not work');
            }
        }
    }
});