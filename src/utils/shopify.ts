import { createStorefrontClient } from "@shopify/hydrogen-react";

import { config } from "./config";

import { ProductQuery, ProductByHandleQuery } from "./graphql";

export const client = createStorefrontClient({
	// load environment variables according to your framework and runtime
	storeDomain: config.shopifyShop,
	privateStorefrontToken: config.privateShopifyAccessToken,
});

export const getProducts = async (options: {
	limit?: number;
	buyerIp: string;
}) => {
	const { limit = 10, buyerIp } = options;

	// Get the Storefront API url
	const response = await fetch(client.getStorefrontApiUrl(), {
		body: JSON.stringify({
			query: ProductQuery,
			variables: { first: limit },
		}),
		// Generate the headers using the private token. Additionally, you can pass in the buyer's IP address from the request object to help prevent bad actors from overloading your store.
		headers: client.getPrivateTokenHeaders({ buyerIp }),
		method: "POST",
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const json = await response.json();
	return json;
};