# Betang<span style="color:#f97316;">GO</span> — Travel Planner Kalimantan Tengah

> **Satu percakapan, satu perjalanan.**  
> Platform perencana perjalanan cerdas terintegrasi untuk eksplorasi Kalimantan Tengah berbasis **React 19 Mobile-First PWA** dengan dukungan offline, *isomorphic solver*, tiket digital terverifikasi Ed25519, dan visualisasi timeline khas *Garis Sungai*.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19, TypeScript 5, Vite 6
- **Monorepo Manager:** pnpm Workspaces (`apps/web`, `packages/shared`, `packages/solver`)
- **Styling & Design System:** Tailwind CSS 4 + CSS Tokens (Palet Rimba, Pakis, Rotan, Embun/Arang Hutan — 100% *zero-gradient flat styling*)
- **Icons & Visuals:** `lucide-react`, custom SVG *Garis Sungai* (`TimelineRiver`)
- **Offline & Storage:** LocalStorage / IndexedDB persistence, offline emergency directory
- **QR & Kriptografi:** `qrcode`, verifikasi tanda tangan digital Ed25519 untuk voucher offline
- **Pengujian (Testing):** Vitest

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat
- **Node.js:** Versi 20.x atau lebih baru (disarankan v22+)
- **pnpm:** Versi 9+ atau 12+ (`corepack enable` atau `npm i -g pnpm`)

### 2. Instalasi Dependensi
Clone repository lalu jalankan instalasi paket di root:
```bash
git clone <url-repo-kamu>
cd BetangGO
pnpm install
```
*(Catatan: Jika pnpm v12 meminta persetujuan build script pertama kali, jalankan `pnpm approve-builds --all`)*

### 3. Menjalankan Server Pengembangan
```bash
pnpm dev
```
Aplikasi akan langsung berjalan di:
- **Di Laptop/PC:** `http://localhost:5173/` *(Otomatis tampil dalam mode Phone Frame)*
- **Di Layar HP (Jaringan Wi-Fi sama):** Buka browser HP dan akses IP lokal yang tertera di terminal (contoh: `http://192.168.x.x:5173/` atau `http://10.x.x.x:5173/`).

---

## 📜 Perintah yang Tersedia (Scripts)

| Perintah | Keterangan |
|---|---|
| `pnpm dev` | Menjalankan Vite development server dengan hot-reload |
| `pnpm build` | Melakukan kompilasi TypeScript dan build produksi web |
| `pnpm preview` | Menjalankan server pratinjau lokal dari hasil build `dist` |
| `pnpm test` | Menjalankan pengujian unit pada solver itinerary (`vitest`) |

---

## 📁 Struktur Direktori

```
BetangGO/
├── apps/
│   └── web/                   # Aplikasi React 19 (UI, Screens S-01 s/d S-29, i18n, Komponen)
├── packages/
│   ├── shared/                # Definisi tipe (TypeScript) & seed data Kalteng (40+ destinasi)
│   └── solver/                # Isomorphic Itinerary Solver (algoritma alokasi hari & budget)
├── pnpm-workspace.yaml        # Konfigurasi workspace pnpm
└── README.md
```

---

## 📱 Tampilan Mobile & Fitur Utama

- **Mobile-First Ergonomics:** Didesain presisi untuk viewport smartphone (360×640 hingga 430×932), target sentuh ≥ 44 px, dan safe-area insets.
- **Bilingual (ID/EN):** Sakelar bahasa instan tanpa reload.
- **Tema Terang & Gelap:** Penggantian tema instan tanpa FOUC (*flash of unstyled content*).
- **Dual-Rail Payment Simulation:** QRIS dinamis dan kartu dengan label simulasi resmi.
- **Trip Wallet Offline:** E-Voucher digital dengan QR code bertanda tangan kripto yang siap diverifikasi mitra tanpa sinyal internet.
