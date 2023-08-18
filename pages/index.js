import { createClient } from "next-sanity";

export default function IndexPage({ artists, releases }) {
	return (
		<>
			<header>
				<h1>Giba Gab Records</h1>
			</header>
			<main>
				{artists.length > 0 && (
					<ul>
						{artists.map(({ _id, name }) => (
							<li key={_id}>
								<h2 style={{ textTransform: "uppercase" }}>{name}</h2>
								{releases.length > 0 && (
									<ul>
										{releases
											.filter(({ artist }) => artist?._id === _id)
											.map((release) => (
												<li key={release._id}>{release?.name}</li>
											))}
									</ul>
								)}
							</li>
						))}
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
	const artists = await client.fetch(`*[_type == "artist"] { _id, name } `);
	const releases = await client.fetch(
		`*[_type == "release"] { _id, name, artist->{ _id } }`
	);

	return {
		props: {
			artists,
			releases
		}
	};
}
