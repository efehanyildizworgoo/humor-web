# Humor Web — CapRover Deploy

Bu doküman projeyi sıfırdan bir CapRover sunucusuna deploy etmek için gerekli adımları içerir.

## 1) PostgreSQL kurulumu (One-Click)

1. CapRover panel → **Apps** → **One-Click Apps / Databases**
2. **PostgreSQL** seç, sürüm `16-alpine`.
3. App ismi: `humor-postgres` (örnek).
4. POSTGRES_USER: `humor`, POSTGRES_PASSWORD: rastgele güçlü şifre, POSTGRES_DB: `humor`.
5. **Persistent Data: Enabled** (varsayılan zaten açık).

CapRover'ın iç ağı sayesinde uygulama bu DB'ye `srv-captain--humor-postgres:5432` üzerinden erişebilir.

DATABASE_URL örneği:

```
postgres://humor:<password>@srv-captain--humor-postgres:5432/humor
```

## 2) Uygulama (humor-web) app'ini oluştur

1. CapRover → **Apps** → **Create New App** → ismi: `humor-web`.
2. **HTTP Settings** sekmesinde:
   - Container HTTP port: **80** (Dockerfile zaten `EXPOSE 80`).
   - Domain bağla, HTTPS / Force HTTPS aç.
3. **App Configs** → **Environment Variables** ekle:

   | Key | Değer |
   |---|---|
   | `DATABASE_URL` | `postgres://humor:<pw>@srv-captain--humor-postgres:5432/humor` |
   | `JWT_SECRET` | rastgele uzun (en az 32 karakter) string |
   | `ADMIN_EMAIL` | `admin@…` (sadece ilk seed için) |
   | `ADMIN_PASSWORD` | güçlü şifre (sadece ilk seed için) |
   | `NODE_ENV` | `production` (Dockerfile zaten set ediyor) |

   Not: `UPLOAD_DIR` Dockerfile içinde `/app/public/uploads` olarak set. Persistent volume bu yolu mount edecek.

## 3) Persistent Storage (görseller için)

CapRover → `humor-web` app → **App Configs** → **Persistent Directories**:

| Path in App | Label |
|---|---|
| `/app/public/uploads` | `humor-uploads` |

Bu sayede deploy'larda yüklenen görseller kaybolmaz.

## 4) İlk deploy

### A) Lokalden CLI ile
```bash
caprover deploy
```
veya tarball ile:
```bash
tar -czf humor.tar.gz Dockerfile captain-definition src public scripts drizzle next.config.ts package.json package-lock.json tsconfig.json postcss.config.mjs eslint.config.mjs
# CapRover panel → app → Deployment → Tarball Upload
```

### B) Git push (önerilen)
1. App → **Deployment** → **Method 3: GitHub/Bitbucket**.
2. Repo URL'i + branch (`main`) + deploy key set et.
3. Push'tan sonra CapRover otomatik build edip yeniden başlatır.

## 5) İlk migration & seed

Migration'lar her container start'ında otomatik çalışıyor (`scripts/entrypoint.sh` → `scripts/migrate-prod.cjs`). İlk deploy'dan sonra `__drizzle_migrations` tablosu oluşur ve mevcut SQL'ler uygulanır.

Seed (sadece bir kere — admin kullanıcısı + default içerikler):

CapRover → app → **App Configs** → **Run Commands**:
```bash
npm run db:seed
```

(Veya CapRover bash'inden manuel — ama bu image'da `tsx` yok; pratik yöntem: local makineden production DATABASE_URL'i ile `npm run db:seed` çalıştırmak. SSH tüneli açık tut.)

**Alternatif:** Lokal makinen production DB'ye doğrudan erişebiliyorsa:
```bash
DATABASE_URL="postgres://humor:<pw>@<server-ip>:5432/humor" \
ADMIN_EMAIL="admin@humorkreatif.com" \
ADMIN_PASSWORD="degistir-bunu" \
npm run db:seed
```

## 6) Admin paneline ilk giriş

`https://<domain>/admin/login` → seed sırasında set ettiğin `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## 7) Güncelleme akışı

```
local: kod değişikliği yap → DB schema değiştiyse npm run db:generate
local: git commit & push
CapRover: otomatik build → entrypoint migration'ları uygular → yeni server.js başlar
```

Mevcut yüklenen görseller persistent volume'da kalır. Postgres verileri ayrı app'in persistent volume'unda.

## 8) Olası sorunlar

- **Migration fail**: container loglarına bak (`docker logs srv-captain--humor-web`). Drizzle migration SQL bozuksa rollback olur, container exit eder.
- **Upload 500**: `UPLOAD_DIR` mount'unu doğrula (`ls -la /app/public/uploads` içerden). Permission `nextjs:nodejs` (UID 1001) olmalı.
- **`pg` not found at migration**: `next.config.ts`'deki `outputFileTracingIncludes` doğru mu? Build loglarında `pg/lib/index.js` kopyalandı mı kontrol et.

## 9) Lokal geliştirme

```bash
# Postgres (Docker veya Homebrew):
docker compose up -d           # ya da: brew services start postgresql@16

# İlk kurulum:
cp .env.example .env.local
npm install
npm run db:migrate
npm run db:seed

# Dev:
npm run dev
```

Drizzle Studio (DB GUI):
```bash
npm run db:studio
```
