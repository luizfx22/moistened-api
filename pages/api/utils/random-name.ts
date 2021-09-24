import { NextApiRequest, NextApiResponse } from "next";
import wordList from "../../../json/wordlist.json";

function capFirst(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getSafeRandomName(): string {
	const part1 = capFirst(wordList[0][getRandomInt(0, wordList[0].length + 1)]);
	const part2 = capFirst(wordList[1][getRandomInt(0, wordList[1].length + 1)]);
	const part3 = capFirst(wordList[1][getRandomInt(0, wordList[0].length + 1)]);

	return `${part1} ${part2} ${part3}`;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(404);

	res.status(201).json({ name: getSafeRandomName() });
};
