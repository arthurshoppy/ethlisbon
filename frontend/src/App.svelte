<script lang="ts">
	import { setContext } from "svelte";
	import { createRoutingCtx } from "./contexts/routing";

	import WalletOutlet from "./elements/WalletOutlet.svelte";

	import chevronLeft from "./assets/chevron-left.svg";
	import { createWeb3Ctx } from "./contexts/web3";
	import { createStoreCtx } from "./contexts/store";

	setContext("web3", createWeb3Ctx());

	setContext("store", createStoreCtx());

	const routing = createRoutingCtx();
	setContext("routing", routing);
	const root = routing.root;
	const route = routing.route;
	const routeCompontent = routing.routeComponent;
</script>

<main class="h-screen w-screen flex flex-col">
	<header class="shadow-lg z-10 py-2 px-6 flex items-center bg-white">
		{#if $root !== $route}
			<button
				class="bg-white hover:!bg-gray-200 active:!bg-gray-300 rounded grid !py-2 !px-0 mr-1"
				on:click={routing.goback}
			>
				<img class="w-4 h-4 ml-2" src={chevronLeft} alt="go back" />
			</button>
		{/if}
		<div class="text-lg mr-auto">Community Surveys</div>
		<WalletOutlet />
	</header>

	<outlet id="outlet" class="grid grow bg-[#F0EBDE]">
		<svelte:component this={$routeCompontent} />
	</outlet>
</main>
