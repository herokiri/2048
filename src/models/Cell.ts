
export class Cell {
    private _x: number;
    private _y: number;
    private _amount: number | null;
    key;


    constructor(x: number, y: number, amount: number | null) {
        this._x = x;
        this._y = y;
        this._amount = amount;
        this.key = Math.random();

    }


    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get amount(): number | null {
        return this._amount;
    }

    set amount(value: number | null) {
        this._amount = value;
    }
}