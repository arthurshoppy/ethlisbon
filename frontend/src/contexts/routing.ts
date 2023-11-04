import { type ComponentType } from "svelte";
import { readable, writable } from "svelte/store";
import { cachedStore } from "../helpers/reactivity-helpers";

import Surveys from "../routes/Surveys.svelte";

export function createRoutingCtx() {
	const index = 'surveys'

	const routes: { [key: string]: ComponentType } = {
		surveys: Surveys
	}

	let navigations = 0

	type Param = { [key: string]: string }

	function formatParam(param: Param) {
		const sp = new URLSearchParams()
		for (const k in param) {
			sp.set(k, param[k])
		}
		return '?' + sp.toString()
	}

	function parseParam(sp: URLSearchParams) {
		const param: Param = {}
		for (const e of sp) {
			param[e[0]] = e[1]
		}
		return param
	}

	const ctx = {
		root: cachedStore(writable<string>()),
		route: cachedStore(writable<string>()),
		param: cachedStore(writable<Param | undefined>()),

		routeComponent: readable<ComponentType>(undefined, (set) => {
			const unsub = ctx.route.subscribe(r => {
				set(routes[r])
			}) as () => void;

			return () => unsub();
		}),

		goto(route: string, param?: Param, asRoot = false) {
			window.history.pushState(param, route, (asRoot ? ('/' + route) : `${ctx.root.current}/${route}`) + (param ? formatParam(param) : ''))
			ctx.route.set(route)
			ctx.param.set(param)
			if (asRoot) ctx.root.set(route)
			navigations++
		},

		goback() {
			if (navigations > 0) {
				window.history.back()
			} else {
				const [_, root, route] = window.location.pathname.split('/')
				if (route) {
					ctx.goto(root, undefined, true)
				}
			}
		}
	}

	function stateFromUrl() {
		const [_, root, route] = window.location.pathname.split('/')
		const param = window.location.search
		ctx.root.set(root)
		ctx.param.set(param ? parseParam(new URLSearchParams(param)) : undefined)
		ctx.route.set(route ?? root)
	}

	if (window.location.pathname.length > 1) {
		stateFromUrl()
	} else {
		ctx.root.set(index)
		ctx.route.set(index)
		window.history.replaceState(undefined, index, index)
	}

	window.onpopstate = () => {
		stateFromUrl()
		navigations--
	};

	return ctx
}