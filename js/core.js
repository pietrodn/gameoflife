"use strict";

function Grid(dim) {

    // Initialization
    this.m = []
    this.dim = dim;
    for(var i=0; i<dim; i++) {
        this.m[i] = [];
        for(var j=0; j<dim; j++) {
            this.m[i][j] = false;
        }
    }

    this.setLiveness = function(x, y, live) {
        this.m[x][y] = live;
    }

    this.getCell = function(i, j) {
        return this.m[i][j];
    }

    this.getNumberOfAliveNeighbours = function(x, y) {
        var count=0;
        var i,j;
        for(i=Math.max(0, x-1); i<=Math.min(this.dim-1, x+1); i++) {
            for(j=Math.max(0, y-1); j<=Math.min(this.dim-1, y+1); j++) {
                if((x!=i || y!=j) && this.m[i][j]) {
                    count++;
                }
            }
        }
        return count;
    }

    this.nextStep = function() {
        var m2 = [];

        for(var i=0; i<this.dim; i++) {
            m2[i] = [];
            for(var j=0; j<this.dim; j++) {
                var n = this.getNumberOfAliveNeighbours(i,j);
                if(n<2 && this.m[i][j]) {
                    m2[i][j] = false;
                } else if((n==2 || n==3) && this.m[i][j]) {
                    m2[i][j] = true;
                } else if(n>3 && this.m[i][j]) {
                    m2[i][j] = false;
                } else if(n==3 && !this.m[i][j]) {
                    m2[i][j] = true;
                } else {
                    m2[i][j] = this.m[i][j];
                }
            }
        }
        this.m = m2;
    }

    this.print = function() {
        var out = "";
        for(var i=0; i<this.dim; i++) {
            for(var j=0; j<this.dim; j++) {
                if(this.m[i][j]) {
                    out += "I"
                } else {
                    out += "o";
                }
            }
            out += "\n";
        }
        console.log(out);
    }

}

var grid = new Grid(5);
grid.setLiveness(2,2,true);
grid.setLiveness(2,1,true);
grid.setLiveness(2,3,true);
console.log(grid.getNumberOfAliveNeighbours(2,2));

grid.print();
grid.nextStep();
grid.print();
