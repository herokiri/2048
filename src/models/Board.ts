import {Cell} from "./Cell";

export class Board {
    cells: Cell[][] = [];

    initCells() {
        for(let i = 0; i < 4; i++) {
            let row: Cell[] = [];
            for(let j = 0; j < 4; j++) {
                row.push(new Cell(j, i, null));
            }
            this.cells.push(row);
        }
    }

    addNewPosition() {

    }
}