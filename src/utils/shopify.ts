import { createStorefrontClient } from "@shopify/hydrogen-react";

import { config } from "./config";

import { ProductQuery, ProductByHandleQuery, GetCartQuery } from "./graphql";
import { CartResult, ProductResult } from "./schemas";
import { z } from "zod";

export const client = createStorefrontClient({
	// load environment variables according to your framework and runtime
	storeDomain: config.shopifyShop,
	privateStorefrontToken: config.privateShopifyAccessToken,
});

const makeShopifyRequest = async (
	query: string,
	variables: Record<string, unknown> = {},
	buyerIp: string = ""
) => {
	const response = await fetch(client.getStorefrontApiUrl(), {
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: client.getPrivateTokenHeaders({ buyerIp }),
		method: "POST",
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const json = await response.json();
	if (json.errors) {
		throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
	}

	return json.data;
};

export const getProducts = async (options: {
	limit?: number;
	buyerIp: string;
}) => {
	const { limit = 10, buyerIp } = options;

	const { products } = await makeShopifyRequest(
		ProductQuery,
		{ first: limit },
		buyerIp
	);

	if (!products) {
		throw new Error("No products.");
	}

	const productsList = products.edges.map((edge: any) => edge.node);
	const ProductsResult = z.array(ProductResult);
	const parsedProducts = ProductsResult.parse(productsList);

	return parsedProducts;
};

export const getCart = async (id: string) => {
	const data = await makeShopifyRequest(GetCartQuery, { id });

	const { cart } = data;
	const parsedCart = CartResult.parse(cart);

	return parsedCart;
};
