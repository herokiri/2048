
export class Cell {
    x: number;
    y: number;
    amount: number | null;
    key = Math.random();


    constructor(x: number, y: number, amount: number | null) {
        this.x = x;
        this.y = y;
        this.amount = amount;
    }

}