import "antd/dist/reset.css";
import '../../public/antd.min.css';
import "./globals.scss";
import { MainLayout } from "@/components/MainLayout/MainLayout";

export const metadata = {
  title: "AnimeTrix",
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
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
