var gameId;


$(document).ready(function() {
    initialiseMap();
    queueMapUpdate();
});

function initialiseMap() {
    var canvasEle = $('#canvas');
    var mapEle = $("#mapImg");
    var ctx = canvasEle[0].getContext("2d");
    ctx.canvas.height = mapEle.height();
    ctx.canvas.width = mapEle.width();
    mapImg.src = "map.png";
    ctx.drawImage(mapImg, 0, 0, mapImg.width = 1065, mapImg.height = 800);
    var player1Colour = "red";
    var pos = {
        xPos: 850,
        yPos: 343
    };
    drawPlayer(player1Colour, pos);
}

function drawPlayer(colour, pos) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(pos.xPos, pos.yPos, 30, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = colour;
    ctx.globalAlpha = 0.5;
    ctx.fill();
}

function queueMapUpdate() {
    if (USE_JSON_API) {
        let url = PROTOCOL + SERVER_URL + ":" + SERVER_PORT + SERVER_GAME_STATE_PATH + "?" + SERVER_GAME_ID_PARAM + "=" + getUrlParam(SERVER_GAME_ID_PARAM);
        $.getJSON(url, function(data) {
            console.log(data);
            // Callback, don't reuse server ID
            $('#gameId').text("Game ID: " + getUrlParam(SERVER_GAME_ID_PARAM));
            $('#')
        });
    } else {
        console.log("Not implemented alternative format to JSON API yet");
    }
}

function getUrlParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param)
}