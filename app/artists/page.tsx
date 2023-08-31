import client from "../../sanity/client";
import { ImageLinkCard } from "../../components/ImageLinkCard";
import { CardGridLayout } from "../../components/CardGridLayout";

async function getResources() {
	const artists = await client.fetch(
		`*[_type == "artist"] { _id, name, slug, "imageUrl": image.asset->url } `
	);
	return { artists };
}

export default async function IndexPage() {
	const { artists } = await getResources();
	return (
		<CardGridLayout>
			{artists.length > 0 &&
				artists.map(({ _id, slug, name: artistName, imageUrl }) => {
					const { current: artistSlug } = slug;
					const artistImageUrl = `${imageUrl}?w=500`;
					const artistLink = `/artists/${artistSlug}?id=${_id}`;
					return (
						<ImageLinkCard
							url={artistLink}
							id={_id}
							imageUrl={artistImageUrl}
							name={artistName}
						/>
					);
				})}
		</CardGridLayout>
	);
}
