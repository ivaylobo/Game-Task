// .................................................this method creates new game objects.........................................

{

    let rocketIdentifier = 0,
        explosionIdentifier = 0,
        enemyIndentifier = 0;

    gameObject.prototype.createEl = (el) => {


        const newElement = new gameObject(el.domName, el.animeCondition); // new game object

        const createNewElement = (className, identifier, letter) => {

            let newEl = document.createElement('div');

            newEl.className += className;

            newEl.id = letter + identifier;

            document.querySelector('.container').appendChild(newEl);

            newElement.identifier = newEl.id;

        }

        if (el.domName === '.rocket') { // object of type rocket

            createNewElement('rocket', rocketIdentifier, 'r');

            rocketIdentifier++;

        } else if (el.domName === '.explosion') { // object of type explosion

            createNewElement('explosion', explosionIdentifier, 'e');

            explosionIdentifier++;

        } else if (el.domName === '.enemy') {

            createNewElement('enemy', enemyIndentifier, 'en');

            enemyIndentifier++;
        }



        return newElement;
    };





    // ...................... this method destroys game objects ............................




    gameObject.prototype.removeHTML = (el) => {

        document.querySelector(`#${el.identifier}`).remove();

    };

}