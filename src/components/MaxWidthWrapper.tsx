import { cn } from "@/utils/utils";
import type { ReactNode } from "react";

interface MaxWidthWrapperProps {
	className?: string;
	children: ReactNode;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
	className,
	children,
}) => {
	return (
		<div
			className={cn("mx-auto max-w-screen-xl px-2.5 md:px-20", className)}
		>
			{children}
		</div>
	);
};

export default MaxWidthWrapper;
