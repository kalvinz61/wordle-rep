import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./wordle.module.css";

export default function Wordle() {
	const [word, setWord] = useState("");
	const [guess, setGuess] = useState<Array<string>>([]);
	const [submittedGuesses, setSubmittedGuesses] = useState<Array<Array<string>>>([]);
	const [winOrLose, setWinOrLose] = useState<boolean>(false);
	//listening for keydown
	useEffect(() => {
		function handleKeydown({ key }: { key: string }) {
			const isChar = /^[a-zA-Z]$/.test(key);
			console.log(key);
			//only add to array if it is a letter and less than 5 curent letters
			if (isChar && guess.length < 5) {
				setGuess((prev) => [...prev, key.toUpperCase()]);
			}
			//removing a letter
			if (key === "Backspace") {
				const copy = [...guess];
				copy.pop();
				setGuess(copy);
			}
			//submitting a guess
			if (guess.length === 5 && key === "Enter") {
				const copy = [...submittedGuesses];
				copy.push(guess);
				setSubmittedGuesses(copy);
				setGuess([]);
			}
		}
		//remove event listener
		window.addEventListener("keydown", handleKeydown);
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	}, [guess, submittedGuesses]);

	//checking for game over
	useEffect(() => {
		console.log(guess);
		console.log(submittedGuesses);
		console.log(word);
		if (submittedGuesses.length === 6 && winOrLose === false) {
			window.alert("game over");
		} else if (winOrLose) {
			window.alert("You Win!");
		}
	}, [submittedGuesses, winOrLose, guess, word]);

	//Get word
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get("https://random-word-api.herokuapp.com/word?length=5");
			setWord(data);
		};
		fetchData();
	}, []);
	return (
		<div className={styles.root}>
			<h1>WORDLE-REP</h1>
			<div className={styles.word}>
				{/* generate 5 empty boxes and only fill them if there is a curent guess at that index */}
				{Array.from({ length: 5 }).map((letter, idx) => {
					return (
						<div className={styles.letterContainer} key={idx}>
							{guess[idx] || ""}
						</div>
					);
				})}
			</div>
			<div>
				{/* {Array.from({ length: 5 }).map((letter, idx) => {
					return <div className={styles.letterContainer} key={idx}></div>;
				})} */}
			</div>
		</div>
	);
}
