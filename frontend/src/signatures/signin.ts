import { gnosis } from "viem/chains"

export const domain = {
	name: "Community Surveys",
	version: "1",
	chainId: gnosis.id,
}

export const types = {
	SignIn: [
		{ name: "wallet", type: "address" }
	]
}

export const primaryType = "SignIn"