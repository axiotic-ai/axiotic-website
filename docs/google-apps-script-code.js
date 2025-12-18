/**
 * Google Apps Script for Axiotic Contact Form
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Paste this entire file
 * 4. Click "Deploy" → "New deployment"
 * 5. Select "Web app" as the type
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 7. Click "Deploy" and copy the Web App URL
 * 8. Paste that URL into form-handler.js (replace YOUR_GOOGLE_APPS_SCRIPT_URL)
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const { email, name, notes } = data;
    
    // Your receiving email address (change if needed)
    const recipientEmail = 'contact@axiotic.ai';
    
    // Create email subject
    const subject = `New Consultation Request${name && name !== 'Not provided' ? ` from ${name}` : ''}`;
    
    // Create formatted email body
    const body = `
New consultation request received from axiotic.ai contact form:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name || 'Not provided'}
Email: ${email}
Message: ${notes || 'No message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You can reply directly to this email to respond to ${email}
    `.trim();
    
    // Send email using GmailApp
    GmailApp.sendEmail(
      recipientEmail, 
      subject, 
      body, 
      {
        replyTo: email,
        name: name && name !== 'Not provided' ? name : 'Contact Form'
      }
    );
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error (check Executions tab in Apps Script)
    console.error('Error processing form:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - run this manually to verify setup
 */
function testEmail() {
  const testData = {
    email: 'test@example.com',
    name: 'Test User',
    notes: 'This is a test message'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

