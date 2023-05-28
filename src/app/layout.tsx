import "antd/dist/reset.css";
import "./globals.scss";
import { Main } from "@/components/Main/Main";

export const metadata = {
  title: "Anime API",
  description: "Project to search animes that you like",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Main>
        {children}
        </Main>
      </body>
    </html>
  );
}
