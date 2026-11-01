# 初冬北陸信州 7 日旅

2026 年 11 月底「富山・黑部峽谷・立山黑部・白川郷・輕井澤・草津・東京」7 天 6 夜行程表與預訂／行李清單。

網站：https://yisotsao.github.io/tokyo-trip/

## 開發

```bash
npm ci
npm run dev      # 本機開發
npm run build    # 型別檢查＋輸出到 dist/
npm run preview  # 預覽 build 結果（http://localhost:4173/tokyo-trip/）
```

React + TypeScript + Vite，使用 HashRouter：`#/` 首頁、`#/day/1`–`#/day/7` 每日行程、`#/checklist` 行前清單、`#/expenses` 花費表（可下載 Excel）；舊版單頁在 `#/classic` 與 `#/classic/checklist`。重新整理不會 404。

## 結構

- `src/data/`：行程、航班、住宿、時刻表、清單等所有內容，改行程只要改這裡
- `src/components/`：頁面元件（Hero、每日行程、時間軸、資訊框、清單…）
- `src/illustrations/`：手繪 SVG 插畫，與資料分開
- `src/assets/maps/`：巴士上車位置地圖
- `src/styles/legacy.css`：原本單檔版本的樣式

清單勾選存在 localStorage `tokyo-trip-checklist-v1`、每日筆記存在 `tokyo-trip-notes-v1`、花費頁自填金額存在 `tokyo-trip-expenses-v1`，key 與原本的單檔版相同。清單項目的 id 就是儲存用的 key，請不要改名。

## Notion 資料

花費頁與行前清單的「車票與交通預訂」「住宿預訂」改在 Notion「旅遊 › 2026 東京1126-1202」底下的兩張表編輯：

- 旅費（`src/data/notion/expenses.json`）：金額單位日圓；`實付` 填了就取代預估，`編號` 是網站 key 不要改
- 交通與住宿預訂（`src/data/notion/bookings.json`）：一列一段交通或一間住宿，最多兩個待辦勾選

部署時 `scripts/sync-notion.mjs` 用 repo secret `NOTION_TOKEN`（Notion internal integration，兩張表都要在 Connections 加入它）把表格抓成上面兩個 JSON 再 build；沒有 token 時沿用 repo 裡的快照。workflow 每 30 分鐘自動跑一次，也可以在 Actions 手動 Run workflow。「出發前要辦的事」「出國行李清單」仍寫在 `src/data/checklist.ts`。

## 部署

push 到 `main` 會由 `.github/workflows/deploy.yml` 自動 `npm ci`、`npm run build` 並把 `dist` 部署到 GitHub Pages。第一次使用前，請在 repo 的 Settings → Pages 把 Source 設為「GitHub Actions」。`vite.config.ts` 的 `base` 設為 `/tokyo-trip/`，repo 改名時要一起改。
