import { z } from "zod";
import { ProductResult, type ImageResult } from "@/utils/schemas";

import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const ProductsResult = z.array(ProductResult);

interface ProductCardsProps {
	products: z.infer<typeof ProductsResult>;
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
	return (
		<section>
			<MaxWidthWrapper className="min-h-screen">
				<div className="grid grid-cols-4 gap-6">
					{products.map((product) => (
						<Product key={product?.id} product={product} />
					))}
				</div>
			</MaxWidthWrapper>
		</section>
	);
};

export default ProductCards;
