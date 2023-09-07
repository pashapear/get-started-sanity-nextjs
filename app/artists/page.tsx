import { ImageLinkCard } from "../../components/ImageLinkCard";
import { CardGridLayout } from "../../components/CardGridLayout";
import { Artist } from "../../types";
import { getArtists } from "../../sanity/queries";

export default async function IndexPage() {
	const { artists } = await getArtists();
	return (
		<CardGridLayout>
			{artists.length > 0 &&
				artists.map(({ _id, slug, name: artistName, imageUrl }: Artist) => {
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
