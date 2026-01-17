# Step-by-Step Debugging Guide for Contact Form

## Step 1: Check Browser Console

1. Open your website in a browser
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to the **Console** tab
4. Submit the form
5. Look for debug messages starting with `=== FORM SUBMISSION DEBUG ===`
6. Check if:
   - The URL is correct
   - The data (email, name, notes) is present
   - Any JavaScript errors appear

**Expected output:**
```
=== FORM SUBMISSION DEBUG ===
URL: https://script.google.com/macros/s/.../exec?email=test@example.com&name=Test&notes=Test
Email: test@example.com
Name: Test
Notes: Test
reCAPTCHA Token: Present (or Not present)
Fetch completed. Check Google Apps Script Executions tab for server-side logs.
=== END DEBUG ===
```

---

## Step 2: Check Google Apps Script Executions

1. Go to [script.google.com](https://script.google.com)
2. Open your script project
3. Click on **"Executions"** tab (left sidebar)
4. Look for recent executions (should appear when form is submitted)
5. Click on the most recent execution
6. Check the logs for:
   - `=== GOOGLE APPS SCRIPT DEBUG ===`
   - Request data received
   - Email sending status

**What to look for:**

✅ **Good signs:**
- Execution appears immediately after form submission
- Logs show "Request received"
- Logs show parsed email, name, notes
- Logs show "SUCCESS: Email sent successfully!"

❌ **Problem signs:**
- No execution appears → Script not receiving requests
- "ERROR: No data received" → Data not being passed correctly
- "ERROR sending email" → Gmail permissions or email address issue

---

## Step 3: Test Google Apps Script Directly

1. In Google Apps Script, click on the function dropdown
2. Select `testEmail`
3. Click the **Run** button (▶️)
4. Check the **Executions** tab for results
5. Check your email inbox

**If testEmail works but form doesn't:**
- The script is fine, but data isn't reaching it from the form
- Check Step 1 (browser console) for URL/data issues

**If testEmail doesn't work:**
- Script has an issue (permissions, email address, etc.)
- Check Gmail permissions
- Verify `contact@axiotic.ai` email exists

---

## Step 4: Check Gmail Permissions

1. In Google Apps Script, click **"Deploy"** → **"Test deployments"**
2. Or run `testEmail()` function
3. If prompted, authorize the script:
   - Click **"Review Permissions"**
   - Select your Google account
   - Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
   - Click **"Allow"**

---

## Step 5: Verify Email Address

1. Check that `contact@axiotic.ai` exists in your Google Workspace
2. Try sending a test email directly to `contact@axiotic.ai`
3. If using a group, verify:
   - Group exists
   - Members are added
   - Group email is `contact@axiotic.ai`

---

## Step 6: Test with Simple URL

Try accessing the script URL directly in your browser with test parameters:

```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?email=test@example.com&name=Test&notes=Test
```

**Expected:**
- Should execute the script
- Check Executions tab to see if it ran
- Check email inbox

---

## Common Issues & Solutions

### Issue: No execution appears in Google Apps Script
**Solution:**
- Check if script URL is correct
- Verify script is deployed as "Web app"
- Check "Who has access" is set to "Anyone"
- Try redeploying the script

### Issue: Execution appears but shows "No data received"
**Solution:**
- The GET request might not be working
- Try switching to POST method (see alternative code below)

### Issue: Email sending fails
**Solution:**
- Check Gmail permissions are granted
- Verify `contact@axiotic.ai` email exists
- Check spam folder
- Try a different email address for testing

### Issue: reCAPTCHA blocking requests
**Solution:**
- Temporarily disable reCAPTCHA to test
- Check reCAPTCHA domain settings
- Verify Site Key is correct

---

## Alternative: Try POST Method

If GET isn't working, we can switch to POST. Let me know if you want to try this approach.

