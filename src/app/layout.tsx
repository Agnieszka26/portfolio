import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/assets/styles/index.module.scss";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html style={{ scrollBehavior: "smooth" }} lang="en">
      <head />

      <body className={styles.body}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
