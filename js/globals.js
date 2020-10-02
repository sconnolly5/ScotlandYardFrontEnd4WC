const PROTOCOL = "http://";
const SERVER_URL = "challenge.uclan.ac.uk";
const SERVER_PORT = "8080";
const SERVER_ACTIVE_GAMES_PATH = "/games/descriptors";
const SERVER_GAME_STATE_PATH = "/games/state";
const SERVER_GAME_ID_PARAM = "gameId";
const ACTIVE_GAMES_PAGE_NAME = "/games.html";
const MAP_PAGE = "/map.html";
const USE_JSON_API = false;

const CSV_GET_GAMES_URL = "/preston/getGames";

function isNull(obj) {
    return obj == 'undefined' || obj == null;
}