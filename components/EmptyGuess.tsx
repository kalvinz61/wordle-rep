import React from "react";
import styles from "../styles/wordle.module.css";

export function EmptyGuess() {
	return (
		<div className={styles.word}>
			{Array.from({ length: 5 }).map((row, idx) => {
				return <div className={`${styles.letterContainer} ${styles.emptyContainer}`} key={idx}></div>;
			})}
		</div>
	);
}
