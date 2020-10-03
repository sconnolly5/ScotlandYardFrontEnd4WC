$(document).ready(function() {
    if (USE_JSON_API) {
        jsonDisplayActiveGames();
    } else {
        csvDisplayActiveGames();
    }
});

function jsonDisplayActiveGames() {
    var url = PROTOCOL + SERVER_URL + ":" + SERVER_PORT + SERVER_ACTIVE_GAMES_PATH;
    $.getJSON(url,
        function(data) {
            $.each(data, function(key, value) {
                createTableElement(value.gameId, value.numPlayers, value.mapName);
            });
        });
}

function csvDisplayActiveGames() {
    var url = PROTOCOL + SERVER_URL + ":" + SERVER_PORT + CSV_GET_GAMES_URL;
    $.get({
        url: url,
        success: function(data) {
            // If response was not OK
            if (!csvResponseMessageOkay(data)) {
                return;
            }
            
            // Acquire the values out of the CSV response
            var values = csvParseValuesIntoArrayByLines(data)[0];

            for (var i = 0; i < values.length; i++) {
                let mapUrl = PROTOCOL + SERVER_URL + ":" + SERVER_PORT + CSV_GET_MAP_URL + "?" + CSV_GAME_ID_PARAM + "=" + values[i];
                // Map data is not returned at this point, so need to queue up the next AJAX request
                $.get({
                    url: mapUrl,
                    indexValue: i,
                    success: function(mapData) {
                        if (!csvResponseMessageOkay(mapData)) {
                            console.log("Neglecting to display game with map ID '" + this.indexValue.toString + "' which did not return a map path.");
                        } else {
                            let mapValues = csvParseValuesIntoArrayByLines(mapData)[0];
                            // Remove the path prefix, it's easier to have a variable pointing at our images folder.
                            mapValues[CSV_MAP_INDEX] = mapValues[CSV_MAP_INDEX].replace("img/", "");
                            createTableElement(values[this.indexValue], "Unknown", mapValues[CSV_MAP_INDEX], mapValues[CSV_MAP_X_INDEX], mapValues[CSV_MAP_Y_INDEX]);
                        }
                    },
                    dataType: "text"
                });
            }
        },
        dataType: "text"
    });
}

function createTableElement(id, numPlayers, mapName, sizeX, sizeY) {
    var rowCount = (($('#tblActiveGames tr').length) - 1);
    var rowEle = $('#templateRow').clone();
    rowEle.attr("id", "row" + rowCount.toString());
    rowEle.removeClass("d-none");
    rowEle.find("#templateId").text(id);
    rowEle.find("#templateNumPlayers").text(numPlayers);
    rowEle.find("#templateMap").text(mapName);
    let redirectLocation = window.location.href;
    redirectLocation = redirectLocation.replace(ACTIVE_GAMES_PAGE_NAME, MAP_PAGE);
    let newUrl = redirectLocation + "?" + SERVER_GAME_ID_PARAM + "=" + id.toString() + "&" + SERVER_MAP_PARAM + "=" + mapName + "&" + SERVER_MAP_SIZE_X + "=" + sizeX.toString() + "&" + SERVER_MAP_SIZE_Y + "=" + sizeY.toString();
    rowEle.find("#templateJoin").find('a').attr("href", newUrl);
    $('#tblActiveGames').find('tbody').append(rowEle);
}