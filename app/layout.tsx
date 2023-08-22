// https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet
import Link from "next/link";
import "../styles.css";
import styles from "./app.module.css";

export const metadata = {
	title: "Giba Gab",
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
				<header>
					<nav className={styles.globalNav}>
						<Link href="/">
							<h1>Giba Gab Records</h1>
						</Link>
						<Link href="/artists">Artists</Link>
						<Link href="/releases">Releases</Link>
					</nav>
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
