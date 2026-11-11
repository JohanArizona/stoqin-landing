/** Dirender ulang di setiap navigasi: halaman baru masuk dengan fade lembut. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
