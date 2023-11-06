import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { ShoppingCart, DollarSign } from "lucide-react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
	return (
		<nav className="sticky h-14 inset-x-0 top-0 z-30 w-full bg-white border-b">
			<MaxWidthWrapper>
				<div className="font-semibold flex h-14 items-center justify-between border-b">
					<div className="items-center space-x-4 flex">
						<Button
							variant="ghost"
							className="text-2xl font-light mr-4"
						>
							Boarders
						</Button>
						<Button variant="link">Boards</Button>
						<Button variant="link">Accessories</Button>
						<Button variant="link">Cards</Button>
					</div>
					<div className="items-center space-x-4 flex">
						<Button variant="link">Sign in</Button>
						<Button variant="link">Create account</Button>
						<Button className="px-2" variant="outline">
							<DollarSign className="w-4 h-4"></DollarSign>
							US
						</Button>
						<Button variant="outline" size="icon">
							<ShoppingCart strokeWidth={1}></ShoppingCart>
						</Button>
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	);
};

export default Navbar;
