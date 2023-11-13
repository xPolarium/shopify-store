import { useEffect } from "react";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

import { initCart } from "@/stores/cart";

interface CartButtonProps {}

const CartButton: React.FC<CartButtonProps> = () => {
	useEffect(() => {
		initCart();
	}, []);

	return (
		<Button className="ml-4" variant="outline" size="icon">
			<ShoppingCart strokeWidth={1}></ShoppingCart>
		</Button>
	);
};

export default CartButton;
