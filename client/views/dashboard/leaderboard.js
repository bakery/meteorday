Template.leaderboard.rendered = function(){
    
    var cities = this.data.cities,
        that = this;

    var setLeaderboard = function(){
        var  content = "Top Cities: ";
        _.each(cities.fetch(), function(city, i){
            content += (i+1)+'.'+' '+city.name+' ('+city.counter+') - ';
        });
        content = content.substring(0, content.length - 2);
        that.$('.marquee-content').html(content);
    };

    setLeaderboard();
    this.$('.marquee').bind('finished', function(){
        setLeaderboard();
    }).marquee({
        duration: 5000,
        pauseOnHover: true
    });
};