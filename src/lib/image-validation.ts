import sharp from 'sharp';
export async function validateImage(bytes:Buffer,mime:string):Promise<{bytes:Buffer;mime:string}> {
 const formats:Record<string,string>={'image/png':'png','image/jpeg':'jpeg','image/webp':'webp','image/gif':'gif','image/svg+xml':'svg','image/avif':'heif'};
 const image=sharp(bytes,{limitInputPixels:40_000_000,failOn:'warning'});const meta=await image.metadata();
 if(!formats[mime] || meta.format!==formats[mime] || !meta.width || !meta.height)throw new Error('Invalid image');
 if(mime==='image/svg+xml')return {bytes:await image.png().toBuffer(),mime:'image/png'};
 // Decode a bounded thumbnail to reject corrupt image payloads; preserve original format/animation.
 await image.resize({width:1,height:1,fit:'inside'}).png().toBuffer();
 return {bytes,mime};
}
