

import {useEffect, useRef, useCallback} from "react";


export function useSound(source, {volume = 1} = {}) {
	const audioReference = useRef(null);

	useEffect(() => {
		const audio = new Audio(source);
		audio.volume = volume;
		audio.preload = "auto";
		audioReference.current = audio;

		return () => {
			audio.pause();
			audioReference.current = null;
		}
	}, [source, volume])

	return useCallback(() => {
		const audio = audioReference.current;
		if (!audio) return;
		audio.currentTime = 0;
		audio.play().catch(() => {});
	}, []);
}