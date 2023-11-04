<script lang="ts">
	import { getContext } from "svelte";
	import type { createWeb3Ctx } from "../contexts/web3";

	const web3 = getContext<ReturnType<typeof createWeb3Ctx>>("web3");
	const acc = web3.account;
</script>

{#if $acc}
	<button
		class="border border-black rounded-lg hover:bg-gray-200 active:bg-gray-300 py-1 px-4"
		on:click={web3.disconnect}
	>
		{$acc.substring(0, 5) + ".." + $acc.substring(39)}
	</button>
{:else}
	<button
		class="text-white border border-transparent rounded-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-700 py-1 px-4"
		on:click={web3.connect}
	>
		Sign In
	</button>
{/if}
