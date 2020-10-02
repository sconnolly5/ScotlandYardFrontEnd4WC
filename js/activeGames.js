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
    $.get(url,
        function(data) {
            lines = data.split("\n");
            // If first line didn't exist? Invalid response
            if (isNull(lines[0])) {
                console.log("Error recieved from server. Not able to retrieve games.");
                return;
            }

            // If response was not OK
            if (lines[0].split(",")[0].replaceAll("\"", "") !== "OK") {
                console.log("Error recieved from server. Not able to retrieve games.");
                return;
            }

            // Trim the response status
            lines.shift();

            // Put each game ID into the table
            for (var i = 0; i < lines.length; i++) {
                values = lines[i].split(",");
                for (var j = 0; j < values.length; j++) {
                    values[j] = values[j].replaceAll("\"", "");
                    createTableElement(values[j], "Unknown", "Unknown");
                }
            }
        });
}

function createTableElement(id, numPlayers, mapName) {
    var rowCount = (($('#tblActiveGames tr').length) - 1);
    var rowEle = $('#templateRow').clone();
    rowEle.attr("id", "row" + rowCount.toString());
    rowEle.removeClass("d-none");
    rowEle.find("#templateId").text(id);
    rowEle.find("#templateNumPlayers").text(numPlayers);
    rowEle.find("#templateMap").text(mapName);
    let redirectLocation = window.location.href;
    redirectLocation = redirectLocation.replace(ACTIVE_GAMES_PAGE_NAME, MAP_PAGE);
    let newUrl = redirectLocation + "?" + SERVER_GAME_ID_PARAM + "=" + id.toString();
    rowEle.find("#templateJoin").find('a').attr("href", newUrl);
    $('#tblActiveGames').find('tbody').append(rowEle);
}