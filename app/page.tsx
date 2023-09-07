import { AspectRatio, Flex, Text } from "@radix-ui/themes";
import { getOrganizations } from "../data/queries";

export default async function IndexPage() {
	const { organizations } = await getOrganizations();
	const { title, subtitle, imageUrl } = organizations?.[0];
	return (
		<Flex
			direction="column"
			grow="1"
			align="center"
			justify="center"
			style={{ margin: "25% 0" }}
		>
			<AspectRatio ratio={3 / 1}>
				<img
					src={`${imageUrl}?w=1000`}
					alt="Welcome Image"
					style={{
						objectFit: "cover",
						width: "100%",
						height: "100%"
					}}
				/>
			</AspectRatio>
			<Text style={{ fontSize: "2rem" }}>{title}</Text>
			<Text style={{ fontSize: "1rem" }}>{subtitle}</Text>
		</Flex>
	);
}
