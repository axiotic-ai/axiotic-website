# Check Routing Settings for Email Blocking

## What to Check:

### 1. Outbound Gateway
If there's an SMTP server configured:
- This might be blocking or rerouting emails
- Check if it's configured correctly
- If not needed, you can leave it unconfigured

### 2. Email Forwarding Using Recipient Address Map
Check if there's a forwarding rule:
- Look for any mappings that might redirect `contact@axiotic.ai`
- Or rules that affect `antreas@axiotic.ai` → `contact@axiotic.ai`

### 3. Non-Gmail Mailbox Routing
If enabled:
- This might be rerouting emails away from Google's servers
- Check if it's affecting internal emails

---

## Most Important: Check Email Log Search

1. Go to **Email Log Search** (link should be in the Routing section)
2. Search for:
   - **From**: `antreas@axiotic.ai`
   - **To**: `contact@axiotic.ai`
   - **Date**: Last 7 days
3. Look at the results:
   - Are emails being **delivered**?
   - Are they being **blocked** or **quarantined**?
   - What's the **delivery status**?
   - Any **error messages**?

This will show you exactly what's happening to the emails.

---

## Quick Test

Before checking logs, try this:

1. From your Gmail (`antreas@axiotic.ai`)
2. Send a test email directly to `contact@axiotic.ai`
3. Check Email Log Search immediately after
4. See if it shows up and what the status is

If the direct email doesn't show up in Email Log Search, then there's a routing rule blocking it before it even reaches Google's servers.







