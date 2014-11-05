var timeRightNow = new ReactiveVar(new Date());

setInterval(function(){
    timeRightNow.set(new Date());
},1000);

Template.item.helpers({
    prettyCheckinTime : function(){
        return moment(this.created).from(timeRightNow.get());
    },

    city : function(){
        return this.geography && this.geography.cityId;
    }
});