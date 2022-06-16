import React from "react";
import styles from "../styles/wordle.module.css";

type CurrentGuessProps = {
	guess: string[];
};
export function CurrentGuess({ guess }: CurrentGuessProps) {
	return (
		<div className={styles.word}>
			{/* generate 5 empty boxes and only fill them if there is a guessed letter at that idx */}
			{Array.from({ length: 5 }).map((letter, idx) => {
				return (
					<div className={`${styles.letterContainer} ${styles.emptyContainer}`} key={idx}>
						{guess[idx] || ""}
					</div>
				);
			})}
		</div>
	);
}
