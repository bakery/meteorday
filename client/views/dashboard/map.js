Template.map.rendered = function(){
    var $mapContainer = this.$('#map');
    var fsvg = d3.select(this.$('svg')[0]);
    var feature = fsvg.selectAll("path.feature");
    var projection = d3.geo.mercator();
    var path = d3.geo.path()
        .projection(projection);
    var zoom = d3.behavior.zoom();
    var circle;
        // .on("zoom", function() {
        //     projection.translate(d3.event.translate).scale(d3.event.scale);
        //     feature.attr("d", path);
        //     circle.attr("transform", ctr);
        // });

    var particleUrl = "/particle.png";
    var particle = new Image();
    particle.src = "data:image/png;base64,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";

    var that = this;
    

    function request(error, data) {
        var l, a, b;
        projects = {};
        countriesCounter = 0;
        countries = {};
        countryByIndex = [];
        failCountryCoord = {length : 0};
        needPaintCapital = [];

        // data = data.map(initItem);
        // l = data.length;
        // sizes.domain(d3.extent(data));

        // _data = [];
        // while(--l > -1) {
        //     a = data[l];
        //     a.size = sizes(+a);
        //     b = clone(a);
        //     a.parent = a.supplier;
        //     b.parent = b.borrower;
        //     a.date = a.date - stepDate /*/2*/;
        //     _data.push(a);
        //     _data.push(b);
        // }
        // _data.sort(sortByCSD);

        w = $mapContainer.width();
        h = $mapContainer.height();

        projection
            .scale(w/6.5)
            .translate([w / 2, h / 1.6])
        ;

        zoom.translate(projection.translate())
            .scale(projection.scale())
            .scaleExtent([h / 6, h])
        ;

        feature.attr("d", path);

        // fsvg.selectAll("circle").remove();

        // circle = fsvg.selectAll("circle")
        //     .data(needPaintCapital)
        //     .enter()
        //     .append("circle")
        //     .attr("r", 1)
        //     .attr("fill", "#fff")
        //     .attr("transform", ctr);
    }

    function updateCheckins(checkins, canvas){
        canvas.selectAll("image").data(checkins, function(d){ return d._id; }).enter()
            .append('image').attr('xlink:href',particleUrl)
                .attr('height','50px').attr('width','50px')
                .attr("transform", function(d) {
                    return "translate(" + projection([d.longitude, d.latitude]) + ")";
                }).transition().duration(750)
                .delay(function(d, i) { return i * 10; })
                .attr("transform", function(d) {
                    return "translate(" + projection([-77.04,38.90]) + ")";
                }).each("end",function() {
                    d3.select(this).
                      transition().attr("width", "0px");
                });
    }

    function updateCities(cities, canvas){

        console.log('updating cities');
        var color = d3.scale.linear().domain([0,10,20])
            .range(["red", "white", "green"]);
        var dimensions = d3.scale.linear().domain([0,20])
            .range([1,5]);


        var selection = canvas.selectAll('image').data(cities, function(d){ return d._id; });
        
        selection.enter().append('image').attr('xlink:href',particleUrl)
            .attr('width', '10px')
            .attr('height', '10px')
            .attr("transform", function(d) {
                return "translate(" + projection([d.longitude, d.latitude]) + ")";
            }).append("svg:title")
                .text(function(d, i) { return d.name + '-' + d.country; });

        selection.attr("fill", function(d){ return color(d.counter); })
            .attr("alt", function(){ return "hello there"; })
            .attr("transform", function(d){
                var scale = dimensions(d.counter);
                return [
                    "translate(" + projection([d.longitude, d.latitude]) + ")",
                    "scale(" + scale + "," + scale + ")"
                ].join(' ');
            });
            

            // .append('image').attr('xlink:href',particleUrl)
            //     .attr('height','10px').attr('width','10px')
            //     .attr("transform", function(d) {
            //         return "translate(" + projection([d.longitude, d.latitude]) + ")";
            //     }).transition().duration(750)
            //     .delay(function(d, i) { return i * 10; })
            //     .attr("transform", function(d) {
            //         return "translate(" + projection([-77.04,38.90]) + ")";
            //     }).each("end",function() {
            //         d3.select(this).
            //           transition().attr("width", "0px");
            //     });
    }

    d3.json("/world-countries.json", function (error, collection) {

        feature = feature.data(collection.features).enter().append("path")
            .attr("class", "feature");

        // d3.json("/capitals.json", function (error, capitals){
        //     circle = fsvg.selectAll("circle")
        //     .data(capitals)
        //     // .enter().append("circle")
        //     // .attr("r", 1)
        //     // .attr("fill", "#fff")
        //     // .attr("transform", function(d) {
        //     //     return "translate(" + projection([d.longitude, d.latitude]) + ")";
        //     // });
        //     .enter().append('image').attr('xlink:href',particleUrl)
        //     .attr('height','50px').attr('width','50px') .attr("transform", function(d) {
        //         return "translate(" + projection([d.longitude, d.latitude]) + ")";
        //     }).transition()
        //         .duration(750)
        //         .delay(function(d, i) { return i * 10; })
        //         .attr("transform", function(d) {
        //             return "translate(" + projection([-77.04,38.90]) + ")";
        //         }).each("end",function() {
        //             d3.select, function(d){ return d._id; }(this).
        //               transition().attr("width", "0px");
        //         });
        // });

        request(null, {});
        
        that.autorun(function(){
            updateCheckins(that.data.checkins.fetch(), fsvg);
            updateCities(that.data.cities.fetch(), fsvg);
        });
    });
};

//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDeJxYBiJGB_z0d41KdHuOzACXtaddU0qU"></script>