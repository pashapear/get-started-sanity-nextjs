import { AspectRatio, Flex, Heading, Text } from "@radix-ui/themes";
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
			style={{ margin: "25% 0", padding: "3rem" }}
			className="content"
		>
			<AspectRatio ratio={2 / 1}>
				<img
					src={`${imageUrl}?w=500`}
					alt="Welcome Image"
					style={{
						objectFit: "cover",
						width: "100%",
						height: "100%"
					}}
				/>
			</AspectRatio>
			<Heading as="h1">{title}</Heading>
			<Text as="p" style={{ fontSize: "1rem" }}>
				{subtitle}
			</Text>
		</Flex>
	);
}
