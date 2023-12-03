import { Board } from "../models/Board";
import { useEffect, useState } from "react";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

function BoardComponent() {
    const [cells, setCells] = useState<Cell[][] | null>();
    const [board, setBoard] = useState(new Board());

    function move(direction: string) {
        setBoard(prevBoard => {
            const movedBoard = prevBoard.clone();

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

            setCells(movedBoard.cells);
            return movedBoard;
        });
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

        const handleKeyPress = (event) => {
            if (event.key.toLowerCase() === 'ц' ||  event.key.toLowerCase() === 'w') {
                move('up');
            }
            else if(event.key.toLowerCase() === 'd' ||  event.key.toLowerCase() === 'в') {
                move('right');
            }
            else if(event.key.toLowerCase() === 's' ||  event.key.toLowerCase() === 'ы') {
                move('down');
            }
            else if(event.key.toLowerCase() === 'a' ||  event.key.toLowerCase() === 'ф') {
                move('left');
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };

    }, []);

    return (
        <>
            {/*<button onClick={() => move("up")}>up</button>*/}
            {/*<button onClick={() => move("down")}>down</button>*/}
            {/*<button onClick={() => move("right")}>right</button>*/}
            {/*<button onClick={() => move("left")}>left</button>*/}
            <div className={"board"}>
                {cells?.map((row) =>
                    row.map((cell) => <CellComponent key={cell.key} cell={cell} />)
                )}
            </div>
        </>
    );
}

export default BoardComponent;
