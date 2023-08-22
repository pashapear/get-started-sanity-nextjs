import Link from "next/link";
import client from "../../sanity/client";

async function getResources() {
	const artists = await client.fetch(
		`*[_type == "artist"] { _id, name, slug, "imageUrl": image.asset->url } `
	);
	// const releases = await client.fetch(
	// 	`*[_type == "release"] { _id, name, artist->{ _id }, "imageUrl": image.asset->url }`
	// );
	return {
		artists
	};
}

export default async function IndexPage() {
	const { artists } = await getResources();
	return (
		<>
			<main>
				{artists.length > 0 && (
					<ul>
						{artists.map(({ _id, slug, name: artistName, imageUrl }) => {
							const { current: artistSlug } = slug;
							const artistImageUrl = `${imageUrl}?h=200`;
							const artistLink = `/artists/${artistSlug}?id=${_id}`;
							return (
								<li key={_id}>
									<h2 style={{ textTransform: "uppercase" }}>{artistName}</h2>
									<Link href={artistLink}>
										<img src={artistImageUrl} alt={artistName} />
									</Link>
								</li>
							);
						})}
					</ul>
				)}
			</main>
		</>
	);
}
