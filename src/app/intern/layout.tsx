import "../globals.css";
export const metadata = { title: "Lead-Dashboard (intern)", robots: { index: false, follow: false } };
export default function L({ children }: { children: React.ReactNode }) {
  return <html lang="de"><body className="bg-ivory">{children}</body></html>;
}
