


import { useState, useRef, useEffect } from "react";



// ——— Components ———

/**
 * @summary Main Tic-Tac-Toe game component. Hold states, history, game logic
 */
export default function Game() {
	// — States, references and variables —
	// Game
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const boardState = history[currentMove];
	const winner = calculateWinner(boardState);
	// Music
	const [isMusicOn, setIsMusicOn] = useState(false);
	const audioRef = useRef(null);
	// Click sound 
	const clickAudioRef = useRef(null);
	let clickSoundLock = false;

	// — Effects —
	useEffect(() => {
		if(audioRef.current) {
			audioRef.current.volume = 0.6; // Set music volume to 60%
		}

		clickAudioRef.current = new Audio("/click-3.mp3");
		clickAudioRef.current.volume = 0.6; // Set click sound volume to 60%
		clickAudioRef.current.preload = "auto";
	}, []);

	// — Functions —
	// Game functions
	function handlePlay(newBoardState) {
		const nextHistory = [...history.slice(0, currentMove + 1), newBoardState];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(moveIndex) {
		setCurrentMove(moveIndex);
	}

	// Create a list of moves to jump to
	const moves = history.map((boardState, moveIndex) => {
		let description;
		if (moveIndex > 0) {
			description = "Go to move #" + moveIndex;
		} else {
			description = "Go to game start!";
		}

		return (
			<li key={moveIndex}>
				<button onClick={() => jumpTo(moveIndex)} onPointerDown={playTouchSound}>
					{description}
				</button>
			</li>
		)
	})

	// Music functions
	function toggleMusic() {
		const audio = audioRef.current;
		if (!audio) return;

		if (isMusicOn) {
			audio.pause();
		} else {
			audio.play();
		}
		setIsMusicOn(!isMusicOn);
	}

	// Click sound functions
	function playTouchSound() {
		const audio = clickAudioRef.current;
		if (!audio) return;

		if (clickSoundLock) return;
		setTimeout(() => {
			clickSoundLock = false;
		}, 125);
		clickSoundLock = true;

		audio.currentTime = 0;
		audio.play().catch(() => {});
	}

	// — Component —
  return (
		<>
			<div className="music">
				<audio ref={audioRef} src="/lofi-2.mp3" loop preload="auto"></audio>
				<button className="toggle" type="button" onClick={toggleMusic} onPointerDown={playTouchSound} aria-label={isMusicOn ? "Turn music off" : "Turn music on"}>
					{isMusicOn ? <img src="/music-off-2.svg" alt="Turn music off" /> : <img src="/music-on-2.svg" alt="Turn music on" />}
				</button>
			</div>
			<div className="game">
				<div className="board-and-status">
					<Board history={history} xIsNext={xIsNext} boardState={boardState} onPlay={handlePlay} playTouchSound={playTouchSound}/>
					<div className="status">
						{
						winner ? (
						<>
							Winner: <span className={winner.toLowerCase()}>{winner}</span>
						</>
						) : ( 
						<>
							Next player: {xIsNext ? <span className="x">X</span> : <span className="o">O</span>}
						</>
						)}
					</div>
				</div>
				<div className="history">
					<h3>History</h3>
					<ol>{moves}</ol>
				</div>
			</div>
		</>
  );
}


/**
 * @summary Game board component. Handle clicks
 */
function Board({history, xIsNext, onPlay, boardState, playTouchSound}) {

	function handleClick(index) {
		if (boardState[index] || calculateWinner(boardState)) {
			return;
		}
		let newState = boardState.slice();
		newState[index] = xIsNext ? "X" : "O";
		onPlay(newState);
	}

	return (
	<>
		<div className="board">
			<div className="row">
				<Cell symbol={boardState[0]} onCellClick={() => handleClick(0)} playTouchSound={playTouchSound}/>	
				<Cell symbol={boardState[1]} onCellClick={() => handleClick(1)} playTouchSound={playTouchSound}/>	
				<Cell symbol={boardState[2]} onCellClick={() => handleClick(2)} playTouchSound={playTouchSound}/>	
			</div>
			<div className="row">
				<Cell symbol={boardState[3]} onCellClick={() => handleClick(3)} playTouchSound={playTouchSound}/>	
				<Cell symbol={boardState[4]} onCellClick={() => handleClick(4)} playTouchSound={playTouchSound}/>	
				<Cell symbol={boardState[5]} onCellClick={() => handleClick(5)} playTouchSound={playTouchSound}/>	
			</div>
			<div className="row">
				<Cell symbol={boardState[6]} onCellClick={() => handleClick(6)} playTouchSound={playTouchSound}/>	
				<Cell symbol={boardState[7]} onCellClick={() => handleClick(7)} playTouchSound={playTouchSound}/>	
				<Cell symbol={boardState[8]} onCellClick={() => handleClick(8)} playTouchSound={playTouchSound}/>	
			</div>
		</div>
	</>
	);
}

/**
 * @summary Single cell component
 */
function Cell({symbol, onCellClick, playTouchSound}) {
	const symbolClass = symbol ? symbol.toLowerCase() : "";
	return (
	<button className={`cell ${symbolClass}`} onClick={onCellClick} onPointerDown={playTouchSound}>
		{symbol}
	</button>
	);
}



// ——— Helper functions ———

/**
 * @summary Calculate the winner of Tic-Tac-Toe
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
