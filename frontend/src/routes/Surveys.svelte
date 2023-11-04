<script lang="ts">
	import { getContext } from "svelte";
	import type { createRoutingCtx } from "../contexts/routing";
	import type { createStoreCtx } from "../contexts/store";

	const routing = getContext<ReturnType<typeof createRoutingCtx>>("routing");

	const store = getContext<ReturnType<typeof createStoreCtx>>("store");
	const surveys = store.surveys;
</script>

<div
	class="grid grid-rows-[min-content,1fr] gap-2 w-full max-w-lg mx-auto mt-20"
>
	<div class="flex grow justify-between">
		<h2 class="text-lg">My Surveys</h2>
		<button
			class="text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-lg py-1 px-4"
			on:click={() => routing.goto("create")}
		>
			Create
		</button>
	</div>
	<div class="grid grid-cols-4 gap-4 auto-rows-min relative">
		{#if $surveys === null}
			Fetching surveys...
		{:else if $surveys.length === 0}
			<div class="text-center w-full absolute text-gray-500">No surveys</div>
		{:else}
			{#each $surveys as survey}
				<button
					class="border rounded-lg aspect-square bg-gradient-to-b from-sky-500/95 to-white hover:scale-105 cursor-pointer"
					on:click={() => routing.goto("view", { id: survey.id })}
				>
					<div class="text-center text-lg text-white">
						{survey.title}
					</div>
				</button>
			{/each}
		{/if}
	</div>
</div>
