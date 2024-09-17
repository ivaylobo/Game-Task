// ....................  this is the control section of my code, where I define main objects and events ....................

class gameObject { // defines game objects
    constructor(domName, cond, identifier, moveInterval) {
        this.domName = domName;
        this.animeCondition = cond;
        this.identifier = identifier;
        this.moveInterval = moveInterval;
    }
};


const sniper = new gameObject('#sniper', true),
    rocket = new gameObject('.rocket', true),
    explosion = new gameObject('.explosion', true),
    enemy = new gameObject('.enemy', true);
let killedEnemiesCount = 0,
    enemiesSpeed = 0.1,
    level = 1,
    showingSpeed = 1000


const gameEventController = function(obj, leftPos, topPos, evName) { // controls events started from other game events

    let fireExplosion = () => {

        let newExplosion = explosion.createEl(explosion), // create new 'explosion' object 
            index = GameDynamicPositions.rockets.findIndexOf('n', obj.identifier);

        document.querySelector(`#${newExplosion.identifier}`).style.cssText = `display: block; left:  ${leftPos}; top: ${topPos}`;

        obj.animeCondition = false;

        document.querySelector(`#${newExplosion.identifier}`).classList.add('animate');

        setTimeout(function() {
            newExplosion.removeHTML(newExplosion);
        }, 800)

        obj.removeHTML(obj); // destroy rocket, when explosion starts

        GameDynamicPositions.rockets.splice(index, 1);
    }

    const redirectMovingObject = () => {

        document.querySelector(obj.domName).style.backgroundPosition = '0 0';

    }

    const deleteEnemy = () => {

        let index = GameDynamicPositions.enemies.findIndexOf('n', obj.n);

        document.querySelector(`#${obj.n}`).remove();

        GameDynamicPositions.enemies.splice(index, 1);
    }

    if (obj.domName === '.rocket' && evName === 'ClearAnimation') {

        fireExplosion()

    } else if (obj.domName === '#sniper' && evName === 'ClearAnimation') {

        redirectMovingObject()

    } else if (obj.domName === '.enemy' && evName === 'EnemyKilled') {

        deleteEnemy()

    } else if (evName === 'GameOver') {

        if (obj) {
            GameActionsCtrl.finishGame(true);
            return
        }
        GameActionsCtrl.finishGame(false);

    }

};

const displayController = (() => {
    return {
        displayKilledEnemies: () => {
            killedEnemiesCount++;
            document.querySelector('#enemies-count').innerHTML = killedEnemiesCount;
        },

        displayLevel: (lev) => {
            level = lev;
            document.querySelector('#level').innerHTML = level;
        }
    }
})()

document.addEventListener('ClearAnimation', (e) => {

    gameEventController(e.detail.obj, e.detail.position.leftP, e.detail.position.topP, 'ClearAnimation');

});

document.addEventListener('EnemyKilled', (e) => {
    gameEventController(e.detail.enemy, e.detail.position.leftP, e.detail.position.topP, 'EnemyKilled');
    displayController.displayKilledEnemies();

    if (killedEnemiesCount == 51) {
        enemiesSpeed = 0.2;
        displayController.displayLevel(2);
        showingSpeed = 700;
    }

    if (killedEnemiesCount == 101) {
        enemiesSpeed = 0.3;
        displayController.displayLevel(3);
        showingSpeed = 600;
    }

    if (killedEnemiesCount == 151) {
        enemiesSpeed = 0.4;
        displayController.displayLevel(4);
        showingSpeed = 500;
    }

    if (killedEnemiesCount == 201) {
        enemiesSpeed = 0.5;
        displayController.displayLevel(5);
        showingSpeed = 400;
    }

    if (killedEnemiesCount == 251) {
        enemiesSpeed = 0.6;
        displayController.displayLevel(6);
        showingSpeed = 300;
    }

    if (killedEnemiesCount == 301) {
        enemiesSpeed = 0.7;
        displayController.displayLevel(7);
        showingSpeed = 200;
    }

    if (killedEnemiesCount == 351) {
        enemiesSpeed = 0.8;
        displayController.displayLevel(8);
        showingSpeed = 100;
    }

    if (killedEnemiesCount == 400) {
        const gameOver = new CustomEvent('GameOver', { detail: true });
        document.dispatchEvent(gameOver);
        gameFinished = true;
    }
});

document.addEventListener('GameOver', (e) => {
    gameEventController(e.detail, 0, 0, 'GameOver');
});

document.addEventListener('EarlierExplosion', (e) => {
    gameEventController(e.detail.obj, e.detail.position.posX, e.detail.position.posY, 'ClearAnimation');
});



const UserEventsController = ((RotateCtrl) => {

    const container = document.querySelector('.container');

    let onMouseDown = (event) => { // mouse event controller
        switch (event.keyCode || event.which) {
            case 3:
                moveSniper()

                break;
            case 1:
                onMouseMove(event);
                const newRocket = rocket.createEl(rocket);
                newRocket.animeCondition = true;
                newRocket.moveObjects(newRocket);
                break;
            default:
                alert('Mouse problem!');
        }

    };

    let direction;

    document.body.addEventListener('keydown', (e) => {
        if (e.keyCode == 32) {
            GameActionsCtrl.pauseGame();
        } else if (e.keyCode == 39) {
            const rightTo = document.querySelector('.container').offsetWidth;
            moveSniper({ left: rightTo, top: GameDynamicPositions.sniper.y })
            direction = 'right'
        } else if (e.keyCode == 37) {
            moveSniper({ left: 1, top: GameDynamicPositions.sniper.y })
            direction = 'left'
        } else if (e.keyCode == 38) {
            moveSniper({ left: GameDynamicPositions.sniper.x, top: 1 })
            direction = 'top'
        } else if (e.keyCode == 40) {
            const topTo = document.querySelector('.container').offsetHeight
            moveSniper({ left: GameDynamicPositions.sniper.x, top: topTo })
            direction = 'bottom'
        }


    });

    document.body.addEventListener('keyup', (e) => {
        if ((e.keyCode == 39 && direction == 'right') ||
            (e.keyCode == 37 && direction == 'left') ||
            (e.keyCode == 38 && direction == 'top') ||
            (e.keyCode == 40) && direction == 'bottom') {
            moveSniper({ left: GameDynamicPositions.sniper.x, top: GameDynamicPositions.sniper.y })
        }

    });

    let moveSniper = (direction) => {

        if (!sniper.animeCondition) {
            sniper.animeCondition = true;
            sniper.moveObjects(sniper, -1, direction);
        } else {
            sniper.moveObjects(sniper, 1, direction);
        }

        document.querySelector(sniper.domName).classList.add('inMotion');
    }

    const onMouseMove = (e) => {

        GameDynamicPositions.mouse = { x: e.pageX, y: e.pageY, i: 1 };
        const element = sniper.domName;
        let elementObj;

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
            });
        }
    }
})(RotateController);

UserEventsController.init();