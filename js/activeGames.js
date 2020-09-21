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
                var rowCount = (($('#tblActiveGames tr').length) - 1);
                var newEle = $('#templateRow').clone();
                newEle.attr("id", "row" + rowCount.toString());
                newEle.removeClass("d-none");
                newEle.find("#templateId").text(value.gameId);
                newEle.find("#templateNumPlayers").text(value.numPlayers);
                newEle.find("#templateMap").text(value.mapName);
                let redirectLocation = window.location.href;
                redirectLocation = redirectLocation.replace(ACTIVE_GAMES_PAGE_NAME, MAP_PAGE);
                let newUrl = redirectLocation + "?" + SERVER_GAME_ID_PARAM + "=" + value.gameId.toString();
                newEle.find("#templateJoin").find('a').attr("href", newUrl);
                $('#tblActiveGames').find('tbody').append(newEle);
            });
        });
}

function csvDisplayActiveGames() {
    console.log("CSV SETUP HAS NOT YET BEEN IMPLEMENTED.");
}