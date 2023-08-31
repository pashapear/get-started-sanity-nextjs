import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import client from "../../sanity/client";

async function getResources() {
	const releases = await client.fetch(
		`*[_type == "release"] { _id, name, artist->{ _id }, "imageUrl": image.asset->url }`
	);
	return {
		releases
	};
}

export default async function Releases() {
	const { releases } = await getResources();
	return (
		<Grid columns="3" gap="9">
			{releases.map(({ _id, imageUrl, name }) => {
				const releaseImageUrl = `${imageUrl}?w=300`;
				return (
					<Box key={_id}>
						<Heading>{name}</Heading>
						<Flex direction="column" gap="9">
							<Box>
								<img src={releaseImageUrl} alt={name} />
							</Box>
						</Flex>
					</Box>
				);
			})}
		</Grid>
	);
}
