import { z } from "zod";
import { ProductResult, type ImageResult } from "@/utils/schemas";

import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import { useMoney } from "@shopify/hydrogen-react";
import type { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";

const srcSetValues = [
	50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000, 2500,
];

// Function to generate Shopify image url with width and height parameters
function imageFilter(
	image: z.infer<typeof ImageResult>,
	size: { width: number; height?: number }
) {
	const { width, height = "" } = size;

	return image && `${image.url}&width=${width}&height=${height}`;
}

interface ProductCardProps {
	product: z.infer<typeof ProductResult>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const money = useMoney(product?.variants?.nodes[0]?.price as MoneyV2);

	return (
		<div
			key={product?.id}
			className="flex flex-col justify-between items-center rounded-md border-2 p-4 border-neutral-200"
		>
			<h1 className="text-xl font-thin text-center">{product?.title}</h1>
			<img
				src={product?.featuredImage?.url}
				alt={product?.featuredImage?.altText || ""}
				srcSet={srcSetValues
					.filter(
						(value) =>
							value < (product?.featuredImage?.width || 200)
					)
					.map((value) => {
						if ((product?.featuredImage?.width || 200) >= value) {
							if (product)
								return `${imageFilter(product?.featuredImage, {
									width: value,
								})} ${value}w`;
						}
					})
					.join(", ")
					.concat(
						`, ${product?.featuredImage?.url} ${product?.featuredImage?.width}w`
					)}
			/>

			<p>{money.withoutTrailingZeros}</p>

			<Button className="px-2" variant="outline">
				<PlusSquare strokeWidth={1.0} className="w-4 h-4 mr-1" />
				Add to Cart
			</Button>
		</div>
	);
};

export default ProductCard;
