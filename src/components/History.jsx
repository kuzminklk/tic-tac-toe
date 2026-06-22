

export function History({history, setCurrentMove, playSound}) {

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
				<button onClick={() => jumpTo(moveIndex)} onPointerDown={playSound}>
					{description}
				</button>
			</li>
		)
	})

	return (
		<section className="history">
			<h3>History</h3>
			<ol>{moves}</ol>
		</section>
	)
}