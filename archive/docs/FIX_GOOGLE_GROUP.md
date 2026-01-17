# Fix Google Group to Allow Same-Domain Emails

## Problem
The `contact@axiotic.ai` group is blocking emails from `antreas@axiotic.ai` (same domain), but allows emails from external addresses.

## Solution: Configure Group Settings

### Step 1: Open Google Admin Console
1. Go to [admin.google.com](https://admin.google.com)
2. Sign in with your admin account

### Step 2: Navigate to Groups
1. Click **"Directory"** in the left sidebar
2. Click **"Groups"**
3. Search for or find **`contact@axiotic.ai`**
4. Click on the group name

### Step 3: Fix Email Posting Permissions
1. Click on **"Settings"** tab (or look for **"Email options"**)
2. Find the section **"Who can post"** or **"Posting permissions"**
3. Change it to one of these options:
   - ✅ **"Anyone on the internet"** (most permissive - recommended)
   - ✅ **"All members and external senders"** 
   - ✅ **"All organization members"** (allows anyone in axiotic.ai domain)
   - ❌ **NOT** "Group members only" (this blocks same-domain senders)

### Step 4: Check Message Moderation
1. Go to **"Moderation"** tab
2. Under **"Message moderation"**:
   - Set to **"No moderation"** OR
   - Ensure **"Organization members"** are not moderated
3. Under **"Spam moderation"**:
   - Set to **"No spam moderation"** OR
   - Ensure internal emails aren't filtered as spam

### Step 5: Check Access Settings
1. Go to **"Access"** or **"Permissions"** tab
2. Under **"Who can view conversations"**:
   - Should allow members to see messages
3. Under **"Who can view members"**:
   - Can be set to your preference

### Step 6: Save Changes
1. Click **"Save"** or **"Update"** at the bottom
2. Wait a few minutes for changes to propagate

---

## Alternative: If Settings Tab Doesn't Show These Options

If you're viewing the group from the user interface (not admin console):

1. Go to [groups.google.com](https://groups.google.com)
2. Find your `contact@axiotic.ai` group
3. Click **"Group settings"** or the gear icon ⚙️
4. Look for **"Posting permissions"** or **"Who can post"**
5. Change to **"Anyone on the internet"** or **"All organization members"**

---

## Verify It Works

After making changes:

1. **Wait 2-5 minutes** for settings to propagate
2. Test by running `testContactEmail()` in Google Apps Script
3. Or send a test email from `antreas@axiotic.ai` to `contact@axiotic.ai`
4. Check if it arrives

---

## Most Common Fix

The most common issue is **"Who can post"** being set to **"Group members only"**. 

**Change it to: "Anyone on the internet"** - this will allow:
- ✅ External senders (personal emails)
- ✅ Same-domain senders (antreas@axiotic.ai, etc.)
- ✅ Google Apps Script emails

---

## Still Not Working?

If emails still don't arrive after changing settings:

1. Check **"Spam moderation"** - it might be filtering internal emails
2. Check group **"Email delivery"** settings - ensure emails are being delivered
3. Try sending a test email from `antreas@axiotic.ai` directly (not via script) to verify group works
4. Check group **"Email options"** → **"Email delivery"** → should be set to deliver emails

