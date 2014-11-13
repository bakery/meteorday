var checkins = new ReactiveVar([]);
var stats = new ReactiveVar([]);
var simulationProgress = new ReactiveVar(0);

PlaybackController = DesktopController.extend({
    template: 'playback',

    waitOn: function () {
        return [
            Meteor.subscribe('playback-checkins',430),
            Meteor.subscribe('city-stats')
        ];
    },

    data: function () {
        return {
            checkins : checkins,
            cities : stats,
            simulationProgress : simulationProgress
        };
    },

    action : function(){

        var that = this;

        if(this.ready()){

            var realCheckins = _.filter(Checkins.find({},{ sort : {
                created : 1
            }}).fetch(), function(c){ return c.geography; });

            var realStats = getAllCityStats().fetch();

            stats.set(_.map(realStats, function(s){
                return _.extend(s, { counter : 0 });
            }));


            // find max and mix created timestamps
            // in ms
            
            var simulationDuration = 60*1000;
            var simulationTimeScale = d3.scale.linear()
                .domain([0, simulationDuration])
                .range([0, 100]);

            var timestamps = _.pluck(realCheckins, 'created');
            var minTimestamp = _.min(timestamps, function(t){
                return moment(t).valueOf();
            });
            var maxTimestamp = _.max(timestamps, function(t){
                return moment(t).valueOf();
            });

            // scale stamps accross 1 minute
            
            var time = d3.scale.linear()
                .domain([0, simulationDuration])
                .range([minTimestamp, maxTimestamp]);

            var cnt = 0;

            var intervalId = setInterval(function(){
                var t = time(cnt*100);
                var currentCheckins = checkins.get();
                var currentCheckinIds = _.pluck(currentCheckins, '_id');

                simulationProgress.set(
                    simulationTimeScale(cnt*100)
                );


                if(cnt <= simulationDuration/100){
                    
                    var currentStats = stats.get();

                    var newCheckins = _.filter(realCheckins, function(c){
                        return (moment(c.created).valueOf() <= t) &&
                            currentCheckinIds.indexOf(c._id) === -1;
                    });

                    _.each(newCheckins, function(c){
                        currentCheckins.push(c);
                        
                        // update stats
                        if(c.geography && c.geography.cityId){
                            var stat = _.find(currentStats, function(cs){
                                return cs._id === c.geography.cityId;
                            });

                            if(stat){
                                stat.counter = stat.counter + 1;
                            }
                        }
                    });
                    
                    stats.set(currentStats);

                    checkins.set(currentCheckins);
                    cnt++;
                } else {
                    clearInterval(intervalId);
                }
            },100);

            this.render();
        }
    }
});