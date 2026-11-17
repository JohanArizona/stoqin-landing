import fs from "node:fs";
import path from "node:path";
import { ALL_MEMBERS } from "./team";

/** Dibaca di server saat build: foto yang tersedia di `public/tim/<id>.(webp|jpg|jpeg|png)`. */
export function teamPhotos(): Record<string, string> {
  const dir = path.join(process.cwd(), "public", "tim");
  const out: Record<string, string> = {};
  for (const m of ALL_MEMBERS) {
    for (const ext of ["webp", "jpg", "jpeg", "png"]) {
      if (fs.existsSync(path.join(dir, `${m.id}.${ext}`))) {
        out[m.id] = `/tim/${m.id}.${ext}`;
        break;
      }
    }
  }
  return out;
}
