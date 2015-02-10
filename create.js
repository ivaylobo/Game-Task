// .................................................this method creates new game objects.........................................

$(document).ready(function() {

	var rocketIdentifier = 0;
	var explosionIdentifier = 0;

	gameObject.prototype.createEl = function (el){


		var newElement = new gameObject(el.leftMargin, el.picturesNumber , el.domName, el.animeCondition); // new game object

		if(el.domName === '.rocket'){  // object of type rocket
			$('<div/>', {
			    id: rocketIdentifier,
			    class: 'rocket'
			}).appendTo('.container');

			newElement.identifier = rocketIdentifier;

			rocketIdentifier ++;
		}

		else if(el.domName === '.explosion'){  // object of type explosion
			$('<div/>', {
			    id: 'e'+explosionIdentifier,
			    class: 'explosion'
			}).appendTo('.container');

			newElement.identifier = 'e'+explosionIdentifier;

			explosionIdentifier++;
		};

		return newElement;
	};





// ...................... this method destroys game objects ............................




	gameObject.prototype.destroy = function (el){

		$("#" +el.identifier).remove();

	};

});