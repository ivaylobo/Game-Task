var GameDynamicPositions = {
    mouse: {},
    sniper: { n: 'sniper', x: 400, y: 400, i: 2 },
    rockets: [],
    enemies: [],
    explosions: [],
    updatePositions: function(obj, x, y) {

        switch (obj.domName) {
            case '#sniper':

                this.sniper.x = x;
                this.sniper.y = y;

                break

            case '.rocket':
                var index = this.rockets.findIndexOf('n', obj.identifier);
                this.rockets[index].x = x;
                this.rockets[index].y = y;

                break
            case '.enemy':
                var index = this.enemies.findIndexOf('n', obj.identifier);
                if (this.enemies[index]) {
                    this.enemies[index].x = x;
                    this.enemies[index].y = y;
                }


                break
            default:
                return
        }
    },

    checkForMatch: function(arr1, arr2) {
        var tolerance = 40;

        for (var a = 0; a <= arr1.length - 1; a++) {
            for (var b = 0; b <= arr2.length - 1; b++) {
                var match = check(arr1[a].x, arr1[a].y, arr2[b].x, arr2[b].y);
                if (match) {
                    return [arr1[a], arr2[b]];
                }

            }
        }

        return false;

        function check(xA, yA, xB, yB) {
            if (xA > xB - tolerance && xA < xB + tolerance) {
                if (yA > yB - tolerance && yA < yB + tolerance) {
                    return true
                }
            }

            return false
        }
    }
};