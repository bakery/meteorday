//var __mapLoadedCallback =  

var markers = [];
var map;

__mapsAreInitialized = function(){
    Template.map.renderMap.call(this);
};

var __loadGoogleMaps = function(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=__mapsAreInitialized';
    document.body.appendChild(script);
};

Template.map.renderMap = function(){
    var mapOptions = {
        center: new google.maps.LatLng(52.519, 13.398),
        zoom: 14
    };
    
    map = new google.maps.Map(this.$('.map-canvas')[0],mapOptions);
    var that = this;

    this.autorun(function(){
        var checkins = that.data.checkins.fetch();
        
        _.each(checkins, function(c){
            var existingMarker = _.find(markers, function(m){
                return m._id === c._id;
            });

            if(!existingMarker){
                markers.push({
                    _id : c._id,
                    marker : new google.maps.Marker({
                        map:map, draggable:false,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(c.latitude, c.longitude)
                    })
                });
            }
        });

        console.log('checkins updated', checkins);
    });
};

Template.map.created = function(){
    __mapsAreInitialized = _.bind(__mapsAreInitialized, this);

    // getAllCheckins().observe({
    //  added: function () {
    //      alert('added');
    //  },
    //  removed: function () {
    //  }
    // });
};

Template.map.rendered = function(){
    __loadGoogleMaps();
};

//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDeJxYBiJGB_z0d41KdHuOzACXtaddU0qU"></script>