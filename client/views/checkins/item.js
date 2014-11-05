var timeRightNow = new ReactiveVar(new Date());

setInterval(function(){
    timeRightNow.set(new Date());
},1000);

Template.item.helpers({
    prettyCheckinTime : function(){
        return moment(this.created).from(timeRightNow.get(),true);
    },

    city : function(){
        return this.geography && this.geography.cityId;
    },

    platformIsIOS : function(){
        return this.device && this.device.platform === 'iOS';
    },

    platformIsAndroid : function(){
        return this.device && this.device.platform === 'Android';
    }
});