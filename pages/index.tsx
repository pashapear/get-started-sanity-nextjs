import { createClient } from "next-sanity";

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

export default function IndexPage({ artists, releases }) {
	return (
		<>
			<header>
				<h1>Giba Gab Records</h1>
			</header>
			<main>
				{artists.length > 0 && (
					<ul>
						{artists.map(({ _id, name: artistName, imageUrl }) => {
							const artistImageUrl = `${imageUrl}?h=200`;
							return (
								<li key={_id}>
									<h2 style={{ textTransform: "uppercase" }}>{artistName}</h2>
									<img src={artistImageUrl} alt={artistName} />
									{releases.length > 0 && (
										<Releases releases={releases} artistId={_id} />
									)}
								</li>
							);
						})}
					</ul>
				)}
			</main>
		</>
	);
}

const client = createClient({
	projectId: "923bgilp",
	dataset: "production",
	apiVersion: "2023-08-18",
	useCdn: false
});

export async function getStaticProps() {
	const artists = await client.fetch(
		`*[_type == "artist"] { _id, name, "imageUrl": image.asset->url } `
	);
	const releases = await client.fetch(
		`*[_type == "release"] { _id, name, artist->{ _id }, "imageUrl": image.asset->url }`
	);

	return {
		props: {
			artists,
			releases
		}
	};
}
