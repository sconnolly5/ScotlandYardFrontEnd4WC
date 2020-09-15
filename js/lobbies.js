const API_PROTOCOL = "http://"
const API_URL = "localhost";
const API_PORT = 8080;
const GET_LOBBIES_URL = "/lobbies/"
const CREATE_LOBBY_URL = GET_LOBBIES_URL + "/create"

$(document).ready(function() {
    initButtonJoinHandler();
    initButtonCreateHandler();
});

function initButtonJoinHandler() {
    var btnJoin = $('#joinLobbyForm');
    if (isNull(btnJoin)) {
        return;
    }
    btnJoin.submit(event => {
        var url = API_PROTOCOL + API_URL + ":" + API_PORT + GET_LOBBIES_URL;
        $.getJSON(url, function(data) {
            found = false;
            $.each(data, function(key, val) {
                if (val.name == $('#lobbyCode').val()) {
                    found = true;
                }
            });
            found ? console.log("Found") : console.log("Not found");
        });

        // Stop redirection
        event.preventDefault();
    });
}

function initButtonCreateHandler() {
    var buttonCreate = $('#btnCreateLobby');
    if (isNull(buttonCreate)) {
        return;
    }
    buttonCreate.click(function(event) {
        var url = API_PROTOCOL + API_URL + ":" + API_PORT + CREATE_LOBBY_URL;

        $.getJSON(url, function(data) {
            found = false;
            console.log("Room code is: " + data.name);
        });
        event.preventDefault();
    });
}

function isNull(obj) {
    return obj == 'undefined' || obj == null;
}