import { readable, writable } from "svelte/store"
import { cachedStore, consistentStore } from "../helpers/reactivity-helpers"
import { type Address, createWalletClient, custom } from "viem"
import { gnosis } from "viem/chains";

export function createWeb3Ctx() {
	const client = createWalletClient({
		chain: gnosis,
		transport: custom((window as any).ethereum),
	});

	const ctx = {
		account: cachedStore(writable<Address | null>(null)),

		async connect() {
			await client.switchChain({ id: gnosis.id });
	
			let [address] = await client.getAddresses();
			if (!address) {
				address = (await client.requestAddresses())[0];
			}
			
			if (address) {
				console.log(address)
				ctx.account.set(address)
			}
		},

		disconnect() {
			ctx.account.set(null)
		},

		surveys: consistentStore(readable<{}[] | null>(null, (set) => {
			// TODO

		})),

		async answerSurvey() {
			await client.signTypedData({
				account: ctx.account.current!,
				domain: {
					name: "Community Surveys",
					version: "1",
					chainId: gnosis.id,
				},
				types: {
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
				},
				primaryType: "Survey",
				message: {
					respondent: {
						name: "You",
						wallet: ctx.account.current!,
					},
					questions: [
						{
							question: "Do you like it",
							answer: "I do not like it",
						},
					],
				},
			});
		}
	}

	return ctx
}