

import {Cell} from "./Cell.jsx";
import {calculateWinner} from "../utils/calculateWinner.js";


/**
 * @summary Game board component. Handle clicks
 */
export function Board({xIsNext, onPlay, boardState, playSound}) {

	function handleClick(index) {
		if (boardState[index] || calculateWinner(boardState)) {
			return;
		}
		let newState = boardState.slice();
		newState[index] = xIsNext ? "X" : "O";
		onPlay(newState);
	}

	const rows = [0,1,2].map((row) => {
		return (
		<div className="row" key={row}>
			{[0,1,2].map((column) => {
				const index = row * 3 + column;
				return (
					<Cell key={index} symbol={boardState[index]} onCellClick={() => handleClick(index)} playSound={playSound}/>
				)
			})}
		</div>
		)
	})

	return (
		<div className="board">
			{rows}
		</div>
	);
}