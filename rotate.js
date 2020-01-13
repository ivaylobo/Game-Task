// ...........this method gets the position of the mouse and rotates sniper in direction of the position ...........

const RotateController = (function(GDP) {

    let degrees;

    return {
        calulateAnge: function(el, target) { // this function calculates the angle between object and mouse and rotates the object

            let cathetus1 = target['x'] - el['x'];
            let cathetus2 = target['y'] - el['y'];
            let hypo = 0;

            if (el['y'] > target['y']) {
                let cathetus1 = el['x'] - target['x'];
                let cathetus2 = el['y'] - target['y'];


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