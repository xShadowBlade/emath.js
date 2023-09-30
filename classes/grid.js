Game.classes.grid = class {
    constructor(x_size, y_size) {
        /*new Game.classes.grid(5, 5)
        */
        this.x_size = x_size;
        this.y_size = y_size;
        for (let a = 0; a < y_size; a++) {
            this[a] = [];
            for (let b = 0; b < x_size; b++) { //iterates through every cell
                this[a][b] = new Game.classes.gridCell(b, a);
            }
        }
    }
    all() {
        let output = [];
        for (let a = 0; a < this.y_size; a++) {
            for (let b = 0; b < this.x_size; b++) { //iterates through every cell
                output.push(this[a][b]);
            }
        }
        return output;
    }
    allX(x) {
        let output = [];
        for (i = 0; i < this.y_size; i++) {
            output.push(this[i][x])
        }
        return output;
    }
    allY(y) {
        let output = [];
        for (i = 0; i < this.x_size; i++) {
            output.push(this[y][i])
        }
        return output;
    }
    getCell(x, y) {
        return(this[y][x]);
    }
    getAdjacent(x, y) {
        let output = [];
        output[0] = this.getCell(x, y + 1);
        output[1] = this.getCell(x + 1, y);
        output[2] = this.getCell(x, y - 1);
        output[3] = this.getCell(x - 1, y + 1);
        return output;
    }
    getDiagonal(x, y) {
        let output = [];
        output[0] = this.getCell(x - 1, y + 1);
        output[1] = this.getCell(x + 1, y + 1);
        output[2] = this.getCell(x + 1, y - 1);
        output[3] = this.getCell(x - 1, y - 1);
        return output;
    }
    getEncircling(x, y) {
        return this.getAdjacent(x, y).concat(this.getDiagonal(x, y));
    }
}
Game.classes.gridCell = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    setValue(name, value) {
        this[name] = value;
        return value;
    }
    getDistance(x,y) {
        return Math.abs(Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)))
    }
}