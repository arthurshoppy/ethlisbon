<script lang="ts">
	import { setContext } from "svelte";
	import { createRoutingCtx } from "./contexts/routing";

	import WalletOutlet from "./elements/WalletOutlet.svelte";

	import chevronLeft from "./assets/chevron-left.svg";

	const routing = createRoutingCtx();
	setContext("routing", routing);
	const routeCompontent = routing.routeComponent;
</script>

<main class="h-screen w-screen flex flex-col">
	<header class="shadow-lg py-2 px-6 flex items-center">
		<button class="hover:bg-gray-200 active:bg-gray-300 rounded grid py-2 mr-1">
			<img class="w-4 h-4 ml-2" src={chevronLeft} />
		</button>
		<div class="text-lg mr-auto">Community Surveys</div>
		<WalletOutlet />
	</header>

	<outlet id="outlet" class="m-auto">
		<svelte:component this={$routeCompontent} />
	</outlet>
</main>
