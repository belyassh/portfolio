# EmailJS Setup Guide

The contact form is now configured to send emails using EmailJS. Follow these steps to set it up:

## Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free tier)

## Step 2: Create an Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create an Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save the template and copy your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key
1. Go to **Account** → **General** in your dashboard
2. Copy your **Public Key** (also called API Key)

## Step 5: Update the Code
Open `script.js` and replace these placeholders:

1. Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key (line ~6)
2. Replace `YOUR_SERVICE_ID` with your Service ID (line ~30)
3. Replace `YOUR_TEMPLATE_ID` with your Template ID (line ~31)
4. Replace `your-email@example.com` with your actual email address (line ~35)

## Example:
```javascript
emailjs.init('abc123xyz'); // Your Public Key

await emailjs.send(
    'service_abc123',    // Your Service ID
    'template_xyz789',   // Your Template ID
    {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'youremail@gmail.com' // Your email
    }
);
```

## Alternative: Use Formspree (Even Easier)
If you prefer a simpler setup, you can use Formspree instead:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up and create a new form
3. Get your form endpoint URL
4. Update the form in `index.html` to use `action` and `method` attributes instead of JavaScript

## Testing
After setup, test the form by:
1. Filling out all fields
2. Submitting the form
3. Checking your email inbox

The form will show "Message Sent! ✓" on success, or an error message if something goes wrong.
