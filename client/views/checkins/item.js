Template.item.helpers({
    prettyCheckinTime : function(){
        return moment(this.created).fromNow();
    }
});