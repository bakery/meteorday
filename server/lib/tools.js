Tools = {
    slugify: function(str){
        return str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    },
    getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};