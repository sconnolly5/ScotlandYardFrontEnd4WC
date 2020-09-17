const API_PROTOCOL = "http://"
const API_URL = "localhost";
const API_PORT = 8080;
const GET_LOBBIES_URL = "/lobbies/"
const CREATE_LOBBY_URL = GET_LOBBIES_URL + "/create"
const LOBBY_CODE_VAR = "lobby";
const LOBBY_PAGE = "lobby.html";
const JOIN_LOBBY_PAGE = "joinLobby.html";

$(document).ready(function() {
    initNavbarJoinButton();
    initButtonJoinHandler();
    initButtonCreateHandler();
    initNewLobby();
});

function initNavbarJoinButton() {
    // Set up handlers for the join lobby button in the navbar
    var btnNavbarJoinLobby = $('#btnJoinLobby');
    btnNavbarJoinLobby.click(function(event) {
        var url = API_PROTOCOL + API_URL + ":" + API_PORT + GET_LOBBIES_URL;
        $.getJSON({
            url: url,
            success: function(data) {
                var lobbyCode = sessionStorage.getItem(LOBBY_CODE_VAR);
                var exists = lobbyExists(data, lobbyCode);

                if (exists) {
                    window.location.replace(LOBBY_PAGE)
                } else {
                    sessionStorage.removeItem(LOBBY_PAGE);
                    window.location.replace(JOIN_LOBBY_PAGE);
                }
            }
        });
        event.preventDefault();
    });
}

function initButtonJoinHandler() {
    // Set up handlers for the submit join button (on the join lobby page)
    var btnJoin = $('#joinLobbyForm');
    if (isNull(btnJoin)) {
        return;
    }
    btnJoin.submit(event => {
        var lobbyCode = $('#lobbyCode').val();
        var url = API_PROTOCOL + API_URL + ":" + API_PORT + GET_LOBBIES_URL;
        $.getJSON({
            url: url,
            success: function(data) {
                var exists = lobbyExists(data, lobbyCode);
                if (exists) {
                    sessionStorage.setItem(LOBBY_CODE_VAR, lobbyCode);
                    window.location.replace(LOBBY_PAGE)
                } else {

                }
            }
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
        $.getJSON({
            url: url,
            async: false,
            success: function(data) {
                found = false;
                sessionStorage.setItem(LOBBY_CODE_VAR, data.name);
                window.location.replace(LOBBY_PAGE)
            }
        });
        event.preventDefault();
    });
}

function initNewLobby() {
    var lobbyCode = sessionStorage.getItem(LOBBY_CODE_VAR);
    if (isNull(lobbyCode) || lobbyCode === "") {
        return;
    }
    var lobbyCodeEle = $("#lobbyCode");
    if (isNull(lobbyCodeEle)) {
        return;
    }
    lobbyCodeEle.text(lobbyCode);
}

function lobbyExists(jsonData, lobbyCode) {
    var lobbyExists = false;
    $.each(jsonData, function(key, val) {
        if (val.name == lobbyCode) {
            lobbyExists = true;
        }
    });
    return lobbyExists;
}

function isNull(obj) {
    return obj == 'undefined' || obj == null;
}