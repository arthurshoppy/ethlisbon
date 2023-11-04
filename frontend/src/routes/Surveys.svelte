<script lang="ts">
	import { getContext } from "svelte";
	import type { createWeb3Ctx } from "../contexts/web3";
	import type { createRoutingCtx } from "../contexts/routing";

	const web3 = getContext<ReturnType<typeof createWeb3Ctx>>("routing");
	const routing = getContext<ReturnType<typeof createRoutingCtx>>("routing");

	const surveys = [
		{ id: "1", title: "Test 1" },
		{ id: "2", title: "Test 2" },
	];
</script>

<div
	class="grid grid-rows-[min-content,1fr] gap-2 w-full max-w-lg mx-auto mt-20"
>
	<div class="flex grow justify-between">
		<h2 class="text-lg">My Surveys</h2>
		<button class="text-white bg-sky-500 rounded-lg py-1 px-4">Create</button>
	</div>
	<div class="grid grid-cols-4 gap-4 auto-rows-min">
		{#each surveys as survey, idx}
			<button
				class="border rounded-lg aspect-square bg-gradient-to-b from-sky-500/95 to-white hover:scale-105 cursor-pointer"
				on:click={() => routing.goto("view", { id: survey.id })}
			>
				<div class="text-center text-lg text-white">
					{survey.title}
				</div>
			</button>
		{/each}
	</div>
</div>
