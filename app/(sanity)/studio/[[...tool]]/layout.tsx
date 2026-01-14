import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Muhammad Vohra Studio",
  description:
    "The CMS Studio for Muhammad Vohra's portfolio website built with Sanity and Next.js.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0">{children}</body>
    </html>
  );
}
