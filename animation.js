
// ............ this is the animation section of my code ....................



$(document).ready(function() {
	
		var animate = 0;
		var animateSniper = 0;
		var animateRocket = 0;
		var animateExplosion = 0;
		var animateExplosionArray = {};


		function ajustObj(obj) { // keeps animation properties of diferent objects separated

			var marg = obj.leftMargin;
			var name = obj.domName;
			var count = obj.picturesNumber;

			switch(name){
				case '#sniper':
					animateSniper+=marg;
					animate = animateSniper;
					break
				case '.rocket':
					animateRocket+=marg;
					animate = animateRocket;
					break
				case '.explosion':

					if(animateExplosionArray[obj.identifier]){ 					// if that explosion already exists
					animateExplosion = animateExplosionArray[obj.identifier]; 	// save it's background position to array,
					animateExplosion+=marg; 									// change backgroun podition of current explosion,
					animate = animateExplosion; 								// set it to be returned

					}
					else{
					animateExplosion+=marg;
					animate = animateExplosion;

					}

					animateExplosionArray[obj.identifier] = animate;

					break
				default:
					animateSniper = 0;					
				break;
			}

			if(name === '.explosion' && marg*count<animate){
				animateExplosion = 0;
				animate = 0;
			}
			return animate;
		}

		gameObject.prototype.animateObject = function (obj, num) { // animation function


			var name = obj.domName;
			var objCount = obj.picturesNumber;
			var objMargin = obj.leftMargin;

			var speedAnime = 100;

			animate = ajustObj(obj);
	

			if(obj.animeCondition === false){     // defines if the object have to be animated
				$(name).css({
				'background-position': '0px '+'0px'
				});
				ajustObj(obj.leftMargin, 5);		// restart sniper animation
				animate = 0;
				return;
			}

		 	if(num !== 1){                   // Defines if the function is called from recurtion, 
				if(animate>objMargin){		 // if not, defines if the function is already executing
					return;
				}

			}	

			if(obj.domName !== '#sniper'){

				speedAnime = 30;
			}

			if(name === '.explosion'){               // if the object is explosion, set it's id for the animation

				if(((objCount-1)*objMargin)<animate){ // if the animation finishes, destroy DOM object and set animation condition to false
					
					obj.destroy(obj);
				};

				name = $("#"+obj.identifier)
			}


			$(name).css({
				'background-position': animate +'px '+'0px'

			});	

				setTimeout(function (){obj.animateObject(obj, 1);}, speedAnime);
				
		};



// .............................  this method changes positions of the game objects .........................




gameObject.prototype.moveObjects = function(obj){

	var dom = obj.domName;

	if(obj.domName === '#sniper'){ // to remember the position of sniper if other object moves


	var left = $(dom).position.x;   
	var top = $(dom).position.y;

	$(dom).stop(10);

	$(dom).position.x = left;
	$(dom).position.y = top;

	}

	var distance = $('#hypo').text();

	var speed = distance*5;

	if(dom === '.rocket'){ // defines speed position and rotation of the rocket when before animate function


		speed = speed/5;

		var degrees = $('#rot').text();

		dom = '#'+obj.identifier;

		$(dom).css({
			top: $(sniper.domName).offset().top,
			left:  $(sniper.domName).offset().left,
			'-webkit-transform' : 'rotate('+ degrees +'deg)',
             '-moz-transform' : 'rotate('+ degrees +'deg)',
             '-ms-transform' : 'rotate('+ degrees +'deg)',
             'transform' : 'rotate('+ degrees +'deg)'

		});


	}
		var leftP = $("#logX").text();
		var topP = $("#logY").text();

		$(dom).animate({ //  animates the movement of every game object
			left: leftP,
			top: topP
		},
			speed, 'linear', function(){
				if(obj.domName === '#sniper'){       // when the object is animated, if it is 'sniper' - stop animate, if it is rocket, go to controler method
					sniper.animeCondition = false;
				}
				else{
					obj.animeCondition = true;
					gameEventController(obj, leftP, topP );
				}
			
		});
	}

});

