import {Cell} from "../models/Cell";


interface ICell {
    cell: Cell;
}

function CellComponent({cell}: ICell) {
    return (
        <div className={['cell', cell.amount ? "filled-cell" : "", 'tile-' + cell.amount].join(' ')}>
            {cell.amount}
        </div>
    )
}

export default CellComponent;