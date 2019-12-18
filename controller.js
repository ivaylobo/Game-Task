// ....................  this is the control section of my code, where I define main objects and events ....................

function gameObject(domName, cond, identifier, cond, moveInterval) { // defines game objects
    this.domName = domName;
    this.animeCondition = cond;
    this.identifier = identifier;
    this.moveInterval = moveInterval;
};


var sniper = new gameObject('#sniper', true);
var rocket = new gameObject('.rocket', true);
var explosion = new gameObject('.explosion', true);
var enemy = new gameObject('.enemy', true);


var gameEventController = function(obj, leftPos, topPos, evName) { // controls events started from other game events

    if (obj.domName === '.rocket' && evName === 'ClearAnimation') {

        fireExplosion()

    } else if (obj.domName === '#sniper' && evName === 'ClearAnimation') {

        redirectMovingObject()

    } else if (obj.domName === '.enemy' && evName === 'EnemyKilled') {

        deleteEnemy()

    } else if (evName === 'GameOver') {

        finishGame()

    }

    function fireExplosion() {

        var newExplosion = explosion.createEl(explosion); // create new 'explosion' object 

        document.querySelector('#' + newExplosion.identifier).style.cssText = 'display: block; left: ' + leftPos + '; top:' + topPos;

        obj.animeCondition = false;

        document.querySelector('#' + newExplosion.identifier).classList.add('animate');

        setTimeout(function() {
            newExplosion.removeHTML(newExplosion);
        }, 800)

        obj.removeHTML(obj); // destroy rocket, when explosion starts

        var index = GameDynamicPositions.rockets.findIndexOf('n', obj.identifier);

        GameDynamicPositions.rockets.splice(index, 1);
    }

    function redirectMovingObject() {

        document.querySelector(obj.domName).style.backgroundPosition = '0 0';

    }

    function deleteEnemy() {

        document.querySelector('#' + obj.n).remove();

        var index = GameDynamicPositions.enemies.findIndexOf('n', obj.n);

        GameDynamicPositions.enemies.splice(index, 1);
    }

    function finishGame() {

        alert('Game Over!')
        window.location.reload()

    }

};

document.addEventListener('ClearAnimation', function(e) {

    gameEventController(e.detail.obj, e.detail.position.leftP, e.detail.position.topP, 'ClearAnimation');

});

document.addEventListener('EnemyKilled', function(e) {
    gameEventController(e.detail.enemy, e.detail.position.leftP, e.detail.position.topP, 'EnemyKilled');
});

document.addEventListener('GameOver', function(e) {
    gameEventController(0, 0, 0, 'GameOver');
});


var MouseEventsController = (function(RotateCtrl) {

    var container = document.querySelector('.container');

    function onMouseDown(event) { // mouse event controller
        switch (event.keyCode || event.which) {
            case 3:
                if (!sniper.animeCondition) {
                    sniper.animeCondition = true;
                    sniper.moveObjects(sniper);
                } else {
                    sniper.moveObjects(sniper, 1);
                }

                document.querySelector(sniper.domName).classList.add('inMotion');

                break;
            case 1:
                var newRocket = rocket.createEl(rocket);
                newRocket.animeCondition = true;
                newRocket.moveObjects(newRocket);
                break;
            default:
                alert('Mouse problem!');
        }

    };

    function onMouseMove(e) {

        GameDynamicPositions.mouse = { x: e.pageX, y: e.pageY, i: 1 };
        var element = sniper.domName;
        var elementObj;

        elementObj = { n: element, x: document.querySelector(element).offsetLeft, y: document.querySelector(element).offsetTop, i: 2 }

        RotateCtrl.calulateAnge(elementObj, GameDynamicPositions.mouse);


    }

    return {

        init: function() {
            container.addEventListener('mousedown', function(event) {
                onMouseDown(event);
            });
            container.addEventListener('mousemove', function(event) {
                onMouseMove(event);
            })
        },
    }
})(RotateController);

MouseEventsController.init();