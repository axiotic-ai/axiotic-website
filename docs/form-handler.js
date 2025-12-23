/**
 * Contact Form Handler
 * Sends form submissions to Google Apps Script Web App
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Apps Script at script.google.com
 * 2. Deploy it as a Web App (see CONTACT_FORM_SETUP.md)
 * 3. Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' below with your Web App URL
 * 4. Get reCAPTCHA keys from https://www.google.com/recaptcha/admin
 * 5. Replace 'YOUR_RECAPTCHA_SITE_KEY' in index.html
 */

// Your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpb0glnaC-o2C9bIfJ-R8lOad0ItjcpsHDuwqmEztlQOX5KfGqr_oYcuA0wGrMcQGqGw/exec';

// reCAPTCHA Site Key (get from https://www.google.com/recaptcha/admin)
const RECAPTCHA_SITE_KEY = '6LcB_S8sAAAAAKwHounFNONQvUvqTDVuOCj3rxJF';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Be resilient to markup changes: try id first, then fall back to the form inside #contact-form.
  const contactForm =
    document.querySelector('#consultation-form') ??
    document.querySelector('#contact-form form');

  if (!contactForm) {
    console.warn(
      '[contact-form] No form found (expected #consultation-form or #contact-form form).'
    );
    return;
  }

  contactForm.addEventListener('submit', handleFormSubmit);
});

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Get form data
  const email = form.querySelector('#email').value.trim();
  const name = form.querySelector('#name').value.trim() || 'Not provided';
  const notes = form.querySelector('#notes').value.trim() || 'Not provided';
  
  // Validate email
  if (!email || !isValidEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Check if script URL is configured
  if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
    showMessage('Form is not configured. Please set up Google Apps Script (see CONTACT_FORM_SETUP.md)', 'error');
    console.error('Google Apps Script URL not configured');
    return;
  }
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  submitButton.classList.add('opacity-75', 'cursor-not-allowed');
  
  try {
    // Get reCAPTCHA token if configured
    let recaptchaToken = null;
    if (typeof grecaptcha !== 'undefined' && RECAPTCHA_SITE_KEY !== 'YOUR_RECAPTCHA_SITE_KEY') {
      try {
        recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
      } catch (recaptchaError) {
        console.warn('reCAPTCHA error:', recaptchaError);
        // Continue without reCAPTCHA if it fails
      }
    }
    
    // Build URL with query parameters (Google Apps Script works better this way)
    // IMPORTANT:
    // - Our Apps Script setup guide uses `doPost` and expects JSON.
    // - Cross-origin CORS from Apps Script is often not enabled, so we send using
    //   `mode: "no-cors"` with `Content-Type: text/plain` to avoid preflight and CORS failures.
    // - This means we can't reliably read the response in the browser; we treat a resolved
    //   fetch as "sent" and recommend checking the Apps Script "Executions" tab for debugging.
    const payload = {
      email,
      name,
      notes,
      recaptcha_token: recaptchaToken,
      page_url: window.location.href,
      submitted_at: new Date().toISOString(),
    };

    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('POST URL:', GOOGLE_SCRIPT_URL);
    console.log('Payload:', payload);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log('Request sent via fetch(no-cors). Check Google Apps Script Executions tab.');
    console.log('=== END DEBUG ===');

    showMessage(
      "Thank you! We'll be in touch soon. If you don't hear back, email contact@axiotic.ai.",
      'success'
    );
    form.reset();
    
  } catch (error) {
    console.error('Error sending form:', error);
    showMessage('There was an error sending your message. Please try again or email contact@axiotic.ai directly.', 'error');
  } finally {
    // Re-enable button after a delay
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
    }, 2000);
  }
}

/**
 * Show success/error message
 */
function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message mt-4 p-4 rounded-lg text-sm ${
    type === 'success' 
      ? 'bg-green-500/20 text-green-700 border border-green-500/30' 
      : 'bg-red-500/20 text-red-700 border border-red-500/30'
  }`;
  messageEl.textContent = message;
  
  // Insert after form
  const form = document.querySelector('#consultation-form');
  form.parentNode.insertBefore(messageEl, form.nextSibling);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    messageEl.style.transition = 'opacity 0.3s';
    messageEl.style.opacity = '0';
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


