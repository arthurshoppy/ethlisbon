import { gnosis } from "viem/chains"

export const domain = {
	name: "Community Surveys",
	version: "1",
	chainId: gnosis.id,
}

export const types = {
	Respondent: [
		{ name: "name", type: "string" },
		{ name: "wallet", type: "address" },
	],
	Question: [
		{ name: "question", type: "string" },
		{ name: "answer", type: "string" },
	],
	Survey: [
		{ name: "respondent", type: "Respondent" },
		{ name: "questions", type: "Question[]" },
	],
}

export const primaryType = "Survey"