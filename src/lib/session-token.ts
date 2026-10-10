import { SignJWT, jwtVerify } from "jose";
import { createHash } from "node:crypto";
export const SESSION_TTL_SECONDS = 604800;
export const credentialVersion = (hash: string) => createHash('sha256').update(hash).digest('hex');
function secret() { const s=process.env.JWT_SECRET; if(!s || s.length<32) throw new Error('JWT_SECRET must contain at least 32 characters'); return new TextEncoder().encode(s); }
export async function signToken(uid:number,email:string,passwordHash:string) {
 return new SignJWT({uid,email,cv:credentialVersion(passwordHash)}).setProtectedHeader({alg:'HS256'}).setIssuer('humor-admin-v2').setIssuedAt().setExpirationTime(`${SESSION_TTL_SECONDS}s`).sign(secret());
}
export async function verifyToken(token:string|undefined) {
 if(!token || token.length>4096) return null;
 try { const {payload:p}=await jwtVerify(token,secret(),{algorithms:['HS256'],issuer:'humor-admin-v2',requiredClaims:['exp','iat','uid','email','cv']});
 if(!Number.isSafeInteger(p.uid) || (p.uid as number)<1 || typeof p.email!=='string' || p.email.length>255 || typeof p.cv!=='string' || !/^[a-f0-9]{64}$/.test(p.cv) || typeof p.iat!=='number' || typeof p.exp!=='number' || p.iat>Date.now()/1000+30 || p.exp-p.iat>SESSION_TTL_SECONDS) return null;
 return {uid:p.uid as number,email:p.email,cv:p.cv}; } catch {return null;}
}
