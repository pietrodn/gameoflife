"use strict";
var dim=20;
var counter=0;

$( document ).ready(function() {
    initTable();
    $('#Start').click(startSimulation);
    $('#Clear').click(clearBoard);
    $('#Randomize').click(randomize);
    $('#TableSize').val(dim);
    $('#TableSize').change(sizeChanged);
});

var game;
var tds = [];
var timer;
var interval = 250;

function initTable() {
    counter=0;
    updateCounter();

    $("#Board").empty();

    game = new Grid(dim);
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
    timer = setInterval(nextStep, interval);
    counter=0;
    updateCounter();

    var startButton = $('#Start');
    startButton.text('Stop!');
    startButton.off("click");
    startButton.click(stopSimulation);
    $('#Clear').prop('disabled', true);
    $('#TableSize').prop('disabled', true);
    $('#Randomize').prop('disabled', true);
}

function stopSimulation() {
    clearInterval(timer);

    var startButton = $('#Start');
    startButton.text('Start!');
    startButton.off("click");
    startButton.click(startSimulation);
    $('#Clear').prop('disabled', false);
    $('#TableSize').prop('disabled', false);
    $('#Randomize').prop('disabled', false);
}

function nextStep() {
    var equals;
    equals= game.nextStep();
    counter++;
    updateView();
    updateCounter();
    if(equals)
        stopSimulation();
}

function updateView() {
    for(var i=0; i<dim; i++) {
        for(var j=0; j<dim; j++) {
            var status = game.getCell(i,j);
            setCellStatus(i,j, status);
        }
    }
}

function clearBoard() {
    counter=0;
    updateCounter();
    for(var i=0; i<dim; i++) {
        for(var j=0; j<dim; j++) {
            setCellStatus(i,j, false);
        }
    }
}

function sizeChanged() {
    var size= parseInt($('#TableSize').val());
    dim = size;
    initTable();
}

function updateCounter(){
    $('#Counter').text(counter);
}

function randomize() {
    game.randomize();
    updateView();
}
