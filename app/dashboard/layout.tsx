import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import SideNav from "@/components/SideNav";
import { validateRequest } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session } = await validateRequest();

	return (
		<html lang="en">
			<body className={inter.className}>
				{session ? (
					<>
						<SideNav />
						<main className="sm:ml-[18rem]">{children}</main>
					</>
				) : (
					<>
						<main className="h-screen">{children}</main>
					</>
				)}
			</body>
		</html>
	);
}
