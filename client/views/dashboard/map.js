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

    theMap.addPlugin('showCities', function (layer, data ) {

        var maxCounter = _.max(data, function(d){ return d.counter; }).counter;
        var scales = d3.scale.linear().domain([0,maxCounter]).range([1,10]);
        var calculateSize = function(value,scales){
            var baseSize = 10;
            var scaling = Math.floor(scales(value));
            return baseSize*scaling;
        };
        var self = this;
        var className = 'cities';
        var cities = layer.selectAll('.' + className).data(data, function(d){
            return d._id;
        });


        // inserts
        cities.enter().append('image').attr('xlink:href',particleUrl)
            .attr('class', className).append("svg:title")
                .text(function(d, i) { return d.name + '-' + d.country; });

        // updates        
        cities
            .attr('width', function(d){
                var size = calculateSize(d.counter,scales);
                return size + 'px';
            })
            .attr('height', function(d){
                var size = calculateSize(d.counter,scales);
                return size + 'px';
            })
            .attr('x', function(d){
                var size = calculateSize(d.counter,scales);
                var latLng = self.latLngToXY(d.latitude, d.longitude);
                return latLng[0] - Math.floor(size/2);
            })
            .attr('y', function(d){
                var size = calculateSize(d.counter,scales);
                var latLng = self.latLngToXY(d.latitude, d.longitude);
                return latLng[1] - Math.floor(size/2);
            });
    });

    theMap.addPlugin('showCheckins', function (layer, data ) {
        // hold this in a closure
        var self = this;
        // a class you'll add to the DOM elements
        var className = 'checkins';

        // make a D3 selection.
        var checkins = layer.selectAll('.' + className)
            .data( data, function(d){ return d._id; });

        checkins.enter().append('image').attr('xlink:href',particleUrl)
            .attr('class', className)
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