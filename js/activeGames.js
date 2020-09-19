const PROTOCOL = "http://";
const SERVER_URL = "localhost";
const SERVER_PORT = "8080";
const SERVER_ACTIVE_GAMES_PATH = "/games/descriptors";
const ACTIVE_GAMES_PAGE_NAME = "/games.html";
const MAP_PAGE = "/map.html";

const USE_JSON_API = true;

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
                var redirectLocation = window.location.href;
                redirectLocation = redirectLocation.replace(ACTIVE_GAMES_PAGE_NAME, MAP_PAGE);
                var newUrl = redirectLocation + "?game=" + value.gameId.toString();
                newEle.find("#templateJoin").find('a').attr("href", newUrl);
                $('#tblActiveGames').find('tbody').append(newEle);
            });
        });
}

function csvDisplayActiveGames() {
    console.log("CSV SETUP HAS NOT YET BEEN IMPLEMENTED.");
}