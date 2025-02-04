import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import client from "../../data/client";
import { ImageLinkCard } from "../../components/ImageLinkCard";
import { CardGridLayout } from "../../components/CardGridLayout";
import { Release } from "../../types";

async function getResources() {
	const releases = await client.fetch(
		`*[_type == "release"] | order(releaseDate desc) { _id, name, artist->{ _id, name }, "imageUrl": image.asset->url, slug, links }`
	);
	return {
		releases
	};
}

export default async function Releases() {
	const { releases } = await getResources();
	return (
		<CardGridLayout>
			{releases.map(({ artist, _id, imageUrl, name, slug, links }: Release) => {
				const { name: artistName } = artist;
				const releaseImageUrl = `${imageUrl}?w=500`;
				return (
					<ImageLinkCard
						key={slug.current}
						id={_id}
						imageUrl={releaseImageUrl}
						name={`${name} - ${artistName}`}
						url={links.find(({ title }) => title === "Bandcamp")?.url as string}
						target="#"
					/>
				);
			})}
		</CardGridLayout>
	);
}
