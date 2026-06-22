

import {useState, useRef, useEffect} from "react";

import {Board} from "./Board.jsx";
import {History} from "./History.jsx";
import {calculateWinner} from "../utils/calculateWinner.js";
import {useMusic} from "../hooks/useMusic.js"
import {useSound} from "../hooks/useSound.js"

import musicSource from "../assets/lofi-2.mp3";
import clickSoundSource from "../assets/click-3.mp3";
import musicOnIcon from "../assets/music-on-2.svg";
import musicOffIcon from "../assets/music-off-2.svg";


/**
 * @summary Main Tic-Tac-Toe game component. Hold states, history, game logic
 */
export function Game() {

	// — Music and sound —

	const [isMusicOn, setIsMusicOn] = useState(false);
	const {play: playMusic, pause: pauseMusic} = useMusic(musicSource, {loop: true, volume: 0.6});
	const playSound = useSound(clickSoundSource, {volume: 0.6})

	function toggleMusic() {
		if (isMusicOn) {
			pauseMusic();
		} else {
			playMusic();
		}
		setIsMusicOn(!isMusicOn);
	}


	// — Game —
	
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const boardState = history[currentMove];
	const winner = calculateWinner(boardState);

	function handlePlay(newBoardState) {
		const nextHistory = [...history.slice(0, currentMove + 1), newBoardState];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	return (
		<>
			<header className="music">
				<button className="toggle" type="button" onClick={toggleMusic} onPointerDown={playSound} aria-label={isMusicOn ? "Turn music off" : "Turn music on"}>
					{isMusicOn ? <img src={musicOffIcon} alt="Turn music off" /> : <img src={musicOnIcon} alt="Turn music on" />}
				</button>
			</header>
			<main className="game">
				<section className="board-and-status">
					<Board xIsNext={xIsNext} boardState={boardState} onPlay={handlePlay} playSound={playSound}/>
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
				</section>
				<History history={history} setCurrentMove={setCurrentMove} playSound={playSound}/>
			</main>
		</>
	);
}
