//var __mapLoadedCallback =  

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
	var map = new google.maps.Map(this.$('.map-canvas')[0],mapOptions);
};

Template.map.created = function(){
	__mapsAreInitialized = _.bind(__mapsAreInitialized, this);
};

Template.map.rendered = function(){
	__loadGoogleMaps();
};

//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDeJxYBiJGB_z0d41KdHuOzACXtaddU0qU"></script>