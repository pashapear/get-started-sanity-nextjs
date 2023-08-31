import Link from "next/link";
import client from "../../sanity/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";

async function getResources() {
	const artists = await client.fetch(
		`*[_type == "artist"] { _id, name, slug, "imageUrl": image.asset->url } `
	);
	return { artists };
}

export default async function IndexPage() {
	const { artists } = await getResources();
	return (
		<Grid columns="2" gap="9">
			{artists.length > 0 &&
				artists.map(({ _id, slug, name: artistName, imageUrl }) => {
					const { current: artistSlug } = slug;
					const artistImageUrl = `${imageUrl}?h=200`;
					const artistLink = `/artists/${artistSlug}?id=${_id}`;
					return (
						<Box>
							<Heading as="h2" style={{ textTransform: "uppercase" }}>
								{artistName}
							</Heading>
							<Link href={artistLink}>
								<img src={artistImageUrl} alt={artistName} />
							</Link>
						</Box>
					);
				})}
		</Grid>
	);
}
