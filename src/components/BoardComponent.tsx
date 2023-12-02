import {Board} from "../models/Board";
import {useEffect, useState} from "react";
import {Cell} from "../models/Cell";
import CellComponent from "./CellComponent";


function BoardComponent() {
    const [cells, setCells] = useState<Cell[][] | null>()


    function initBoard() {
        const board = new Board();
        board.initCells();
        setCells(board.cells);
    }
    function move(s: string) {
        if(s === "up") {

        }
    }

    useEffect(() => {
        initBoard();
    },[])

    return (
        <>
            <button onClick={() => move("up")}>up</button>
            <button onClick={() => move("down")}>down</button>
            <button onClick={() => move("right")}>right</button>
            <button onClick={() => move("left")}>left   </button>
            <div className={'board'}>
                {cells?.map(row =>
                    row.map(cell =>
                        <CellComponent key={cell.key} cell={cell}/>
                    )
                )}
            </div>
        </>
    )
}

export default BoardComponent;