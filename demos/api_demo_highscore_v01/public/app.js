fetch('/api/scores')
.then(response => response.json())
.then(data => {
    addScoresToDOM(data.scores);
}).catch(error => console.log(error));

function addScoresToDOM(scores) {
    var elem = document.getElementById("highscorelist");

    for(var i = 0; i < scores.length; i++) {
        elem.innerHTML = elem.innerHTML +  `<tr><td>${scores[i].nick}</td><td>${scores[i].score}</td></tr>`;
    }
}