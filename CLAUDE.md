@AGENTS.md

# humorkreatif.com

- Deploy: CapRover app `humor-web` (persist=true), DB `humor-db`. Makine: worgoo. Canlı CapRover tanımında 2026-10-10 tarihinde **main webhook kaydı mevcut** görüldü. Ana dala push otomatik yayın tetikleyebilir; önce test et, push sonrası yayın durumunu ölç. Bakım dalı `maintenance/server1-security-20261010` test edilmiş imajla CapRover üzerinden yayınlanır.
- Sert kısıt: deploy mevcut canlı verileri ve çalışan siteyi ETKİLEMEZ — sıfır kesinti, içerik/DB güvenli.
- Sayfa başlığı ayracı: "- Humor" ("| Humor" değil).
