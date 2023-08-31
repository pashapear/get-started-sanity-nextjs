// https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet
import Link from "next/link";
import "../styles.css";
import { Box, Flex, Heading, Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export const metadata = {
	title: "Gibba Gab",
	description: "Record label"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Theme>
					<header>
						<Flex gap="5" align="end">
							<Link href="/">
								<Heading as="h1" size="4">
									Gibba Gab Records
								</Heading>
							</Link>
							<Link href="/artists">Artists</Link>
							<Link href="/releases">Releases</Link>
						</Flex>
					</header>

					<main>{children}</main>
					{/* <ThemePanel /> */}
				</Theme>
			</body>
		</html>
	);
}
