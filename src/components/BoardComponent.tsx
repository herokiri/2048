import { Board } from "../models/Board";
import { useEffect, useState } from "react";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

function BoardComponent() {
    const [cells, setCells] = useState<Cell[][] | null>();
    const [board, setBoard] = useState(new Board());

    function move(direction: string) {
        const movedBoard = board.clone(); // Create a copy of the board to avoid mutating the state directly
        console.log(board);

        switch (direction) {
            case "up":
                movedBoard.moveUp();
                break;
            case "down":
                movedBoard.moveDown();
                break;
            case "right":
                movedBoard.moveRight();
                break;
            case "left":
                movedBoard.moveLeft();
                break;
            default:
                break;
        }

        setBoard(movedBoard);
        setCells(movedBoard.cells);
    }

    function initBoard() {
        const copyboard = board.clone();
        copyboard.initCells();
        copyboard.addRandomCell();
        setBoard(copyboard);
        setCells(copyboard.cells);
    }

    useEffect(() => {
        initBoard();
    }, []);

    return (
        <>
            <button onClick={() => move("up")}>up</button>
            <button onClick={() => move("down")}>down</button>
            <button onClick={() => move("right")}>right</button>
            <button onClick={() => move("left")}>left</button>
            <div className={"board"}>
                {cells?.map((row) =>
                    row.map((cell) => <CellComponent key={cell.key} cell={cell} />)
                )}
            </div>
        </>
    );
}

export default BoardComponent;
