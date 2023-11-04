import { z } from "zod";

export const configSchema = z.object({
	shopifyShop: z.string(),
	publicShopifyAccessToken: z.string(),
	privateShopifyAccessToken: z.string(),
	apiVersion: z.string(),
});
