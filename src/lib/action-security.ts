import { headers } from 'next/headers';
import { isIP } from 'node:net';
const attempts=new Map<string,{count:number;until:number}>();
export async function allowAttempt(scope:string,max:number) {
 const h=await headers();const raw=h.get('x-real-ip') || h.get('x-forwarded-for')?.split(',').at(-1)?.trim() || '';
 const key=scope+':'+(isIP(raw)?raw:'unknown'),now=Date.now();
 for(const [k,v] of attempts)if(v.until<=now)attempts.delete(k);
 let value=attempts.get(key);
 if(!value){if(attempts.size>=10000)return false;value={count:0,until:now+15*60000};attempts.set(key,value);}
 return ++value.count<=max;
}
export function assertFormSize(form:FormData,max=2*1024*1024) {
 let bytes=0,fields=0;for(const [key,value] of form){bytes+=Buffer.byteLength(key)+ (typeof value==='string'?Buffer.byteLength(value):value.size);if(++fields>250 || bytes>max)throw new Error('Form boyutu sınırı aşıldı.');}
}
