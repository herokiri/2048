import {Cell} from "./Cell";

export class Board {
    cells: Cell[][];
    copyCells: Cell[][];

    constructor() {
        this.cells = [];  // Initialize it properly.
        this.initCells();  // Call this method to initialize the cells.
    }
    initCells() {
        for(let i = 0; i < 4; i++) {
            let row: Cell[] = [];
            for(let j = 0; j < 4; j++) {
                row.push(new Cell(j, i, null));
            }
            this.cells.push(row);
        }
    }

    private isBoardStateChanged(originalCells: Cell[][]): boolean {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (
                    (this.cells[i][j]?.amount !== null && originalCells[i][j]?.amount !== this.cells[i][j]?.amount) ||
                    (this.cells[i][j]?.amount === null && originalCells[i][j]?.amount !== null)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    isLose(b1: Board, b2: Board): boolean {
        b1.moveUp();
        b1.moveDown();
        b1.moveLeft();
        b1.moveRight();
        return  !b1.isBoardStateChanged(b2.cells);
    }



    moveLeft() {
        const originalCells = this.clone().cells;

        for (let i = 0; i < 4; i++) {
            // Filter out non-empty cells
            const nonEmptyCells = this.cells[i].filter(cell => cell.amount !== null);

            // Combine adjacent cells with the same value
            for (let j = 0; j < nonEmptyCells.length - 1; j++) {
                if (nonEmptyCells[j].amount === nonEmptyCells[j + 1].amount) {
                    nonEmptyCells[j].amount *= 2;
                    nonEmptyCells[j + 1].amount = null;
                    // You may want to update the score or perform other actions here
                }
            }

            // Remove any gaps created by merging cells
            const movedCells = nonEmptyCells.filter(cell => cell.amount !== null);

            // Fill the remaining cells with null values
            for (let j = movedCells.length; j < 4; j++) {
                movedCells.push(new Cell(j, i, null));
            }

            // Update the row with the moved cells
            this.cells[i] = movedCells;
        }
        // After moving left, add a random cell
        if (this.isBoardStateChanged(originalCells)) {
            this.addRandomCell();
        }
    }


    moveUp() {
        const originalCells = this.clone().cells;

        for (let j = 0; j < 4; j++) {
            const column = this.cells.map(row => row[j]);
            const nonEmptyCells = column.filter(cell => cell.amount !== null);

            for (let i = 0; i < nonEmptyCells.length - 1; i++) {
                if (nonEmptyCells[i].amount === nonEmptyCells[i + 1].amount) {
                    nonEmptyCells[i].amount *= 2;
                    nonEmptyCells[i + 1].amount = null;
                    // Update score or other actions if needed
                }
            }

            const movedCells = nonEmptyCells.filter(cell => cell.amount !== null);

            for (let i = movedCells.length; i < 4; i++) {
                movedCells.push(new Cell(j, i, null));
            }

            this.cells.forEach((row, i) => (row[j] = movedCells[i]));
        }

        if (this.isBoardStateChanged(originalCells)) {
            this.addRandomCell();
        }
    }

    moveDown() {
        const originalCells = this.clone().cells;
        for (let j = 0; j < 4; j++) {
            const column = this.cells.map(row => row[j]);
            const nonEmptyCells = column.filter(cell => cell.amount !== null);

            for (let i = 0; i < nonEmptyCells.length - 1; i++) {
                if (nonEmptyCells[i].amount === nonEmptyCells[i + 1].amount) {
                    nonEmptyCells[i].amount *= 2;
                    nonEmptyCells[i + 1].amount = null;
                    // Update score or other actions if needed
                }
            }

            const movedCells = nonEmptyCells.filter(cell => cell.amount !== null);

            for (let i = movedCells.length; i < 4; i++) {
                movedCells.unshift(new Cell(j, i, null));
            }

            this.cells.forEach((row, i) => (row[j] = movedCells[i]));
        }

        if (this.isBoardStateChanged(originalCells)) {
            this.addRandomCell();
        }
    }

    moveRight() {
        const originalCells = this.clone().cells;
        for (let i = 0; i < 4; i++) {
            // Filter out non-empty cells
            const nonEmptyCells = this.cells[i].filter(cell => cell.amount !== null);

            // Combine adjacent cells with the same value
            for (let j = 0; j < nonEmptyCells.length - 1; j++) {
                if (nonEmptyCells[j].amount === nonEmptyCells[j + 1].amount) {
                    nonEmptyCells[j].amount *= 2;
                    nonEmptyCells[j + 1].amount = null;
                    // You may want to update the score or perform other actions here
                }
            }

            // Remove any gaps created by merging cells
            const movedCells = nonEmptyCells.filter(cell => cell.amount !== null);

            // Fill the remaining cells with null values
            for (let j = movedCells.length; j < 4; j++) {
                movedCells.unshift(new Cell(j, i, null));
            }
            // Update the row with the moved cells
            this.cells[i] = movedCells;
        }

        if (this.isBoardStateChanged(originalCells)) {
            this.addRandomCell();
        }
    }

    addRandomCell() {
        const emptyCells: Cell[] = [];

        // Find all empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.cells[i][j]?.amount === null) {
                    emptyCells.push(this.cells[i][j]);
                }
            }
        }

        // If there are empty cells, choose a random one and set a new value (e.g., 2 or 4)
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomIndex];

            // Ensure the random cell is within the 4x4 grid
            if (randomCell && randomCell.x >= 0 && randomCell.x < 4 && randomCell.y >= 0 && randomCell.y < 4) {
                randomCell.amount = Math.random() < 0.9 ? 2 : 4; // For example, with a 90% chance of 2 and 10% chance of 4
            } else {
                console.error("Invalid random cell coordinates:", randomCell);
            }
        }
    }


    clone(): Board {
        const clonedBoard = new Board();
        clonedBoard.cells = this.cells.map((row) => row.map((cell) => ({ ...cell })));
        return clonedBoard;
    }
}