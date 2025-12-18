# Google Workspace Email Setup for contact@axiotic.ai

## Option 1: Use contact@axiotic.ai as a Group Email (RECOMMENDED - Simplest!)

This is the cleanest approach - create a Google Group with `contact@axiotic.ai` as the group email address directly.

### Steps:
1. Go to [Google Admin Console](https://admin.google.com)
2. Navigate to **Directory** → **Groups**
3. Click **"Create Group"**
4. Configure:
   - **Group name**: "Contact" or "Cofounders Contact"
   - **Group email**: `contact@axiotic.ai` ⭐ (Use this exact address!)
   - **Group type**: Email list
   - **Description**: "Contact form and inquiries - forwarded to cofounders"
5. Add members:
   - `antreas@axiotic.ai` (Antreas Antoniou - Co-Founder & Technical Vision)
   - `sam@axiotic.ai` (Sam Jones - Co-Founder & Engineering Lead)
   - `laura@axiotic.ai` (Laura Bernal - Co-Founder & Commercial Lead)
6. Click **"Create Group"**

### Result:
- Emails sent to `contact@axiotic.ai` will automatically be delivered to all group members
- No forwarding rules needed!
- Easy to add/remove cofounders later
- All cofounders can reply from their own email addresses

**Note**: If `contact@axiotic.ai` already exists as a user mailbox, you may need to:
- Delete the user account first, OR
- Use a different approach (see Option 2 below)

---

## Option 2: Email Forwarding (If contact@axiotic.ai already exists as a user)

### Steps:
1. Go to [Google Admin Console](https://admin.google.com)
2. Navigate to **Directory** → **Groups**
3. Click **"Create Group"**
4. Configure:
   - **Group name**: `contact-group@axiotic.ai` (or `cofounders@axiotic.ai`)
   - **Group email**: `contact-group@axiotic.ai`
   - **Group type**: Email list
   - **Description**: "Cofounders contact group"
5. Add members:
   - `antreas@axiotic.ai`
   - `sam@axiotic.ai`
   - `laura@axiotic.ai`
6. Click **"Create Group"**
7. Set up forwarding:
   - Go to **Apps** → **Google Workspace** → **Gmail** → **Routing**
   - Create rule to forward `contact@axiotic.ai` → `contact-group@axiotic.ai`

### Result:
- Easier to manage - add/remove cofounders from the group
- All cofounders receive emails sent to `contact@axiotic.ai`

---

## Option 3: Email Aliases (Simplest Alternative)

### Steps:
1. Go to [Google Admin Console](https://admin.google.com)
2. Navigate to **Directory** → **Users**
3. For each cofounder account (`antreas@axiotic.ai`, `sam@axiotic.ai`, `laura@axiotic.ai`):
   - Click on the user
   - Go to **Email aliases**
   - Click **"Add alternate email"**
   - Add: `contact@axiotic.ai`
   - Click **"Save"**

### Result:
- All three cofounders will receive emails sent to `contact@axiotic.ai` in their inboxes
- They can reply from their own email addresses

---

## Summary

**Recommended: Option 1** - Create a Google Group with `contact@axiotic.ai` as the group email address. This is the simplest and cleanest solution - no forwarding rules needed!

**Note**: Make sure you have admin access to Google Workspace to perform these actions.

