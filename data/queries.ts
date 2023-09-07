import client from "./client";

export async function getOrganizations() {
	const organizations = await client.fetch(
		`*[_type == "organization"] { _id, name, title, subtitle, "imageUrl": image.asset->url } `
	);
	return { organizations };
}

export async function getArtists() {
	const artists = await client.fetch(
		`*[_type == "artist"] { _id, name, slug, "imageUrl": image.asset->url } `
	);
	return { artists };
}

export async function getArtist(artistId: string) {
	const artists = await client.fetch(
		`*[_type == "artist" && _id == "${artistId}"] { _id, name, bio, "imageUrl": image.asset->url } `
	);

	return { artist: artists?.[0] };
}

export async function getReleases() {
	const releases = await client.fetch(
		`*[_type == "release"] { _id, name, artist->{ _id }, slug, links, "imageUrl": image.asset->url }`
	);

	return { releases };
}
