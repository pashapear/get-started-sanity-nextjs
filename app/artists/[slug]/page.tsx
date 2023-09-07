import { AspectRatio, Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import client from "../../../sanity/client";
import { Release } from "../../../types";
import { ImageLinkCard } from "../../../components/ImageLinkCard";
import { CardGridLayout } from "../../../components/CardGridLayout";

async function getResources(artistId: string) {
	const artists = await client.fetch(
		`*[_type == "artist" && _id == "${artistId}"] { _id, name, bio, "imageUrl": image.asset->url } `
	);
	const releases = await client.fetch(
		`*[_type == "release"] { _id, name, artist->{ _id }, slug, links, "imageUrl": image.asset->url }`
	);

	return {
		artist: artists?.[0],
		releases
	};
}

const Releases = ({
	releases,
	artistId
}: {
	releases: Release[];
	artistId: string;
}) => {
	return (
		<CardGridLayout>
			{releases
				.filter(({ artist }: Release) => artist?._id === artistId)
				.map(({ _id, imageUrl, name, slug, links }: Release) => {
					const releaseImageUrl = `${imageUrl}?w=500`;
					return (
						<ImageLinkCard
							key={slug.current}
							id={_id}
							imageUrl={releaseImageUrl}
							name={name}
							url={
								links.find(({ title }) => title === "Bandcamp")?.url as string
							}
							target="#"
						/>
					);
				})}
		</CardGridLayout>
	);
};

export default async function Artist({
	searchParams
}: {
	searchParams: { id: string };
}) {
	const { id: artistId } = searchParams;
	const { releases, artist } = await getResources(artistId);
	const { _id, name: artistName, imageUrl, bio } = artist;
	const artistImageUrl = `${imageUrl}?w=900`;

	return (
		<Grid columns="1fr 3fr" key={_id}>
			<Flex direction="column" gap="5">
				<Heading as="h1" style={{ textTransform: "uppercase" }}>
					{artistName}
				</Heading>

				<Text>{bio}</Text>
			</Flex>
			<Flex direction="column" gap="5" style={{ minWidth: "50vw" }}>
				<AspectRatio ratio={2 / 1}>
					<img
						src={artistImageUrl}
						alt={artistName}
						style={{
							objectFit: "cover",
							width: "100%",
							height: "100%"
						}}
					/>
				</AspectRatio>
				{releases.length > 0 && (
					<Releases releases={releases} artistId={artistId} />
				)}
			</Flex>
		</Grid>
	);
}
