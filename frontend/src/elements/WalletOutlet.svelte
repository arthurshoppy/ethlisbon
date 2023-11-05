<script lang="ts">
	import { getContext } from "svelte";
	import type { createWeb3Ctx } from "../contexts/web3";

	const web3 = getContext<ReturnType<typeof createWeb3Ctx>>("web3");
	const acc = web3.account;
</script>

{#if $acc}
	<button
		class="border !border-[#3E6957] !bg-white hover:!bg-gray-200 active:!bg-gray-300 text-[currentColor]"
		on:click={web3.disconnect}
	>
		{$acc.substring(0, 5) + ".." + $acc.substring(39)}
	</button>
{:else}
	<button class="border border-transparent" on:click={web3.connect}>
		Sign In
	</button>
{/if}
