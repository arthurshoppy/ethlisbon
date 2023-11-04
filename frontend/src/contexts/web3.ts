import { writable } from "svelte/store"
import { cachedStore } from "../helpers/reactivity-helpers"
import { type Address, createWalletClient, custom, verifyTypedData, type Hex } from "viem"
import { gnosis } from "viem/chains";

import * as SignIn from "../signatures/signin";
import * as Survey from "../signatures/survey";

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
				let sig: Hex | null = localStorage.getItem("signinsig") as Hex

				if (!sig) {
					const validSignInSig = await verifyTypedData({
						signature: sig,
						address,
						domain: SignIn.domain,
						types: SignIn.types,
						primaryType: SignIn.primaryType,
						message: {
							wallet: address
						}
					})
	
					if (!validSignInSig) {
						sig = await client.signTypedData({
							account: address,
							domain: SignIn.domain,
							types: SignIn.types,
							primaryType: SignIn.primaryType,
							message: {
								wallet: address
							}
						});
						localStorage.setItem("signinsig", sig)
					}
				}
				
				if (sig) {
					console.log(address)
					ctx.account.set(address)
				}
			}
		},

		disconnect() {
			ctx.account.set(null)
		},

		async answerSurvey() {
			await client.signTypedData({
				account: ctx.account.current!,
				domain: Survey.domain,
				types: Survey.types,
				primaryType: Survey.primaryType,
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

	// reconnect automatically
	client.getAddresses().then(r => r[0] && ctx.connect())

	return ctx
}