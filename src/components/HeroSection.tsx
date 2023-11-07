import { Image } from "astro:assets";

import MaxWidthWrapper from "./MaxWidthWrapper";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = ({}) => {
	return (
		<section>
			<MaxWidthWrapper className="min-h-screen flex justify-center items-center gap-16">
				<div className="space-y-4">
					<h1 className="text-8xl font-extrabold">
						Get Ready For Season
					</h1>
					<p className="text-3xl">
						A new set of exclusive boards out now!
					</p>
				</div>
				<div className="grid grid-flow-col grid-cols-3 gap-4 items-center">
					<img
						src="boards.jpg"
						alt="Couple of boards."
						width="250"
						height="250"
						className="col-span-2 col-start-1"
					/>
					<img
						src="boards.jpg"
						alt="Couple of boards."
						width="250"
						height="250"
						className="col-start-3"
					/>
					<img
						src="boards.jpg"
						alt="Couple of boards."
						width="250"
						height="250"
						className="col-start-1"
					/>
					<img
						src="boards.jpg"
						alt="Couple of boards."
						width="250"
						height="250"
						className="col-start-2 col-span-2"
					/>
				</div>
			</MaxWidthWrapper>
		</section>
	);
};

export default HeroSection;
