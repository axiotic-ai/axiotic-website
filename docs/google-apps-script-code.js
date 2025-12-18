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

// Handle both GET and POST requests
function doGet(e) {
  return processRequest(e);
}

function doPost(e) {
  return processRequest(e);
}

function processRequest(e) {
  try {
    // Parse incoming data - Google Apps Script receives data in e.parameter for GET or e.postData for POST
    let email, name, notes;
    
    if (e.parameter) {
      // GET request or form data
      email = e.parameter.email;
      name = e.parameter.name;
      notes = e.parameter.notes;
    } else if (e.postData && e.postData.contents) {
      // POST with JSON
      try {
        const data = JSON.parse(e.postData.contents);
        email = data.email;
        name = data.name;
        notes = data.notes;
      } catch (jsonError) {
        // POST with form data
        const formData = e.parameter || {};
        email = formData.email;
        name = formData.name;
        notes = formData.notes;
      }
    }
    
    // Validate required fields
    if (!email) {
      throw new Error('Email is required');
    }
    
    // Log for debugging (check Executions tab)
    Logger.log('Received form submission:');
    Logger.log('Email: ' + email);
    Logger.log('Name: ' + name);
    Logger.log('Notes: ' + notes);
    
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
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error (check Executions tab in Apps Script)
    Logger.log('Error processing form: ' + error.toString());
    Logger.log('Error details: ' + JSON.stringify(error));
    
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

