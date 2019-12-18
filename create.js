// .................................................this method creates new game objects.........................................

(function() {

    var rocketIdentifier = 0;
    var explosionIdentifier = 0;
    var enemyIndentifier = 0;

    gameObject.prototype.createEl = function(el) {


        var newElement = new gameObject(el.domName, el.animeCondition); // new game object

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

        function createNewElement(className, identifier, letter) {

            var newEl = document.createElement('div');

            newEl.className += className;

            newEl.id = letter + identifier;

            document.querySelector('.container').appendChild(newEl);

            newElement.identifier = newEl.id;

        }

        return newElement;
    };





    // ...................... this method destroys game objects ............................




    gameObject.prototype.removeHTML = function(el) {

        document.querySelector("#" + el.identifier).remove();

    };

})();