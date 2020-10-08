
function csvResponseMessageOkay(data) {
    if (csvParseResponseMessage(data) === CSV_OKAY_RESPONSE_MESSAGE) {
        return true;
    }

    console.log("Error recieved from server. Not able to retrieve games.");
    return false;
}

function csvParseResponseMessage(data) {
    lines = data.split("\n");

    // If first line didn't exist? Invalid response
    if (isNull(lines[0])) {
        console.log("Error recieved from server. Not able to retrieve games.");
        return "Error";
    }

    // If response was not OK
    if (lines[0].split(",")[0].replaceAll("\"", "") !== "OK") {
        console.log("Error recieved from server. Not able to retrieve games.");
        return "Error";
    }

    return "OK"
}

function csvParseValuesIntoArrayByLines(data) {
    var result = [];

    let lines = csvParseLinesIntoArray(data);
    for (var i = 0; i < lines.length; i++) {
        let values = lines[i].split(",");
        result.push(values);    
    }
    return result;
}

function csvParseLinesIntoArray(data) {
    lines = data.split("\n");
    // Trim the response status
    lines.shift();

    for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replaceAll("\"", "");
    }

    return lines;
}
