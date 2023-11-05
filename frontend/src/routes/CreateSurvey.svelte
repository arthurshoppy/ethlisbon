<script lang="ts">
	let questions: { question?: string; type: string }[] = [];

	let select = false;

	function add(type: string) {
		questions = [...questions, { type }];
		select = false;
	}
</script>

<div class="grid">
	<div
		class="border-b-0 border border-gray-500 rounded-t-xl mt-8 w-full max-w-lg mx-auto bg-white flex flex-col gap-4 p-6"
	>
		<input class="outline-none text-3xl h-10" placeholder="Untitled" />

		<textarea class="outline-none text-xl" placeholder="Description" />

		{#each questions as question}
			<div class="">
				{#if question.type === "short-text"}
					<div class="text-xs">Short Text</div>
					<input
						class="outline-none"
						placeholder="Question"
						bind:value={question.question}
					/>
				{/if}
				{#if question.type === "long-text"}
					<div class="text-xs">Long Text</div>
					<input
						class="outline-none"
						placeholder="Question"
						bind:value={question.question}
					/>
				{/if}
			</div>
		{/each}

		<div class="relative">
			<button
				on:click={() => (select = true)}
				class="bg-[#DD7143] rounded-full w-8 h-8 text-white grid items-center relative"
			>
				<div class="text-3xl text-center absolute inset-x-0 -inset-y-1">+</div>
			</button>

			{#if select}
				<div
					class="absolute bg-white border border-gray-500 rounded-lg py-2 px-2 top-2 left-2 grid gap-2"
				>
					<div
						class="bg-gray-50 hover:bg-gray-200 cursor-pointer px-2 rounded"
						on:click={() => add("short-text")}
					>
						Short Text
					</div>
					<div
						class="bg-gray-50 hover:bg-gray-200 cursor-pointer px-2 rounded"
						on:click={() => add("long-text")}
					>
						Long Text
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
