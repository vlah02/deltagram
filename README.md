# Deltagram

**Deltagram** is a web application for comparing your Instagram Followers and Following lists over time. It allows you to visually see who unfollowed you, who started following you, and how your connections changed between two or more data snapshots exported from Instagram.

---

## Features

- 📦 **Upload multiple Instagram ZIPs** downloaded from Account Center
- 🗓 **Compare two or more time points**—see changes over time
- 👥 **Followers vs Following**: Easily switch between “Followers” and “Following” comparison tabs
- 🟢 **See “Added” and “Removed” side by side** for each time range
- 🌙 **Dark Mode** support (auto theme switching)
- 📊 **Clean UI** with clear, grouped diff results

---

## How to Get Your Instagram Data ZIPs

To use Deltagram, you need to **download your followers/following data** from Instagram’s Account Center **at two or more points in time**.

**Follow these steps:**

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

## Usage

1. **Upload** two or more ZIP files on the main page
2. The app will **parse your followers/following lists** for each snapshot
3. Switch between the **Followers** and **Following** tabs to see changes
4. For each time interval, you’ll see **Added** and **Removed** side by side

---

## Example

```text
2023-01-01 → 2023-04-01

[Followers Added]    [Followers Removed]
• alice              • charlie
• bob

2023-04-01 → 2023-07-01

[Followers Added]    [Followers Removed]
• dave               • alice
```

---

## Technical Overview

- **Frontend:** Pug/Jade templating, custom CSS
- **Backend:** Node.js/Express
- **ZIP parsing:** Reads Instagram’s exported JSON format, extracts and compares arrays
- **Comparison logic:** Shows diffs per period, both for Followers and Following
- **Tabs:** Clean, instant switch between Follower and Following views

---

## How to Run (If you are deploying yourself)

1. Clone this repository
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the server:
    ```sh
    npm start
    ```
4. Open the app in your browser and upload your Instagram ZIPs!

---

## FAQ

### Can I automate ZIP downloads from Instagram?
No. Instagram **requires manual downloads** for security and privacy reasons.

### Can I compare more than two files?
Yes! Upload as many ZIPs as you want—the app compares all consecutive pairs.

### Is my data private?
All processing is done locally/in your own instance. No data is sent to third parties.

---

## License

MIT

---

## Contributing

Pull requests and suggestions are welcome!
