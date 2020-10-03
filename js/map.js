var colours = ["purple", "blue", "pink", "black"];
var graphNodePositions = [];
var gameId;
var mapFile;
var width;
var height;

$(document).ready(function() {
    gameId = getUrlParam(SERVER_GAME_ID_PARAM);
    mapFile = getUrlParam(SERVER_MAP_PARAM);
    width = getUrlParam(SERVER_MAP_SIZE_X);
    height = getUrlParam(SERVER_MAP_SIZE_Y);
    initialiseGraphNodePositions();
    $('#gameId').text("Game ID: " + gameId);
    initialiseMap();
    setInterval(queueMapUpdate, 1000);
});

function initialiseGraphNodePositions() {
    if (!USE_JSON_API) {
        // Need to get the locations of each graph node
        let url = PROTOCOL + SERVER_URL + ":" + SERVER_PORT + CSV_GET_LOCATION_COORDS + "?" + CSV_GAME_ID_PARAM + "=" + gameId;
        $.get(url, function(data) {
            if (!csvResponseMessageOkay(data)) {
                return;
            }

            let lines = csvParseValuesIntoArrayByLines(data);
            for (var i = 0; i < lines.length; i++) {
                let graphNode = lines[i][CSV_LOCATION_COORD_NODE_INDEX];
                let graphNodeX = lines[i][CSV_LOCATION_COORD_X_INDEX];
                let graphNodeY = lines[i][CSV_LOCATION_COORD_Y_INDEX];
                graphNodePositions.push({
                    key: graphNode,
                    value: {
                        xPos: graphNodeX,
                        yPos: graphNodeY
                    }
                });
            }
        });
    }
}

function initialiseMap() {
    let canvasEle = $('#canvas');
    let mapEle = $("#mapImg");
    let ctx = canvasEle[0].getContext("2d");
    ctx.canvas.height = mapEle.height();
    ctx.canvas.width = mapEle.width();
    mapImg.src = "images/" + mapFile;
    ctx.drawImage(mapImg, 0, 0, mapImg.width = width, mapImg.height = height);
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
        jsonMapUpdate();
    } else {
        csvMapUpdate();
    }
}

function jsonMapUpdate() {
    let url = PROTOCOL + SERVER_URL + ":" + SERVER_PORT + SERVER_GAME_STATE_PATH + "?" + SERVER_GAME_ID_PARAM + "=" + getUrlParam(SERVER_GAME_ID_PARAM);
    $.getJSON(url, function(data) {
        let colourIndex = 0;
        clearCanvas();
        initialiseMap();
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
}

function csvMapUpdate() {
    let url = PROTOCOL + SERVER_URL + ":" + SERVER_PORT + CSV_GET_PLAYER_DETAILS + "?" + CSV_GAME_ID_PARAM + "=" + gameId;
    $.get(url, function(data) {
        clearCanvas();
        initialiseMap();
        
        if (!csvResponseMessageOkay(data)) {
            console.log("Response was not okay. Not doing anything. Response was: " + data);
            return;
        }
        // Can't do anything until graph node positions is defined.
        if (isNull(graphNodePositions)) {
            console.log("Delaying until graph node positions is initialised.");
            return;
        }

        let players = csvParseValuesIntoArrayByLines(data);
        for (var i = 0; i < players.length; i++) {
            let playerDetails = players[i];
            let pos = graphNodePositions[playerDetails[CSV_PLAYER_POSITION_INDEX] - 1].value;
            drawPlayer(playerDetails[CSV_PLAYER_COLOUR_INDEX], pos);
        }
    });
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