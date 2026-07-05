# 家庭投資總覽｜Google 登入保護版

這個版本可部署在 GitHub Pages，但不再公開讀取 Google Sheet。

## 安全架構

- GitHub Pages 只公開網站介面，不包含資產數字。
- Google Sheet 設為「受限制」。
- 使用者按下 Google 登入後，瀏覽器取得短效 OAuth access token。
- 網站用 `spreadsheets.readonly` 權限讀取私人 Sheet。
- Google 會在伺服器端確認登入帳號是否真的有該試算表權限。
- access token 和資產資料不會寫入 localStorage。

## 第一次設定

### 1. 將 Google Sheet 改回私人

在 Google Sheet：

1. 分享 → 一般存取權改為「受限制」。
2. 個別加入你、媽媽、哥哥的 Google 帳號，權限選「檢視者」。

### 2. 建立 Google Cloud 專案

1. 開啟 Google Cloud Console。
2. 建立一個專案，例如 `Family Investment Dashboard`。
3. APIs & Services → Library → 啟用 **Google Sheets API**。

### 3. 設定 OAuth 同意畫面

1. Google Auth Platform → Branding。
2. App name 填 `家庭投資總覽`。
3. Audience 選 External。
4. 發布狀態可以先維持 Testing。
5. 在 Test users 加入你、媽媽、哥哥的 Google 帳號。
6. Data Access 加入：
   `https://www.googleapis.com/auth/spreadsheets.readonly`

### 4. 建立 Web OAuth Client ID

1. Google Auth Platform → Clients → Create client。
2. Application type 選 **Web application**。
3. Authorized JavaScript origins 加入：
   `https://elthefang.github.io`
4. 建立後複製 Client ID。
5. 打開 `config.js`，把 `PASTE_GOOGLE_OAUTH_CLIENT_ID_HERE...` 換成真正 Client ID。

注意：Authorized JavaScript origins 只填網域，不要加 repository 路徑。

### 5. 部署到 GitHub Pages

將以下檔案放到 repository 根目錄：

- `index.html`
- `config.js`
- `privacy.html`
- `terms.html`
- `robots.txt`
- `.nojekyll`

GitHub → Settings → Pages → Deploy from a branch → `main` / `(root)`。

## 使用方式

1. 用電腦或 iPhone Safari 開啟 GitHub Pages HTTPS 網址。
2. 按「使用 Google 帳號登入」。
3. 選擇已被分享 Google Sheet 權限的帳號。
4. 未被授權的帳號會收到 403 權限錯誤，無法取得任何數字。

## 注意

- `spreadsheets.readonly` 是 Google 定義的敏感 scope。私人小型工具可先使用 Testing 並加入指定 Test users。
- OAuth access token 是短效的；過期後需要重新按登入。
- 不要把 OAuth client secret、Google 帳號密碼或 service-account JSON 放進 GitHub。
