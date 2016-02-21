"use strict";
var dim=10;

$( document ).ready(function() {
    initTable();
    $('#Start').click(startSimulation);
});

var game = new Grid(dim);
var tds = [];
var timer;
var interval = 500;

function initTable() {

    var tab = $('<table id="GameTable"></table>');
    $("#Board").append(tab);
    for(var i=0; i<dim; i++) {
        var row = $("<tr></tr>");
        tds[i] = [];
        tab.append(row);
        for(var j=0; j<dim; j++) {
            var cell = $('<td></td>');
            tds[i][j] = cell;
            setCellStatus(i, j, false);
            cell.click([i, j], cellClicked);
            row.append(cell);
        }
    }
}

function cellClicked(e) {
    var x=e.data[0];
    var y=e.data[1];
    setCellStatus(x, y, !game.getCell(x, y));
}

function setCellStatus(x, y, status) {
    game.setLiveness(x, y, status);
    tds[x][y].removeClass("dead alive");

    if(status == true) {
        tds[x][y].addClass('alive');
    } else {
        tds[x][y].addClass('dead');
    }
}

function startSimulation() {
    console.log("startSimulation");
    timer = setInterval(nextStep, interval);

    var startButton = $('#Start');
    startButton.text('Stop!');
    startButton.off("click");
    startButton.click(stopSimulation);
}

function stopSimulation() {
    console.log("stopSimulation");
    clearInterval(timer);

    var startButton = $('#Start');
    startButton.text('Start!');
    startButton.off("click");
    startButton.click(startSimulation);
}

function nextStep() {
    game.nextStep();
    updateView();
}

function updateView() {
    for(var i=0; i<dim; i++) {
        for(var j=0; j<dim; j++) {
            var status = game.getCell(i,j);
            setCellStatus(i,j, status);
        }
    }
}
