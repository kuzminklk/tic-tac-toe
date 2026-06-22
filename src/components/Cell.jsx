
/**
 * @summary Single cell component
 */
export function Cell({symbol, onCellClick, playSound}) {
	const symbolClass = symbol ? symbol.toLowerCase() : "";
	return (
	<button className={`cell ${symbolClass}`} onClick={onCellClick} onPointerDown={playSound}>
		{symbol}
	</button>
	);
}