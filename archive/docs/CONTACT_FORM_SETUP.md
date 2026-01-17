# Contact Form Setup Guide for Google Workspace

## Option 1: Google Apps Script (Recommended - Free & Secure)

### Step 1: Create Google Apps Script Web App

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { email, name, notes } = data;
    
    // Your receiving email address
    const recipientEmail = 'contact@axiotic.ai';
    
    // Create email subject
    const subject = `New Consultation Request from ${name || email}`;
    
    // Create email body
    const body = `
New consultation request received:

Name: ${name || 'Not provided'}
Email: ${email}
Message: ${notes || 'No message provided'}

---
Sent from axiotic.ai contact form
    `.trim();
    
    // Send email using GmailApp
    GmailApp.sendEmail(recipientEmail, subject, body, {
      replyTo: email,
      name: name || 'Contact Form'
    });
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Email sent successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click "Deploy" → "New deployment"
5. Click the gear icon ⚙️ next to "Select type" → Choose "Web app"
6. Set:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this is safe - the script validates data)
7. Click "Deploy"
8. **Copy the Web App URL** - you'll need this in the next step

### Step 2: Update form-handler.js

Replace the EmailJS code with the Google Apps Script endpoint.

### Step 3: Test

Submit the form and check your contact@axiotic.ai inbox.

---

## Option 2: EmailJS (Alternative - Requires Account Setup)

If you prefer EmailJS:

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Add Gmail service
3. Create email template
4. Get your Public Key, Service ID, and Template ID
5. Update form-handler.js with your credentials

---

## Option 3: Formspree (Easiest - But Third Party)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form endpoint
3. Update form action to point to Formspree endpoint
4. No backend code needed

---

## Security Notes

- Google Apps Script: Free, secure, uses your Google account
- Rate limiting: Google Apps Script has daily quotas (100 emails/day for free)
- Spam protection: Consider adding reCAPTCHA for production

