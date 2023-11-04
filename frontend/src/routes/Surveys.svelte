<script lang="ts">
	import { getContext } from "svelte";
	import type { createRoutingCtx } from "../contexts/routing";

	import { createPublicClient, createWalletClient, custom, http } from "viem";
	import { gnosis } from "viem/chains";

	const routing = getContext<ReturnType<typeof createRoutingCtx>>("routing");

	const client = createWalletClient({
		chain: gnosis,
		transport: custom((window as any).ethereum),
	});

	async function vote() {
		try {
			await client.switchChain({ id: gnosis.id });

			let [address] = await client.getAddresses();
			if (!address) {
				address = (await client.requestAddresses())[0];
			}

			console.log(address);

			await client.signTypedData({
				account: address,
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
						wallet: address,
					},
					questions: [
						{
							question: "Do you like it",
							answer: "I do not like it",
						},
					],
				},
			});

			return true;
		} catch {
			return false;
		}
	}
</script>

<div class="grid">
	My Surveys

	<button on:click={vote}>Vote</button>
</div>
