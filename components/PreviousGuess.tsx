import React from "react";
import styles from "./wordle.module.css";

type PreviousGuessesProps = {
	submittedGuesses: string[][];
};

export function PreviousGuesses({ submittedGuesses }: PreviousGuessesProps) {
	return (
		<React.Fragment>
			{submittedGuesses.map((guess, idx) => {
				return (
					<div className={styles.word} key={idx}>
						{guess.map((letter, idx) => {
							return (
								<div className={styles.letterContainer} key={idx}>
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
