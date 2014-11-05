Template.leaderboard.rendered = function(){
    
    var that = this;

    var setLeaderboard = function(){
        
        var cities = that.data.cities.fetch(),
            content = '';

        _.each(cities, function(city, i){
            content += UI.toHTMLWithData(Template.city_stat, city);
        });
        that.$('.marquee-content').html(content);
    };

    setLeaderboard();

    this.$('.marquee').bind('finished', function(){
        setLeaderboard();
    }).marquee({
        duration: 20000,
        pauseOnHover: true
    });
};

UI.registerHelper('toLowerCase', function(value) {
    if (value && typeof value === 'string') {
        return value.toLowerCase();
    } else {
        return '';
    }
});