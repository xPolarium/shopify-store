import { z } from "zod";
import { ProductResult, type ImageResult } from "@/utils/schemas";

import ProductCard from "./ProductCard";
import MaxWidthWrapper from "./MaxWidthWrapper";

const ProductsResult = z.array(ProductResult);

interface ProductListProps {
	products: z.infer<typeof ProductsResult>;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
	return (
		<section>
			<MaxWidthWrapper className="min-h-screen">
				<div className="grid grid-cols-4 gap-6">
					{products.map((product) => (
						<ProductCard key={product?.id} product={product} />
					))}
				</div>
			</MaxWidthWrapper>
		</section>
	);
};

export default ProductList;
