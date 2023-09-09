"use client";

import Link from "next/link";
import { AspectRatio, Box, Flex, Heading } from "@radix-ui/themes";

export const ImageLinkCard = ({
	url,
	id,
	imageUrl,
	name,
	target
}: {
	url: string;
	id: any;
	imageUrl: string;
	name: any;
	target?: string;
}) => {
	return (
		<Link href={url} key={id} target={target ?? "_self"}>
			<Flex
				direction="column"
				gap="3"
				className="content"
				position="relative"
				p={{
					initial: "2",
					xs: "3",
					md: "5",
					xl: "7"
				}}
				style={{ minHeight: "100%" }}
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
				<Flex
					direction="column"
					justify="center"
					style={{
						textAlign: "center",
						textOverflow: "ellipsis"
					}}
				>
					<Heading
						as="h2"
						style={{ textTransform: "uppercase", fontWeight: "normal" }}
						size={{
							initial: "3",
							md: "5",
							xl: "7"
						}}
					>
						{name}
					</Heading>
				</Flex>
			</Flex>
		</Link>
	);
};
