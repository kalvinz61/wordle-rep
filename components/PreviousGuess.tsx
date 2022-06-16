import React from "react";
import styles from "../styles/wordle.module.css";

type PreviousGuessesProps = {
	submittedGuesses: string[][];
	word: string;
};

export function PreviousGuesses({ submittedGuesses, word }: PreviousGuessesProps) {
	const splitWord = word.toUpperCase().split("");

  const checkLetter = (guessedLetter: string, idx: number): string => {
    if(splitWord[idx] === guessedLetter) {
      return `${styles.green}`
    } else if(splitWord.includes(guessedLetter)) {
      return `${styles.yellow}`
    }
    return ''
  }

	return (
		<React.Fragment>
			{submittedGuesses.map((guessedWord, idx) => {
				return (
					<div className={styles.word} key={idx}>
						{guessedWord.map((guessedLetter, idx) => {
							return (
								<div className={`${styles.letterContainer} ${checkLetter(guessedLetter, idx)}`} key={idx}>
									{guessedLetter}
								</div>
							);
						})}
					</div>
				);
			})}
		</React.Fragment>
	);
}
