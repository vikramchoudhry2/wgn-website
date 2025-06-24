export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Mailchimp API configuration
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., 'us1'

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
      throw new Error('Mailchimp configuration is missing');
    }

    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

    const data = {
      email_address: email,
      status: 'subscribed',
      tags: ['wegotnext-community'] // Optional: tag to identify source
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      });
    } else {
      // Handle Mailchimp errors
      if (result.title === 'Member Exists') {
        return res.status(200).json({ 
          success: true, 
          message: 'You are already subscribed to our newsletter' 
        });
      } else {
        throw new Error(result.detail || 'Failed to subscribe');
      }
    }

  } catch (error) {
    console.error('Mailchimp API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
} 