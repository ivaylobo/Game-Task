// ...........this method gets the position of the mouse and rotates sniper in direction of the position ...........


$(document).ready(function() {

	$('.container').mousemove(
		function getMousePosition (e){ 

	        $("#logX").text(e.pageX);  // position of the mouse
	        $("#logY").text(e.pageY);

	        var mouse = {x: e.pageX, y: e.pageY, i: 1};
	        
	        findElementPosition(sniper.domName, mouse)

	}); 


	function findElementPosition(element, mouse){
		var position = $(element).position();       // position of the element (sniper)

		elementObj = {n:element, x: position.left, y: position.top, i: 2}

		calulateAnge (elementObj, mouse);
	};


	var rotation = 0;


	
	function calulateAnge (el, mou){    // this function calculates the angle between object and mouse and rotates the object

		var cathetus1 = mou['x'] - el['x'];
		var cathetus2 = mou['y'] - el['y'];
		var hypo = 0;

		if(el['y']>mou['y']){
			var cathetus1 = el['x'] - mou['x'];
			var cathetus2 = el['y'] - mou['y'];


		hypo = Math.sqrt((cathetus1*cathetus1)+(cathetus2*cathetus2));
		var degrees = (Math.acos(cathetus1/hypo))*57.2957795+270;
		}

		else{
		hypo = Math.sqrt((cathetus1*cathetus1)+(cathetus2*cathetus2));
		var degrees = (Math.acos(cathetus1/hypo))*57.2957795+90;
		};

		$('#rot').text(degrees);	

		$('#hypo').text(hypo);


		$(el['n']).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});

		};

});