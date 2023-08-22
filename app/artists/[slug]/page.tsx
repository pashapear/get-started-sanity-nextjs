import client from "../../../sanity/client";

async function getResources(artistId) {
	const artists = await client.fetch(
		`*[_type == "artist" && _id == "${artistId}"] { _id, name, "imageUrl": image.asset->url } `
	);
	const releases = await client.fetch(
		`*[_type == "release"] { _id, name, artist->{ _id }, "imageUrl": image.asset->url }`
	);

	return {
		artist: artists?.[0],
		releases
	};
}

const Releases = ({ releases, artistId }) => {
	return (
		<ul>
			{releases
				.filter(({ artist }) => artist?._id === artistId)
				.map(({ _id, imageUrl, name }) => {
					const releaseImageUrl = `${imageUrl}?w=300`;
					return (
						<li key={_id}>
							<span>{name}</span>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "8px"
								}}
							>
								<div>
									<img src={releaseImageUrl} alt={name} />
								</div>
							</div>
						</li>
					);
				})}
		</ul>
	);
};

export default async function Artist({ searchParams }) {
	const { id: artistId } = searchParams;
	const { releases, artist } = await getResources(artistId);
	const { _id, name: artistName, imageUrl } = artist;
	const artistImageUrl = `${imageUrl}?h=200`;

	return (
		<li key={_id}>
			<h2 style={{ textTransform: "uppercase" }}>{artistName}</h2>
			<img src={artistImageUrl} alt={artistName} />
			{releases.length > 0 && (
				<Releases releases={releases} artistId={artistId} />
			)}
		</li>
	);
}
