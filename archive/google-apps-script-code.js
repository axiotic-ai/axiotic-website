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
  // Ensure e exists (should always be provided by Google Apps Script, but safety check)
  if (!e) {
    e = {};
  }
  return processRequest(e);
}

function doPost(e) {
  // Ensure e exists (should always be provided by Google Apps Script, but safety check)
  if (!e) {
    e = {};
  }
  return processRequest(e);
}

function processRequest(e) {
  try {
    // Log everything for debugging
    Logger.log('=== GOOGLE APPS SCRIPT DEBUG ===');
    Logger.log('Request received at: ' + new Date().toISOString());
    Logger.log('e.parameter: ' + JSON.stringify(e ? e.parameter : 'e is undefined'));
    Logger.log('e.postData exists: ' + (e && e.postData ? 'Yes' : 'No'));
    if (e && e.postData) {
      Logger.log('e.postData: ' + JSON.stringify(e.postData));
    }
    
    // Safety check
    if (!e) {
      Logger.log('ERROR: Event object (e) is undefined');
      throw new Error('Event object is undefined');
    }
    
    // Parse incoming data - Google Apps Script receives data in e.parameter for GET or e.postData for POST
    let email, name, notes;
    
    // Check GET request first (e.parameter exists and has data)
    if (e.parameter && typeof e.parameter === 'object' && Object.keys(e.parameter).length > 0) {
      // GET request or form data
      Logger.log('Processing as GET request with parameters');
      email = e.parameter.email;
      name = e.parameter.name;
      notes = e.parameter.notes;
    } 
    // Check POST request (e.postData exists)
    else if (e.postData && e.postData.contents) {
      // POST with JSON
      Logger.log('Processing as POST request with JSON');
      try {
        const data = JSON.parse(e.postData.contents);
        email = data.email;
        name = data.name;
        notes = data.notes;
      } catch (jsonError) {
        Logger.log('JSON parse error: ' + jsonError.toString());
        // Fallback to parameters if available
        if (e.parameter) {
          email = e.parameter.email;
          name = e.parameter.name;
          notes = e.parameter.notes;
        }
      }
    } 
    // No data found
    else {
      Logger.log('ERROR: No data received in request');
      Logger.log('e.parameter keys: ' + (e.parameter ? Object.keys(e.parameter).join(', ') : 'null'));
      Logger.log('e.postData: ' + (e.postData ? 'exists' : 'null'));
      throw new Error('No data received in request');
    }
    
    // Validate required fields
    if (!email) {
      Logger.log('ERROR: Email is required but not provided');
      throw new Error('Email is required');
    }
    
    // Log parsed data
    Logger.log('Parsed form data:');
    Logger.log('Email: ' + email);
    Logger.log('Name: ' + (name || 'Not provided'));
    Logger.log('Notes: ' + (notes || 'Not provided'));
    
    // Send directly to cofounders (bypassing group restrictions)
    const cofounderEmails = [
      'antreas@axiotic.ai',
      'sam@axiotic.ai',
      'laura@axiotic.ai'
    ];
    
    Logger.log('Sending to cofounders: ' + cofounderEmails.join(', '));
    
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
    
    // Send email using GmailApp to all cofounders
    Logger.log('Subject: ' + subject);
    Logger.log('From email (replyTo): ' + email);
    
    // Check what account the script is running as
    const scriptOwnerEmail = Session.getActiveUser().getEmail();
    Logger.log('Script is running as: ' + scriptOwnerEmail);
    
    // Send to all cofounders
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < cofounderEmails.length; i++) {
      const recipientEmail = cofounderEmails[i];
      Logger.log('Attempting to send email to: ' + recipientEmail);
      
      try {
        GmailApp.sendEmail(
          recipientEmail, 
          subject, 
          body, 
          {
            replyTo: email,
            name: name && name !== 'Not provided' ? name : 'Contact Form'
          }
        );
        Logger.log('SUCCESS: Sent to ' + recipientEmail);
        successCount++;
      } catch (emailError) {
        Logger.log('ERROR sending to ' + recipientEmail + ': ' + emailError.toString());
        failCount++;
      }
    }
    
    Logger.log('Email sending summary: ' + successCount + ' succeeded, ' + failCount + ' failed');
    Logger.log('Check inboxes and spam folders for: ' + cofounderEmails.join(', '));
    
    if (successCount === 0) {
      throw new Error('Failed to send email to all cofounders');
    }
    
    // Return success response with CORS headers
    Logger.log('=== END DEBUG - SUCCESS ===');
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
 * Test function - run this manually to verify setup (POST with JSON)
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

/**
 * Test function for GET requests (simulates form submission)
 */
function testEmailGet() {
  const mockEvent = {
    parameter: {
      email: 'test@example.com',
      name: 'Test User GET',
      notes: 'This is a test message via GET'
    }
  };
  
  const result = doGet(mockEvent);
  Logger.log(result.getContent());
}

/**
 * Test function - send to your personal email to verify email sending works
 * CHANGE THE EMAIL ADDRESS BELOW TO YOUR PERSONAL EMAIL
 */
function testEmailToPersonal() {
  // CHANGE THIS to your personal email address
  const testEmail = 'YOUR_PERSONAL_EMAIL@gmail.com';
  
  Logger.log('=== TESTING EMAIL SEND ===');
  Logger.log('Sending test email to: ' + testEmail);
  
  try {
    GmailApp.sendEmail(
      testEmail,
      'Test Email from Google Apps Script - Axiotic',
      'If you receive this email, then GmailApp.sendEmail() is working correctly!\n\nThis means the issue is likely:\n1. Email going to spam folder\n2. contact@axiotic.ai email address issue\n3. Google Workspace group configuration',
      {
        name: 'Axiotic Contact Form Test'
      }
    );
    Logger.log('SUCCESS: Test email sent to ' + testEmail);
    Logger.log('Check your inbox AND spam folder!');
  } catch (error) {
    Logger.log('ERROR sending test email: ' + error.toString());
    Logger.log('Error details: ' + JSON.stringify(error));
  }
}

/**
 * Test function - try sending directly to contact@axiotic.ai to see error
 */
function testContactEmail() {
  const contactEmail = 'contact@axiotic.ai';
  const scriptOwner = Session.getActiveUser().getEmail();
  
  Logger.log('=== TESTING contact@axiotic.ai ===');
  Logger.log('Script owner (FROM address): ' + scriptOwner);
  Logger.log('Attempting to send to: ' + contactEmail);
  Logger.log('FROM: ' + scriptOwner + ' → TO: ' + contactEmail);
  
  try {
    GmailApp.sendEmail(
      contactEmail,
      'Test Email to contact@axiotic.ai',
      'This is a test email from Google Apps Script.\n\nScript owner: ' + scriptOwner + '\n\nIf you receive this, the script can send to contact@axiotic.ai!',
      {
        name: 'Axiotic Contact Form Test'
      }
    );
    Logger.log('SUCCESS: Email sent to ' + contactEmail);
    Logger.log('Check inbox and spam folder!');
    Logger.log('NOTE: If email doesn\'t arrive, check email routing rules for ' + scriptOwner);
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    Logger.log('Error name: ' + error.name);
    Logger.log('Error message: ' + error.message);
    
    // Try MailApp as alternative
    Logger.log('Trying MailApp as alternative...');
    try {
      MailApp.sendEmail({
        to: contactEmail,
        subject: 'Test Email to contact@axiotic.ai (via MailApp)',
        body: 'This is a test email from Google Apps Script using MailApp.\n\nScript owner: ' + scriptOwner,
        name: 'Axiotic Contact Form Test'
      });
      Logger.log('SUCCESS: MailApp worked!');
    } catch (mailError) {
      Logger.log('MailApp also failed: ' + mailError.toString());
    }
  }
}

/**
 * Test function - check what email address the script runs as
 */
function checkScriptOwner() {
  const ownerEmail = Session.getActiveUser().getEmail();
  Logger.log('=== SCRIPT OWNER CHECK ===');
  Logger.log('Script is running as: ' + ownerEmail);
  Logger.log('This is the email address that will appear as the sender');
  Logger.log('If this is antreas@axiotic.ai and emails aren\'t arriving, check:');
  Logger.log('1. Email routing rules for ' + ownerEmail);
  Logger.log('2. Outbound gateway settings');
  Logger.log('3. Group settings for contact@axiotic.ai');
}

