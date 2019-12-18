// ...........this method gets the position of the mouse and rotates sniper in direction of the position ...........

var RotateController = (function(GDP) {

    var degrees;

    return {
        calulateAnge: function(el, target) { // this function calculates the angle between object and mouse and rotates the object

            var cathetus1 = target['x'] - el['x'];
            var cathetus2 = target['y'] - el['y'];
            var hypo = 0;

            if (el['y'] > target['y']) {
                var cathetus1 = el['x'] - target['x'];
                var cathetus2 = el['y'] - target['y'];


                hypo = Math.sqrt((cathetus1 * cathetus1) + (cathetus2 * cathetus2));
                degrees = (Math.acos(cathetus1 / hypo)) * 57.2957795 + 270;
            } else {
                hypo = Math.sqrt((cathetus1 * cathetus1) + (cathetus2 * cathetus2));
                degrees = (Math.acos(cathetus1 / hypo)) * 57.2957795 + 90;
            };

            if (el.n === '#sniper') {
                GDP.sniper.rotation = degrees;
            }

            document.querySelector(el['n']).style.transform = 'rotate(' + degrees + 'deg)';

        }
    }

})(GameDynamicPositions);