const PROTOCOL = "http://";
const SERVER_URL = "challenge.uclan.ac.uk";
const SERVER_PORT = "8080";
const SERVER_ACTIVE_GAMES_PATH = "/games/descriptors";
const SERVER_GAME_STATE_PATH = "/games/state";
const SERVER_GAME_ID_PARAM = "gameId";
const SERVER_MAP_PARAM = "map";
const SERVER_MAP_SIZE_X = "x";
const SERVER_MAP_SIZE_Y = "y";
const ACTIVE_GAMES_PAGE_NAME = "/games.html";
const MAP_PAGE = "/map.html";
const USE_JSON_API = false;
const DEFAULT_MAP_SIZE_X = 1065;
const DEFAULT_MAP_SIZE_Y = 800;

// Constants specific to the CSV server
const CSV_GET_GAMES_URL = "/preston/getGames";
const CSV_GET_MAP_URL = "/preston/getMapPath";
const CSV_GET_PLAYER_DETAILS = "/preston/getPlayerDetails";
const CSV_GET_LOCATION_COORDS = "/preston/getLocationCoords";
const CSV_GAME_ID_PARAM = "gameID";
const CSV_OKAY_RESPONSE_MESSAGE = "OK";
const CSV_MAP_INDEX = 0;
const CSV_MAP_X_INDEX = 1;
const CSV_MAP_Y_INDEX = 2;
const CSV_PLAYER_NAME_INDEX = 0;
const CSV_PLAYER_COLOUR_INDEX = 1;
const CSV_PLAYER_POSITION_INDEX = 2;
const CSV_PLAYER_YELLOW_TICKETS_INDEX = 3;
const CSV_PLAYER_GREEN_TICKETS_INDEX = 4;
const CSV_PLAYER_RED_TICKETS_INDEX = 5;
const CSV_LOCATION_COORD_NODE_INDEX = 0;
const CSV_LOCATION_COORD_X_INDEX = 1;
const CSV_LOCATION_COORD_Y_INDEX = 2;

function isNull(obj) {
    return obj == 'undefined' || obj == null;
}