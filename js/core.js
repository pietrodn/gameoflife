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
        for(i=-1; i<=1; i++) {
            for(j=-1; j<=1; j++) {
                if((i!=0 || j!=0) && this.m[mod(x+i,this.dim)][mod(y+j, this.dim)]) {
                    count++;
                }
            }
        }
        return count;
    }

    // this function computes next iteration and returns true if there's no different between old and new condition

    this.nextStep = function() {
        var m2 = [];
        var equals= true;

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
                if(this.m[i][j]!= m2[i][j])
                    equals= false;
            }
        }
        this.m = m2;
        return equals;
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

    this.randomize = function() {
        var probability = 0.5;

        for(var i=0; i<this.dim; i++) {
            for(var j=0; j<this.dim; j++) {
                    this.m[i][j] = (Math.random()<probability);
            }
        }
    }

}

function mod(m,n) {
    return ((m%n)+n)%n;
}
