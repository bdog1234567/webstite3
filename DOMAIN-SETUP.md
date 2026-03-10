# Connect noheamedia.com to GitHub Pages

## Overview
Transfer the custom domain `noheamedia.com` (currently on Wix) to point to the GitHub Pages site at `bdog1234567.github.io/webstite3`.

---

## Step 1: Add CNAME file to GitHub repo
Create a file called `CNAME` (no extension) in the root of the repo with this exact content:
```
noheamedia.com
```
Commit and push to the `master` branch.

---

## Step 2: Configure GitHub Pages custom domain
1. Go to https://github.com/bdog1234567/webstite3/settings/pages
2. Under **Custom domain**, type `noheamedia.com` and click **Save**
3. Leave "Enforce HTTPS" unchecked for now (enable it after DNS propagates)

---

## Step 3: Update DNS records on Wix
1. Log into Wix at https://www.wix.com
2. Go to **My Domains** → click **noheamedia.com** → **Manage DNS** (or DNS Settings)
3. **Delete** all existing A records and CNAME records pointing to Wix servers

4. **Add these 4 A records** (apex domain → GitHub Pages):

| Type | Host/Name | Value/Points to |
|------|-----------|-----------------|
| A    | @         | 185.199.108.153 |
| A    | @         | 185.199.109.153 |
| A    | @         | 185.199.110.153 |
| A    | @         | 185.199.111.153 |

5. **Add this CNAME record** (www subdomain):

| Type  | Host/Name | Value/Points to          |
|-------|-----------|--------------------------|
| CNAME | www       | bdog1234567.github.io    |

---

## Step 4: Wait for DNS propagation
- Changes can take **30 minutes to 48 hours** to fully propagate
- You can check progress at https://dnschecker.org by looking up `noheamedia.com`
- Once it shows GitHub's IP addresses (185.199.x.x), you're good

---

## Step 5: Enable HTTPS
1. Go back to https://github.com/bdog1234567/webstite3/settings/pages
2. Check **Enforce HTTPS**
3. If it says "not yet available", wait a few more minutes — GitHub auto-provisions a free SSL certificate

---

## Step 6: Update meta tags in index.html
After the domain is working, update the Open Graph URL and image references:

Change:
```html
<meta property="og:url" content="https://bdog1234567.github.io/webstite3/" />
<meta property="og:image" content="https://bdog1234567.github.io/webstite3/og-image.png" />
```

To:
```html
<meta property="og:url" content="https://noheamedia.com" />
<meta property="og:image" content="https://noheamedia.com/og-image.png" />
```

---

## Troubleshooting
- **Site shows 404**: CNAME file might be missing or DNS hasn't propagated yet
- **HTTPS not available**: Wait up to 1 hour after DNS propagates for GitHub to issue the certificate
- **www.noheamedia.com doesn't work**: Make sure the CNAME record for `www` is set correctly
- **Old Wix site still showing**: DNS is still cached — wait longer or try a different network/device
