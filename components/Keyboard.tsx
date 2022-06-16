import React from "react";
import styles from "../styles/wordle.module.css";

export function Keyboard() {
	const topRow: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
	const midRow: string[] = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
	const botRow: string[] = ["z", "x", "c", "v", "b", "n", "m"];
	return (
		<div className={styles.keyboard}>
			<div className={styles.keyboardRow}>
				{topRow.map((key, idx) => {
					return (
						<div className={styles.keyboardChar} key={idx}>
							{key}
						</div>
					);
				})}
			</div>
			<div className={styles.keyboardRow}>
				{midRow.map((key, idx) => {
					return (
						<div className={styles.keyboardChar} key={idx}>
							{key}
						</div>
					);
				})}
			</div>
			<div className={styles.keyboardRow}>
				{botRow.map((key, idx) => {
					return (
						<div className={styles.keyboardChar} key={idx}>
							{key}
						</div>
					);
				})}
			</div>
		</div>
	);
}
