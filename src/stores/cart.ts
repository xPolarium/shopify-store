import { z } from "zod";
import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

import { getCart } from "../utils/shopify";
import type { CartResult } from "@/utils/schemas";

export const isCartDrawerOpen = atom(false);
export const isCartUpdating = atom(false);

const emptyCart = {
	id: "",
	checkoutUrl: "",
	totalQuantity: 0,
	lines: { nodes: [] },
	cost: { subtotalAmount: { amount: "", currencyCode: "" } },
};

export const cart = persistentAtom<z.infer<typeof CartResult>>(
	"cart",
	emptyCart,
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	}
);

export async function initCart() {
	const sessionStarted = sessionStorage.getItem("sessionStarted");
	if (!sessionStarted) {
		sessionStorage.setItem("sessionStarted", "true");
		const localCart = cart.get();
		const cartId = localCart?.id;
		if (cartId) {
			const data = await getCart(cartId);

			if (data) {
				cart.set({
					id: data.id,
					cost: data.cost,
					checkoutUrl: data.checkoutUrl,
					totalQuantity: data.totalQuantity,
					lines: data.lines,
				});
			} else {
				// If the cart doesn't exist in Shopify, reset the cart store
				cart.set(emptyCart);
			}
		}
	}
}
