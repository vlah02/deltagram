# Deltagram

**Deltagram** is a self-hosted web app for comparing your Instagram Followers and Following lists over time. It lets you upload multiple Instagram data ZIPs, then visually inspect who you gained or lost in each interval.

---

## 🚀 Features

- 📦 **Upload ZIPs in a modal** — click **Upload** to open a drag-and-drop dialog
- 🖱️ **Drag-and-drop** or click to select files
- 🛑 **Confirm button stays disabled** until at least one file is chosen
- 🗓 **Compare any number of snapshots** — see every consecutive diff
- 👥 **Toggle Followers vs. Following** in one click
- 🟢 **Side-by-side “Added” & “Removed” panels** per date range
- 🌙 **Dark Mode** with smooth, synced transitions
- 🎨 **Tailwind CSS** + Pug templates for a clean, responsive UI

---

## 📂 How to Get Your Instagram Data ZIPs

1. Go to [Instagram Account Center](https://www.instagram.com/accounts/center/)
2. Click **“Your information and permissions”**
3. Click **“Download your information”**
4. Click **“Download or transfer information”**
5. Choose **“Some of your information”**
6. Under **Connections**, check **“Followers and following”**
7. Click **Next**
8. For **Download method**, choose **“Download to device”**
9. For **Date range**, select **“All time”**
10. For **Format**, select **“JSON”**
11. Click **“Create files”** and wait for Instagram to generate the ZIP
12. **Download** your file when it’s ready

> **You must repeat this process on different days/times** to capture changes in your followers and following lists.
>
> **At least 2 ZIPs are needed** to create a comparison, but you can upload as many as you like for a full history!

---

## 🖥️ Usage

1. **Click “Upload”** — a modal pops up.
2. **Drag & drop** one or more ZIPs (or click to browse).
3. **Confirm** (button only enables once files are selected).
4. After upload, switch between **Followers** and **Following** tabs.
5. Scroll down to see each **date-range card** with two columns:
   - **Added**
   - **Removed**

---

## 🔍 Example

```text
2023-01-01 → 2023-04-01

[Added]               [Removed]
• alice               • charlie
• bob

2023-04-01 → 2023-07-01

[Added]               [Removed]
• dave                • alice
```

---

## 🛠️ Technical Overview

- **Templating:** Pug
- **Styling:** Tailwind CSS
- **Server:** Node.js + Express
- **Uploads:** multer → in-memory drag-and-drop modal → confirms only when files are present
- **Diff logic:** reads Instagram’s JSON arrays, computes per-snapshot additions/removals

---

## ⚙️ How to Run (If you are deploying yourself)

1. Clone this repository
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the server:
    ```sh
    npm start
    ```
4. Open the app [in your browser](http://localhost:3000) and upload your Instagram ZIPs!

---

## 🤔 FAQ

### Can I automate ZIP downloads from Instagram?
No. Instagram **requires manual downloads** for security and privacy reasons.

### Can I compare more than two files?
Yes! Upload as many ZIPs as you want—the app compares all consecutive pairs.

### Is my data private?
All processing is done locally/in your own instance. No data is sent to third parties.

---

## 📜 License

MIT

---

## 🤝 Contributing

Pull requests and suggestions are welcome!
