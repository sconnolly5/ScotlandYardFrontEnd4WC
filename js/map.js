var colours = ["purple", "blue", "pink", "black"];

$(document).ready(function() {
    initialiseMap("map.png");
    queueMapUpdate();
});

function initialiseMap(mapFile) {
    let canvasEle = $('#canvas');
    let mapEle = $("#mapImg");
    let ctx = canvasEle[0].getContext("2d");
    ctx.canvas.height = mapEle.height();
    ctx.canvas.width = mapEle.width();
    mapImg.src = "images/" + mapFile;
    ctx.drawImage(mapImg, 0, 0, mapImg.width = 1065, mapImg.height = 800);
}

function drawPlayer(colour, pos) {
    let c = document.getElementById('canvas');
    let ctx = c.getContext("2d");
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
            // Callback, don't reuse server ID
            $('#gameId').text("Game ID: " + getUrlParam(SERVER_GAME_ID_PARAM));

            let colourIndex = 0;
            clearCanvas();
            initialiseMap(data.mapFile);
            $.each(data.players, function(key, value) {
                if (!isNull(value.currentNode)) {
                    let pos = {
                        xPos: value.currentNode.pixelX,
                        yPos: value.currentNode.pixelY
                    };
                    drawPlayer(colours[colourIndex], pos);
                    colourIndex += 1;

                    if (colourIndex >= data.players.length - 1) {
                        console.log("More players present than there are colours defined");
                        colourIndex = 0;
                    }
                }
            });
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

function clearCanvas() {
    let canvasEle = document.getElementById('canvas');
    const context = canvasEle.getContext('2d');
    context.clearRect(0, 0, canvasEle.width, canvasEle.height);
}