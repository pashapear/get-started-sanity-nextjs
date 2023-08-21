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
		<ul>
			{releases.map(({ _id, imageUrl, name }) => {
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
}
