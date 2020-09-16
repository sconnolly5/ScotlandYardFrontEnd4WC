const API_PROTOCOL = "http://"
const API_URL = "localhost";
const API_PORT = 8080;
const GET_LOBBIES_URL = "/lobbies/"
const CREATE_LOBBY_URL = GET_LOBBIES_URL + "/create"
const LOBBY_CODE_COOKIE = "lobby";
const LOBBY_PAGE_NAME = "/lobby.html"

$(document).ready(function() {
    initButtonJoinHandler();
    initButtonCreateHandler();
    initNewLobby();
});

function initButtonJoinHandler() {
    var btnJoin = $('#joinLobbyForm');
    if (isNull(btnJoin)) {
        return;
    }
    btnJoin.submit(event => {
        joinLobby($('#lobbyCode').val());

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
        createLobby();
        event.preventDefault();
    });
}

function initNewLobby() {
    var lobbyCode = getCookie(LOBBY_CODE_COOKIE);
    if (isNull(lobbyCode) || lobbyCode === "") {
        return;
    }
    var lobbyCodeEle = $("#lobbyCode");
    if (isNull(lobbyCodeEle)) {
        return;
    }
    lobbyCodeEle.text(lobbyCode);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(name, value, expirationDate, page) {
    var cookieValue = getCookie(name);
    if (!isNull(cookieValue) && cookieValue !== "") {
        document.cookie = name + "=;  expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    cookieValue = name + "=" + value;
    if (!isNull(expirationDate)) {
        cookieValue += "; expires=" + expirationDate.toUTCString();
    }
    if (!isNull(page)) {
        cookieValue += "; path=" + page;
    }
    document.cookie = cookieValue;
}

function joinLobby(lobbyCode) {
    var url = API_PROTOCOL + API_URL + ":" + API_PORT + GET_LOBBIES_URL;
    $.getJSON({
        url: url,
        success: function(data) {
            var lobbyExists = false;
            $.each(data, function(key, val) {
                if (val.name == lobbyCode) {
                    lobbyExists = true;
                }
            });

            if (lobbyExists) {
                var expirationDate = null;
                setCookie(LOBBY_CODE_COOKIE, lobbyCode, expirationDate, LOBBY_PAGE_NAME);
                window.location.replace("lobby.html")
            } else {

            }
        }
    });
}

function createLobby() {
    var url = API_PROTOCOL + API_URL + ":" + API_PORT + CREATE_LOBBY_URL;
    $.getJSON({
        url: url,
        async: false,
        success: function(data) {
            found = false;
            console.log("Room code is: " + data.name);
            document.cookie = LOBBY_CODE_COOKIE + "=" + data.name;
        }
    });
}

function isNull(obj) {
    return obj == 'undefined' || obj == null;
}