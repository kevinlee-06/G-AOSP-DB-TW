# G-AOSP-DB-TW

以 Google Pixel 9a 搭配 GrapheneOS 作為主要測試平台，記錄台灣金融、支付等 Android App 的相容性與最低環境需求。

GrapheneOS 基於 AOSP，因此本資料庫對其他 AOSP 系統具有參考價值；但不同裝置、ROM、Android 版本與系統設定可能造成不同結果，資料不代表對所有 AOSP 環境的相容性保證。

本專案目前只維護一件事：

> 這個 App 在主要測試平台上要正常使用，最低需要哪些環境條件？

## 資料格式

每個 App 使用一個檔案：

```text
apps/<Android package name>.json
```

目前只記錄以下需求：

| 欄位 | 意義 |
| --- | --- |
| `compatible` | 目前摘要的相容性，對應最新一筆 `history` |
| `gms` | 核心功能是否需要 GMS |
| `gmsForNotifications` | 通知是否需要 GMS |
| `tee` | 是否需要 TEE |
| `playIntegrity` | 是否需要最低層級的 Play Integrity |
| `exploitProtectionCompatibilityMode` | 是否需要 Exploit Protection Compatibility Mode |

每筆 `history` 都要記錄測試使用的 profile：

```text
Main
Work
Private
Other
null
```

`null` 代表與 profile 無關、不適用，或沒有指定 profile。

每筆 `history` 也要記錄當次測試是否相容：

```json
"compatible": true
```

`compatible` 是單次測試結果，不是 App 的固定屬性。

根層也要保留 `compatible`，作為目前摘要；它應與最新一筆 `history` 的值一致。

需求欄位使用三種值：

- `true`: 已確認需要
- `false`: 已確認不需要
- `null`: 尚未確認

`gmsForNotifications` 必須獨立於 `gms`。如果只有通知需要 GMS，`gms` 應為 `false`，`gmsForNotifications` 應為 `true`。

## 範例

```json
{
  "$schema": "../schema/app.schema.json",
  "schemaVersion": 1,
  "packageName": "com.example.wallet",
  "name": "Example Wallet",
  "categories": [
    "payment"
  ],
  "compatible": true,
  "history": [
    {
      "date": "2026-10-12",
      "profile": "Main",
      "compatible": true,
      "appVersion": "1.0.0",
      "versionCode": 100,
      "grapheneOSVersion": "2026100601",
      "androidVersion": 17,
      "requirements": {
        "gms": false,
        "gmsForNotifications": true,
        "tee": true,
        "playIntegrity": null,
        "exploitProtectionCompatibilityMode": false
      }
    }
  ],
  "lastVerified": "2026-10-12",
  "notes": "核心功能不需要 GMS，但通知使用 GMS。"
}
```

`history` 用來保留不同日期、App 版本或 profile 的需求變化。最新一筆歷史紀錄視為目前需求，不另外維護摘要欄位。

## Pages

網站使用 Vue.js、Vite 與 pnpm。

```bash
pnpm install
pnpm run dev
```

Cloudflare Pages 設定：

- Build command: `pnpm run build`
- Build output directory: `dist`
- `VITE_SITE_URL`：網站正式網址（預設為 `https://graphene-db.pages.dev`），build time 產生 sitemap 與 robots.txt 時使用。

網站使用 Vite SSG，在 build 時為首頁、About 與每個 App 詳情頁產生靜態 HTML，
讓搜尋引擎不必先執行 JavaScript 就能讀取頁面內容。App 詳情頁使用可索引的
`/apps/<package name>` URL；部署平台需要將未知路徑 fallback 到對應的靜態 HTML，
Cloudflare Pages 會依照輸出的目錄結構處理這些路徑。`sitemap.xml` 與
`robots.txt` 不需要提交到 Git，會在 build 完成後直接產生到 `dist/`。

Build 時會依照每個 App 的 `packageName` 從 Google Play 自動取得 icon，存放於 build output；若找不到 App 或圖片，網站會使用預設圖示。

## 貢獻與 Issue

如果希望請求測試某個 App、回報相容性問題，或修正與補充現有資料，請至 [GitHub Repository](https://github.com/kevinlee-06/G-AOSP-DB-TW) 開立 Issue。

## 商標聲明

Android 是 Google LLC 的商標。GrapheneOS 是 GrapheneOS Foundation 的商標。本專案與 Google LLC、GrapheneOS Foundation 或所提及的 App 開發者沒有官方隸屬或背書關係。

## 新增 App

1. 將檔案命名為 Android package name，例如 `apps/com.example.wallet.json`。
2. 依照 [JSON Schema](./schema/app.schema.json) 填寫欄位。
3. 未確認的需求使用 `null`，不要猜測為 `false`。
4. 只在有測試或可靠資料時更新需求欄位。
