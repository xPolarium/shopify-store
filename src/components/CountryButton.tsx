import { Button } from "./ui/button";

import { useShop } from "@shopify/hydrogen-react";

interface CountryButtonProps {}

const CountryButton: React.FC<CountryButtonProps> = ({}) => {
	const shop = useShop();

	return (
		<Button className="px-2" variant="outline">
			<img
				src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${shop.countryIsoCode}.svg`}
				alt={shop.countryIsoCode}
				style={{
					width: 20,
					height: 20,
				}}
			/>
		</Button>
	);
};

export default CountryButton;
