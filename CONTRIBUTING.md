# Contributing

感謝你協助維護 G-AOSP-DB-TW。

本專案使用 GitHub Pull Request 維護資料、網站與文件。即使是專案維護者自己新增或修正資料，也請使用 branch 與 PR，讓每次變更都有清楚的 diff、驗證結果與歷史紀錄。

## 變更流程

```text
Issue（可選）
  ↓
建立 branch
  ↓
修改資料或程式
  ↓
本機驗證
  ↓
Push branch
  ↓
建立 Pull Request
  ↓
Review 與 CI
  ↓
Merge 到 main
```

如果是小型、明確的個人維護工作，不必先建立 Issue，可以直接建立 branch 與 PR。

## Naming

Branch、PR 標題與 commit message 使用相同的 type：

```text
data
feat
fix
docs
```

Branch 格式：

```text
<type>/<action>-<target>
```

使用小寫與 kebab-case。`target` 使用 package name 或能描述批次範圍的名稱：

```text
data/add-com-example-bank
data/update-com-nextbank-ncbportal
data/add-apps-taiwan-banks
data/update-apps-payment-2026-10
feat/add-app-filter
fix/app-icon-fetcher
docs/update-contributing
```

如果一次貢獻數個 App，不要把所有 package name 都塞進 branch 名稱；請使用能描述這批 App 的共同範圍，例如：

```text
data/add-apps-taiwan-banks
data/add-apps-payment
data/update-apps-2026-10
```

建議從最新的 `main` 建立 branch：

```bash
git switch main
git pull --ff-only
git switch -c data/add-com-example-bank
```

## Pull Request 規範

### PR 應該小而且有明確目的

推薦的 PR 類型：

- 一個 App 的新增資料
- 一個 App 的資料修正
- 同一批測試產生的數個相關 App
- 一次 Schema 變更
- 一個獨立的網站功能或 UI 調整
- 一次文件更新

不要建立永久累積資料的 PR。完成一個明確變更後就應該 Merge 或關閉。

### PR 標題

PR 標題格式：

```text
<type>: <action> <target>
```

單一 App：

```text
data: add com.example.bank
data: update com.nextbank.ncbportal
```

多個 App：

```text
data: add apps - Taiwan banks
data: add apps - payment
data: update apps - 2026-10 test results
```

網站與文件：

```text
feat: add app filter
fix: correct app icon fetcher
docs: update contributing guide
```

### PR 內容

PR 描述至少包含：

- 變更目的
- 影響的 App 或檔案
- 測試日期與使用的 Profile（資料變更）
- 是否包含相容性判定變更
- 執行過的驗證命令
- 相關 Issue（如果有）

範例：

```text
## Summary
- Add compatibility data for Example Bank.

## Test context
- Date: 2026-10-12
- Profile: Main
- Platform: Pixel 9a + GrapheneOS

## Validation
- pnpm run build
```

## App JSON 規範

每個 App 使用一個檔案：

```text
apps/<Android package name>.json
```

### 必要欄位

- `packageName` 必須與檔名一致
- `name` 使用 App 的正式名稱
- `categories` 至少一項，可複選
- 根層 `compatible` 必須存在，代表目前摘要
- `history` 每筆測試都必須包含：
  - `date`
  - `profile`
  - `compatible`
  - `requirements`
- 如果已知，請記錄測試時的 `appVersion`、`versionCode`、`grapheneOSVersion` 與 `androidVersion`

版本欄位範例：

```json
{
  "appVersion": "1.22.0",
  "versionCode": 700,
  "grapheneOSVersion": "2026100601",
  "androidVersion": 17
}
```

`appVersion`、`versionCode`、`grapheneOSVersion` 與 `androidVersion` 都是測試紀錄欄位，不是 App 根層欄位。

### Profile

`profile` 可使用：

```text
Main
Work
Private
Other
null
```

`null` 代表與 Profile 無關、不適用，或沒有指定 Profile。

### Requirements

需求欄位使用三種值：

- `true`: 已確認需要
- `false`: 已確認不需要
- `null`: 尚未確認

目前欄位為：

```json
{
  "gms": null,
  "gmsForNotifications": null,
  "tee": null,
  "playIntegrity": null,
  "exploitProtectionCompatibilityMode": null
}
```

`gmsForNotifications` 必須獨立於 `gms`。如果只有通知需要 GMS：

```json
{
  "gms": false,
  "gmsForNotifications": true
}
```

不要把尚未測試的需求猜測為 `false`。

### History

不要覆蓋既有歷史。若 App 版本、日期、Profile 或最低需求改變，請新增一筆 `history`。

根層 `compatible` 應與最新一筆 `history` 的 `compatible` 一致。

## 本機驗證

安裝依賴：

```bash
pnpm install
```

執行 production build：

```bash
pnpm run build
```

`pnpm run build` 會先依照 `packageName` 從 Google Play 取得 App icon。若找不到 App 或圖片，會使用預設圖示，不應因此讓 build 失敗。

建立 PR 前至少要確認：

- JSON 語法正確
- package name 與檔名一致
- 需求欄位沒有把未知資料誤寫成 `false`
- 根層 `compatible` 與最新歷史一致
- `pnpm run build` 成功

## Commit 訊息

Commit message 使用與 branch、PR 相同的 type：

```text
<type>: <action> <target>
```

單一 App：

```text
data: add com.example.bank
data: update com.nextbank.ncbportal
```

多個 App：

```text
data: add apps - Taiwan banks
data: update apps - 2026-10 test results
```

網站與文件：

```text
fix: correct profile in app history
feat: add about page
docs: update contributing guide
```

不要在同一個 commit 混入無關的格式化或重構。

## Review 與合併

主要維護者可以 Review 並合併自己的 PR。即使沒有其他貢獻者，也請保留 PR 流程，至少檢查：

- Diff 是否只包含預期檔案
- JSON 是否符合目前 Schema
- 測試條件與 notes 是否足夠理解
- Build 與 CI 是否通過
- 是否需要更新 README 或網站顯示

除非有明確理由，不要直接將資料變更 push 到 `main`。
