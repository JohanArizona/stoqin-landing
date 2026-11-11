import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Stoqin — Aplikasi kasir warung gratis, stok, buku hutang & kulakan grosir";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (p: string) => readFile(join(process.cwd(), "src/assets", p));
const dataUrl = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

export default async function Image() {
  const [bold, extra, phone] = await Promise.all([
    asset("fonts/PlusJakartaSans-bold.ttf"),
    asset("fonts/PlusJakartaSans-extrabold.ttf"),
    asset("app-home.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #ffffff 0%, #effaf0 60%, #d9f3dc 100%)",
          fontFamily: "Jakarta",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 720,
            height: 720,
            borderRadius: 720,
            background: "radial-gradient(circle, rgba(43,184,59,0.35) 0%, rgba(43,184,59,0) 70%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 0 72px 80px", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="54" height="62" viewBox="0 0 15.5 18">
              <path fill="#00AA13" d="M6.937,9.962L7.016,18C7.399,17.996 7.846,17.912 8.288,17.665C8.309,17.665 11.434,15.958 12.994,15.104C13.273,14.921 13.847,14.299 13.909,13.275C13.93,13.296 13.962,9.155 13.909,8.467C13.857,7.78 13.297,6.954 11.975,7.474C11.132,7.806 9.141,9.197 6.937,9.962Z" />
              <path fill="#00770D" d="M7.016,18C6.621,18.004 6.295,17.923 6.118,17.848L1.333,15.392C0.267,14.639 0,13.684 0,13.301V8.023C0.016,7.549 0.145,7.144 0.319,6.814L5.534,9.295C4.514,9.462 3.65,9.45 3.059,9.356C2.16,9.711 2.737,10.166 3.137,10.349C4.359,10.629 5.682,10.397 6.937,9.962L7.016,18Z" />
              <path fill="#2BB83B" d="M0.319,6.814L5.534,9.295C7.807,8.922 11.106,7.214 13.66,3.997C14.724,5.266 15.042,5 15.096,4.734L15.415,0.322C15.406,0.151 15.267,-0.027 15.042,0.003L11.056,0.588C10.777,0.677 9.833,0.588 11.587,2.023C10.428,3.426 7.326,6.278 4.941,6.298C4.793,6.29 4.481,6.204 4.418,5.933C4.392,5.811 4.424,5.535 4.758,5.41C5.604,5.184 7.539,4.163 8.34,3.503C9.142,2.842 6.74,2.855 5.569,3.503L1.203,5.828C0.969,5.966 0.59,6.3 0.319,6.814Z" />
            </svg>
            <span style={{ fontSize: 44, fontWeight: 800, color: "#14281D", letterSpacing: -1.5 }}>Stoqin</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 44,
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -2.6,
              color: "#0c1810",
            }}
          >
            <span>Kelola Warung</span>
            <span>Jadi Mudah,</span>
            <span style={{ color: "#00770D" }}>Belanja Stok</span>
            <span style={{ color: "#00770D" }}>Lebih Murah.</span>
          </div>
          <div style={{ display: "flex", marginTop: "auto", gap: 12 }}>
            {["Gratis", "Bisa offline", "Android"].map((t) => (
              <span
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 999,
                  background: "#0c1810",
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUrl(phone)} width={430} height={727} style={{ position: "absolute", right: 36, top: 36 }} alt="" />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: bold, weight: 700, style: "normal" },
        { name: "Jakarta", data: extra, weight: 800, style: "normal" },
      ],
    },
  );
}
