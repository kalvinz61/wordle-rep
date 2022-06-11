import React from "react";
import styles from "./wordle.module.css";

type PreviousGuessesProps = {
	submittedGuesses: string[][];
	word: string;
};

export function PreviousGuesses({ submittedGuesses, word }: PreviousGuessesProps) {
	const splitWord = word.toUpperCase().split("");

	return (
		<React.Fragment>
			{submittedGuesses.map((guess, idx) => {
				return (
					<div className={styles.word} key={idx}>
						{guess.map((letter, idx) => {
              
							return (
								<div className={`${styles.letterContainer} ${styles.green}`} key={idx}>
									{letter}
								</div>
							);
						})}
					</div>
				);
			})}
		</React.Fragment>
	);
}
