const PROTOCOL = "http://";
const SERVER_URL = "localhost";
const SERVER_PORT = "8080";
const SERVER_ACTIVE_GAMES_PATH = "/games/descriptors";
const SERVER_GAME_STATE_PATH = "/games/state";
const SERVER_GAME_ID_PARAM = "gameId";
const ACTIVE_GAMES_PAGE_NAME = "/games.html";
const MAP_PAGE = "/map.html";
const USE_JSON_API = true;

function isNull(obj) {
    return obj == 'undefined' || obj == null;
}