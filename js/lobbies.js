const API_PROTOCOL = "http://"
const API_URL = "localhost";
const API_PORT = 8080;
const GET_LOBBIES_URL = "/lobbies"

$(document).ready(function() {
    $('#joinLobbyForm').submit(event => {
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
});