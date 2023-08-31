import Link from "next/link";
import { AspectRatio, Box, Heading } from "@radix-ui/themes";

export const ImageLinkCard = ({
	url,
	id,
	imageUrl,
	name
}: {
	url: string;
	id: any;
	imageUrl: string;
	name: any;
}) => {
	return (
		<Link href={url}>
			<Box
				key={id}
				position="relative"
				p="3"
				style={{ border: "2px solid black" }}
			>
				<AspectRatio ratio={1 / 1}>
					<img
						src={imageUrl}
						alt={name}
						style={{
							objectFit: "cover",
							width: "100%",
							height: "100%"
						}}
					/>
				</AspectRatio>
				<Box style={{ textAlign: "center" }}>
					<Heading
						as="h2"
						style={{ textTransform: "uppercase", fontWeight: "normal" }}
					>
						{name}
					</Heading>
				</Box>
			</Box>
		</Link>
	);
};
