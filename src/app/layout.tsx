import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />

      <body style={{ margin: "0", padding: "0", boxSizing: "border-box" }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
