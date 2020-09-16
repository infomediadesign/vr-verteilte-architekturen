var counter = 0
var maxtime = 5
var timer

window.onload = function () {
    document.getElementById("counter").innerHTML = counter
    document.getElementById("timeleft").innerHTML = maxtime

    showHighScores();

    timer = setInterval(gameTimer, 1000)
    
    document.getElementById("cookie").addEventListener("click", () => {
        if (maxtime != 0) {
            document.getElementById("counter").innerHTML = ++counter;
        }
    })
}

function pushToAPI() {
    (async () => {
        const rawResponse = await fetch('/api/score', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "nick": "Nickname not set yet", "score": counter })
        })
        const content = await rawResponse.json();                           // TODO: Evaluation of server response to errors/misformatted requests        
    })()
}

function gameTimer() {
    document.getElementById("timeleft").innerHTML = --maxtime

    if (maxtime == 0) {
        clearTimeout(timer)
        pushToAPI()
        showHighScores()
    }
}

function showHighScores() {
    fetch('/api/scores')
        .then(response => response.json())                                      // Here is a demonstration of the use of fetch promises with then notation
        .then(data => {
            addScoresToDOM(data.scores);
        }).catch(error => console.log(error))

    function addScoresToDOM(scores) {
        var elem = document.getElementById("highscorelist");

        for (var i = 0; i < scores.length; i++) {
            elem.innerHTML = elem.innerHTML + `<tr><td>${scores[i].nick}</td><td>${scores[i].score}</td></tr>`
        }
    }
}
