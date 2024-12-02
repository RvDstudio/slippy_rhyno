import { GeistSans } from "geist/font";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        />
      </head>
      <body className="bg-[#F9FAFB]">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
