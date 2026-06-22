

import {useEffect, useRef, useCallback} from "react";


export function useMusic(source, {loop=false, volume=1} = {}) {
	const audioReference = useRef(null);

	useEffect(() => {
		const audio = new Audio(source);
		audio.loop = loop;
		audio.volume = volume;
		audio.preload = "auto";
		audioReference.current = audio;

		return () => {
			audio.pause();
			audioReference.current = null;
		};
	}, [source, loop, volume]);

	const play = useCallback(() => {
		audioReference.current?.play().catch(() => {});
	}, []);

	const pause = useCallback(() => {
		audioReference.current?.pause();
	}, []);

	return {play, pause, isReady: !!audioReference.current};
}