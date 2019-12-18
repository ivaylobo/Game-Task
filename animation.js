// ............ this is the animation section of my code ....................

(function(GDP, RotateCtrl) {


    // .............................  this method changes positions of the game objects .........................

    var gameFinished = false;

    gameObject.prototype.moveObjects = function(obj, inMotion) {

        var dom = obj.domName;

        if (inMotion) {
            clearTimeout(obj.moveInterval)
        }

        var speed = 1;

        if (dom === '.rocket') { // defines speed position and rotation of the rocket when before animate function

            speed = speed * 3;

            var degrees = GDP.sniper.rotation;

            dom = '#' + obj.identifier;

            document.querySelector(dom).style.top = document.querySelector(sniper.domName).offsetTop;
            document.querySelector(dom).style.left = document.querySelector(sniper.domName).offsetLeft;
            document.querySelector(dom).style.transform = 'rotate(' + degrees + 'deg)';

            GDP.rockets.push({ x: 0, y: 0, n: obj.identifier });
        }

        var leftP = GDP.mouse.x;
        var topP = GDP.mouse.y;

        if (dom === '.enemy') {
            dom = '#' + obj.identifier;
            speed = 0.2;
            leftP = GDP.sniper.x
            topP = GDP.sniper.y
        }

        function animateTo(dom_elem, x, y, finishedCallback) {
            var pos = {
                x: dom_elem.offsetLeft,
                y: dom_elem.offsetTop
            };

            var negativeX = x - pos.x < 0 ? true : false;
            var negativeY = y - pos.y < 0 ? true : false;

            function animate() {

                if (obj.domName === '#sniper') {

                    GDP.enemies.forEach(function(el, ind) {
                        elementObj = { n: '#' + el.n, x: el.x, y: el.y, i: 2 }
                        RotateCtrl.calulateAnge(elementObj, GDP.sniper);
                    });

                }

                if (obj.domName === '.rocket') {
                    var match = GDP.checkForMatch(GDP.rockets, GDP.enemies)
                    if (match) {
                        var enemy = match[1],
                            enemyID = enemy.n,
                            clearFromEnemiesArray = enemiesArray.findIndexOf('identifier', enemyID),
                            enemyKilled = new CustomEvent('EnemyKilled', { detail: { enemy, position: { leftP, topP } } });

                        enemiesArray.splice(clearFromEnemiesArray, 1)
                        enemy.domName = '.enemy';

                        document.dispatchEvent(enemyKilled);
                        clearTimeout(obj.moveInterval);
                        // finishedCallback();
                        // return
                    }
                }

                if (obj.domName === '.enemy') {
                    var match = GDP.checkForMatch(GDP.enemies, [GDP.sniper])
                    if (match && !gameFinished) {
                        var gameOver = new CustomEvent('GameOver');
                        document.dispatchEvent(gameOver);
                        gameFinished = true;
                    }
                }

                GDP.updatePositions(obj, pos.x, pos.y);
                var xToTarget = x - pos.x;
                var yToTarget = y - pos.y;

                xToTarget = negativeX ? Math.min(0, xToTarget) : Math.max(0, xToTarget);
                yToTarget = negativeY ? Math.min(0, yToTarget) : Math.max(0, yToTarget);

                if ((xToTarget == 0 && yToTarget == 0) || obj.switchAnimations) {

                    if (obj.domName === '#sniper') {
                        document.querySelector(obj.domName).classList.remove('inMotion');
                    }
                    clearTimeout(obj.moveInterval);
                    finishedCallback();
                    return
                }

                var scale = speed / Math.sqrt(Math.pow(xToTarget, 2) + Math.pow(yToTarget, 2));

                var delta_x = xToTarget * scale;
                var delta_y = yToTarget * scale;

                pos.x += delta_x;
                pos.y += delta_y;
                dom_elem.style.left = pos.x + 'px';
                dom_elem.style.top = pos.y + 'px';
                obj.moveInterval = setTimeout(animate, 1);
            }

            obj.moveTimeout = setTimeout(animate, 1);

        }

        animateTo(document.querySelector(dom), leftP, topP, clearAnimation)

        function clearAnimation() {
            var clearAnim = new CustomEvent('ClearAnimation', { detail: { obj, position: { leftP, topP } } });
            document.dispatchEvent(clearAnim);
            obj.animeCondition = false;
        }

    }

})(GameDynamicPositions, RotateController)