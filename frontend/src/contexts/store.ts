import { writable } from "svelte/store";
import { getContext } from "svelte";
import type { createWeb3Ctx } from "./web3";

type Survey = { id: string, title: string, desc: string }

export function createStoreCtx() {

	const web3 = getContext<ReturnType<typeof createWeb3Ctx>>("web3");

	const ctx = {
		currentSurvey: writable<Survey>(),

		surveys: writable<Survey[] | null>(null, (set) => {
			return web3.account.subscribe(acc => {
				if (!acc) {
					set([])
					return
				}
				set(null)

				set([{ id: "1", title: "Lol", desc: ""}])
			})
		})
	}

	return ctx
}