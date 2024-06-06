import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoggedOutNav from "@/components/Navbar/LoggedOutNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex flex-col h-screen justify-between">
					<LoggedOutNav />
					<main className="mb-auto">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
