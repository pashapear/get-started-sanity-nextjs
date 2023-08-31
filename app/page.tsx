import { Flex, Heading, Text } from "@radix-ui/themes";

export default async function IndexPage() {
	return (
		<Flex
			direction="column"
			grow="1"
			align="center"
			justify="center"
			style={{ maxWidth: "40rem", margin: "25% 0" }}
		>
			<Text style={{ fontSize: "2rem" }}>Welcome to Gibba Gab Records!</Text>
			<Text style={{ fontSize: "1rem" }}>The gabbiest place on earth™</Text>
		</Flex>
	);
}
