import { readFile } from "node:fs/promises";
import path from "node:path";
import { getUploadDir } from "@/lib/uploads";
export const dynamic="force-dynamic";
export async function GET(_req:Request,{params}:{params:Promise<{filename:string}>}) {
 const {filename}=await params;
 if(filename!==path.basename(filename)||filename.includes("\\")||!/^[-a-zA-Z0-9_.]+$/.test(filename))return new Response(null,{status:404});
 const mimes:Record<string,string>={".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".gif":"image/gif",".svg":"image/svg+xml",".avif":"image/avif"};
 const mime=mimes[path.extname(filename).toLowerCase()];if(!mime)return new Response(null,{status:404});
 try{return new Response(new Uint8Array(await readFile(path.join(getUploadDir(),filename))),{headers:{"Content-Type":mime,"X-Content-Type-Options":"nosniff","Content-Security-Policy":"sandbox; default-src 'none'; style-src 'unsafe-inline'","Cache-Control":"public, max-age=86400"}});}catch{return new Response(null,{status:404});}
}
