import { Grid } from "@radix-ui/themes";

export const CardGridLayout = ({ children }) => {
	return (
		<Grid
			columns={{ initial: "2", md: "3", xl: "3" }}
			gap={{
				initial: "3",
				md: "5",
				xl: "9"
			}}
		>
			{children}
		</Grid>
	);
};
