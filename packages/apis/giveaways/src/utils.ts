export const range = (start, end) =>
	Array.from(Array(end + 1).keys()).slice(start);

// Random with min and max exclusive
// export const randomNumber = (min, max) => {
// 	return Math.floor(Math.random() * (max - min) + min);
// };

// Random with min and max inclusive
export const randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomNewNumber = (min, max, alreadyUsed) => {
	let newNumber = -1;
	let isUsed = true;
	while (isUsed) {
		newNumber = randomNumber(min, max);
		isUsed = alreadyUsed.includes(newNumber);
	}
	return newNumber;
};
