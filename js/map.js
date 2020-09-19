$(document).ready(function() {
    var canvasEle = $('#canvas');
    var mapEle = $("#mapImg");
    var ctx = canvasEle[0].getContext("2d");
    ctx.canvas.height = mapEle.height();
    ctx.canvas.width = mapEle.width();
    mapImg.src = "map.png";
    ctx.drawImage(mapImg, 0, 0, mapImg.width = 1065, mapImg.height = 800);
    var player1Colour = "red";
    var pos = {
        xPos: 850,
        yPos: 343
    };
    drawPlayer(player1Colour, pos);

});

function drawPlayer(colour, pos) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(pos.xPos, pos.yPos, 30, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = colour;
    ctx.globalAlpha = 0.5;
    ctx.fill();
}