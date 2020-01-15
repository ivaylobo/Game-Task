// ............ this is the animation section of my code ....................

((GDP, RotateCtrl) => {


    // .............................  this method changes positions of the game objects .........................

    let gameFinished = false;

    gameObject.prototype.moveObjects = (obj, inMotion, direction = false) => {

        let dom = obj.domName;

        if (inMotion) {
            clearTimeout(obj.moveInterval)
        }

        let speed = 1;

        if (dom === '.rocket') { // defines speed position and rotation of the rocket when before animate function

            speed = speed * 3;

            let degrees = GDP.sniper.rotation;

            dom = `#${obj.identifier}`;

            document.querySelector(dom).style.top = document.querySelector(sniper.domName).offsetTop;
            document.querySelector(dom).style.left = document.querySelector(sniper.domName).offsetLeft;
            document.querySelector(dom).style.transform = `rotate(${degrees}deg)`;

            GDP.rockets.push({ x: 0, y: 0, n: obj.identifier });
        }

        let leftP = direction.left ? direction.left : GDP.mouse.x;
        let topP = direction.top ? direction.top : GDP.mouse.y;

        if (dom === '.enemy') {
            dom = `#${obj.identifier}`;
            speed = 0.4 + enemiesSpeed;

            leftP = GDP.sniper.x
            topP = GDP.sniper.y
        }

        let animateTo = (dom_elem, x, y, finishedCallback) => {
            let pos = {
                x: dom_elem.offsetLeft,
                y: dom_elem.offsetTop
            };

            let negativeX = x - pos.x < 0 ? true : false;
            let negativeY = y - pos.y < 0 ? true : false;

            let animate = () => {

                if (obj.domName === '#sniper') {

                    GDP.enemies.forEach((el) => {
                        elementObj = { n: `#${el.n}`, x: el.x, y: el.y, i: 2 }
                        RotateCtrl.calulateAnge(elementObj, GDP.sniper);
                    });

                }

                if (obj.domName === '.rocket') {

                    let match = GDP.checkForMatch(GDP.rockets, GDP.enemies);
                    if (match && match[0].n === obj.identifier) {
                        let enemy = match[1],
                            enemyID = enemy.n,
                            posX = pos.x,
                            posY = pos.y,
                            clearFromEnemiesArray = enemiesArray.findIndexOf('identifier', enemyID),
                            enemyKilled = new CustomEvent('EnemyKilled', { detail: { enemy, position: { leftP, topP } } }),
                            explosionE = new CustomEvent('EarlierExplosion', { detail: { obj, position: { posX, posY } } });

                        enemiesArray.splice(clearFromEnemiesArray, 1)
                        enemy.domName = '.enemy';

                        document.dispatchEvent(enemyKilled);
                        document.dispatchEvent(explosionE);
                        clearTimeout(obj.moveInterval);
                        return
                    }
                }

                if (obj.domName === '.enemy') {
                    let match = GDP.checkForMatch(GDP.enemies, [GDP.sniper])
                    if (match && !gameFinished) {
                        let gameOver = new CustomEvent('GameOver', { detail: false });
                        document.dispatchEvent(gameOver);
                        gameFinished = true;
                    }
                }

                GDP.updatePositions(obj, pos.x, pos.y);
                let xToTarget = x - pos.x;
                let yToTarget = y - pos.y;

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

                let scale = speed / Math.sqrt(Math.pow(xToTarget, 2) + Math.pow(yToTarget, 2));

                let delta_x = xToTarget * scale;
                let delta_y = yToTarget * scale;

                pos.x += delta_x;
                pos.y += delta_y;
                dom_elem.style.left = `${pos.x}px`;
                dom_elem.style.top = `${pos.y}px`
                obj.moveInterval = setTimeout(animate, 1);
            }

            obj.moveTimeout = setTimeout(animate, 1);

        }

        let clearAnimation = () => {
            const clearAnim = new CustomEvent('ClearAnimation', { detail: { obj, position: { leftP, topP } } });
            document.dispatchEvent(clearAnim);
            obj.animeCondition = false;
            return
        }

        animateTo(document.querySelector(dom), leftP, topP, clearAnimation)

    }

})(GameDynamicPositions, RotateController)