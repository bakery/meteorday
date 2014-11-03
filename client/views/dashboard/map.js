Template.map.rendered = function(){
    var $mapContainer = this.$('#map');
    var particleUrl = "/particle.png";
    var that = this;
    var theMap = new Datamap({
        element: this.$('#map')[0],
        scope: 'world',
        projection: 'mercator',
        geographyConfig: {
            popupOnHover: false,
            highlightOnHover: false
        },
        fills: {
            defaultFill: '#2C2C43'
        }
    });

    theMap.addPlugin('showCities', function ( layer, data ) {  
        // hold this in a closure
        var self = this;
        // a class you'll add to the DOM elements
        var className = 'cities';

        // make a D3 selection.
        var cities = layer
               .selectAll(className)
               .data( data, function(d){ return d._id; });

        cities.enter().append('image').attr('xlink:href',particleUrl)
            .attr('width', '10px')
            .attr('height', '10px')
            .attr('x', function ( datum ) {
                var latLng = self.latLngToXY(datum.latitude, datum.longitude);
                return latLng[0] - 5; // 5 === 10px/2
            })
            .attr('y', function ( datum ) {
                var latLng = self.latLngToXY(datum.latitude, datum.longitude);
                return latLng[1] - 5; // 5 === 10px/2
            })
            .append("svg:title")
                .text(function(d, i) { return d.name + '-' + d.country; });
    });

    theMap.addPlugin('showCheckins', function ( layer, data ) {
        // hold this in a closure
        var self = this;
        // a class you'll add to the DOM elements
        var className = 'checkins';

        // make a D3 selection.
        var checkins = layer.selectAll(className)
            .data( data, function(d){ return d._id; });

        checkins.enter().append('image').attr('xlink:href',particleUrl)
            .attr('height','50px').attr('width','50px')
            .attr('x', function ( datum ) {
                var latLng = self.latLngToXY(datum.latitude, datum.longitude);
                return latLng[0] - 25; // 25 === 50px/2
            })
            .attr('y', function ( datum ) {
                var latLng = self.latLngToXY(datum.latitude, datum.longitude);
                return latLng[1] - 25; // 25 === 50px/2
            })
            .transition().duration(750)
            .delay(function(d, i) { return i * 10; })
            .attr('x',0).attr('y',0)
            .attr("transform", function(d) {
                return "translate(" + self.latLngToXY(38.90,-77.04) + ")";
            }).each("end",function() {
                d3.select(this).
                  transition().attr("width", "0px");
            });
    });

    this.autorun(function(){
        theMap.showCities(that.data.cities.fetch());
        theMap.showCheckins(that.data.checkins.fetch());
    });
};