const GameActionsCtrl = (function() {
    return {
        pauseGame: () => {
            alert('paused!')
        },

        finishGame: (win) => {

            if (!win) {
                alert('Game Over! You lose!')
                window.location.reload();
                return
            }
            alert('Game Over! You Win!')
            window.location.reload();

        }
    }
})()