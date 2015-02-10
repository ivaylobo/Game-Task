// ....................  this is the control section of my code, where I define main objects and events ....................

function gameObject (margin, number, domName, cond, identifier, cond){ // defines game objects
	this.leftMargin = margin;
	this.picturesNumber = number;
	this.domName = domName;
    this.animeCondition = cond;
    this.identifier = identifier;
};

var sniper = new gameObject(53, 8, '#sniper', true);
var rocket = new gameObject(26, 4, '.rocket', true, 0);
var explosion = new gameObject(128, 31, '.explosion', true);

function gameEventController(obj, leftPos, topPos){ // controls events started from other game events

    switch(obj.domName){

    case '.rocket':

       var newExplosion = explosion.createEl(explosion); // create new 'explosion' object 
       

        $('#'+newExplosion.identifier).css({  // place the 'explosion' object 
            display: 'block',
            left: leftPos,
            top: topPos
        });
    
        newExplosion.animateObject(newExplosion, 1); // animate the created 'explosion' object


        obj.destroy(obj); // destroy rocket, when explosion starts


        break;

    default:

        break;

        };

}

$(document).ready(function() {
    $('.container').mousedown(function(event) { // mouse event controller
        switch (event.which) {
            case 3:
                sniper.animeCondition = true;
                sniper.animateObject(sniper, 2);
                sniper.moveObjects(sniper);
                break;
            case 1:
                var newRocket = rocket.createEl(rocket);

                newRocket.animeCondition = true;
                newRocket.animateObject(newRocket, 3);
                newRocket.moveObjects(newRocket);
                break;
            default:
                alert('Mouse problem!');
        }
        
    });



});
