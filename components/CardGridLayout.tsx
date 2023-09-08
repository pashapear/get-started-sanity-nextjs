import { Grid } from "@radix-ui/themes";
import { ReactNode } from "react";

export const CardGridLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Grid
			columns={{ initial: "2", md: "3", xl: "3" }}
			gap={{
				initial: "3",
				md: "5",
				xl: "9"
			}}
			style={{ gridAutoRows: "1fr" }}
		>
			{children}
		</Grid>
	);
};
