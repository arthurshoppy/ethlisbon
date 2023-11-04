<script lang="ts">
	import { setContext } from "svelte";
	import { createRoutingCtx } from "./contexts/routing";

	import WalletOutlet from "./elements/WalletOutlet.svelte";

	import chevronLeft from "./assets/chevron-left.svg";
	import { createWeb3Ctx } from "./contexts/web3";

	setContext("web3", createWeb3Ctx());

	const routing = createRoutingCtx();
	setContext("routing", routing);
	const root = routing.root;
	const route = routing.route;
	const routeCompontent = routing.routeComponent;
</script>

<main class="h-screen w-screen flex flex-col">
	<header class="shadow-lg py-2 px-6 flex items-center">
		{#if $root !== $route}
			<button
				class="hover:bg-gray-200 active:bg-gray-300 rounded grid py-2 mr-1"
			>
				<img class="w-4 h-4 ml-2" src={chevronLeft} alt="go back" />
			</button>
		{/if}
		<div class="text-lg mr-auto">Community Surveys</div>
		<WalletOutlet />
	</header>

	<outlet id="outlet" class="grid grow">
		<svelte:component this={$routeCompontent} />
	</outlet>
</main>
