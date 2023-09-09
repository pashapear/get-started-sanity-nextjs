export type ExternalLink = {
	title: string;
	url: string;
};

export type Slug = {
	current: string;
};

export type Release = {
	_id: string;
	imageUrl: string;
	name: string;
	slug: Slug;
	links: ExternalLink[];
	artist: Artist;
};

export type Artist = {
	_id: string;
	imageUrl: string;
	name: string;
	slug: Slug;
	bio: string;
	links: ExternalLink[];
};
