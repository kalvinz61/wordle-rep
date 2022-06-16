import React, { useEffect, useState } from "react";
import { EmptyGuess } from "./EmptyGuess";
import { CurrentGuess } from "./CurrentGuess";
import { PreviousGuesses } from "./PreviousGuess";
import { checkDictionary, isAlphabet } from "../utils";
import { Keyboard } from "./Keyboard";
import axios from "axios";
import styles from "../styles/wordle.module.css";

export default function Wordle() {
	const [word, setWord] = useState<string>("");
	const [guess, setGuess] = useState<string[]>([]);
	const [submittedGuesses, setSubmittedGuesses] = useState<string[][]>([]);
	const [winOrLose, setWinOrLose] = useState<boolean>(false);
	//listening for keydown
	useEffect(() => {
		async function handleKeydown({ key }: { key: string }) {
			const isChar = isAlphabet(key);
			switch (key) {
				//Only add to guess if alphabetical letter.
				case isChar:
					//Needs better fix, guess.length is one step behind because setState is async.
					if (guess.length > 4) {
						break;
					}
					setGuess((prev) => [...prev, key.toUpperCase()]);
					break;
				//Remove last letter added
				case "Backspace":
					const copy = [...guess];
					copy.pop();
					setGuess(copy);
					break;
				//Submit guess only if 5 chars long and valid dictionary word.
				case "Enter":
					if (guess.length === 5) {
						const checkWord = guess.join("");
						const isWord = await checkDictionary(checkWord);
						if (isWord) {
							const copy = [...submittedGuesses];
							copy.push(guess);
							setSubmittedGuesses(copy);
							setGuess([]);
						} else {
							window.alert("Not a valid word");
						}
					}
			}
		}
		//clean up event listener
		window.addEventListener("keydown", handleKeydown);
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	}, [guess, submittedGuesses]);

	//checking for game over
	useEffect(() => {
		if (submittedGuesses.length === 6 && winOrLose === false) {
			window.alert("game over");
		} else if (winOrLose) {
			window.alert("You Win!");
		}
	}, [submittedGuesses, winOrLose]);

	//Get word
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get("https://random-word-api.herokuapp.com/word?length=5");
			setWord(data[0]);
		};
		fetchData();
	}, []);

	//logging
	useEffect(() => {
		console.log("word", word);
	}, [word, submittedGuesses]);

	return (
		<div className={styles.root}>
			<h1 className={styles.title}>WORDLE-REP</h1>
			<PreviousGuesses submittedGuesses={submittedGuesses} word={word} />
			{submittedGuesses.length >= 6 ? null : <CurrentGuess guess={guess} />}
			{Array.from({ length: 5 - submittedGuesses.length }).map((row, idx) => {
				return <EmptyGuess key={idx} />;
			})}
			<Keyboard />
		</div>
	);
}
