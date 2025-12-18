# reCAPTCHA Setup Instructions

## Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **"Create"** or **"Add"**
3. Fill in:
   - **Label**: "Axiotic Contact Form"
   - **reCAPTCHA type**: Select **"reCAPTCHA v3"** (invisible, better UX)
   - **Domains**: Add your domain (e.g., `axiotic.ai`, `www.axiotic.ai`)
   - Accept terms and click **"Submit"**
4. Copy your **Site Key** and **Secret Key**

## Step 2: Update index.html

1. Open `docs/index.html`
2. Find line with: `<script src="https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY">`
3. Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual Site Key

## Step 3: Update form-handler.js

1. Open `docs/form-handler.js`
2. Find: `const RECAPTCHA_SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY';`
3. Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual Site Key

## Step 4: Update Google Apps Script (Optional - for server-side verification)

1. Open your Google Apps Script
2. Add the Secret Key at the top:
   ```javascript
   const RECAPTCHA_SECRET_KEY = 'YOUR_SECRET_KEY';
   ```
3. Add verification function (if you want server-side verification)

---

# Troubleshooting Email Not Received

## Check Google Apps Script Execution

1. Go to [script.google.com](https://script.google.com)
2. Open your script
3. Go to **"Executions"** tab
4. Check if recent form submissions show up
5. Click on an execution to see logs and errors

## Common Issues:

1. **Script not receiving data**: Check if `doGet` function exists (updated script now handles both GET and POST)
2. **Gmail permissions**: Make sure the script has permission to send emails
3. **Email address**: Verify `contact@axiotic.ai` exists and is correct
4. **Spam folder**: Check spam/junk folder
5. **Google Workspace group**: If using a group, verify members are added correctly

## Test the Script Manually

1. In Google Apps Script, run the `testEmail()` function
2. Check the **Executions** tab for results
3. Check your email inbox

## Debug Steps:

1. Check browser console (F12) for JavaScript errors
2. Check Google Apps Script **Executions** tab for server-side errors
3. Try submitting the form and immediately check Executions tab
4. Verify the script URL is correct in `form-handler.js`

