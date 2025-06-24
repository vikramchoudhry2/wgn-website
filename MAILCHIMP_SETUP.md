# Mailchimp Integration Setup Guide

This guide will help you set up Mailchimp integration for the WeGotNext website to capture email subscriptions from both the shop page and community page.

## Prerequisites

1. A Mailchimp account (free or paid)
2. Access to your Mailchimp dashboard
3. Access to your project's environment variables

## Step 1: Get Your Mailchimp API Key

1. Log into your Mailchimp account
2. Go to **Account** → **Extras** → **API keys**
3. Click **Create A Key** if you don't have one
4. Copy the API key (it will look like: `abc123def456-us1`)

## Step 2: Get Your List ID

1. In Mailchimp, go to **Audience** → **All contacts**
2. If you don't have a list, create one by clicking **Create Audience**
3. Click on your audience name
4. Go to **Settings** → **Audience name and defaults**
5. Copy the **Audience ID** (it will be something like: `a1b2c3d4e5`)

## Step 3: Get Your Server Prefix

Your server prefix is the part after the dash in your API key.
- If your API key is `abc123def456-us1`, then your server prefix is `us1`
- If your API key is `abc123def456-us21`, then your server prefix is `us21`

## Step 4: Add Environment Variables

Add these variables to your `.env.local` file in your project root:

```bash
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_LIST_ID=your_list_id_here
MAILCHIMP_SERVER_PREFIX=your_server_prefix_here
```

### Example:
```bash
MAILCHIMP_API_KEY=abc123def456789-us1
MAILCHIMP_LIST_ID=a1b2c3d4e5
MAILCHIMP_SERVER_PREFIX=us1
```

## Step 5: Test the Integration

1. Restart your development server after adding the environment variables
2. Go to your shop page or community page
3. Try subscribing with a test email
4. Check your Mailchimp audience to see if the email was added

## Troubleshooting

### Common Issues:

1. **"Mailchimp configuration is missing" error**
   - Make sure all three environment variables are set correctly
   - Restart your development server after adding them

2. **"Failed to subscribe" error**
   - Check that your API key is valid and hasn't expired
   - Verify your List ID is correct
   - Make sure your server prefix matches your API key

3. **CORS errors**
   - This shouldn't happen since we're using server-side API routes
   - If you see CORS errors, make sure you're calling `/api/mailchimp` and not the Mailchimp API directly

### Testing Tips:

1. Use a real email address for testing (Mailchimp validates email formats)
2. Check Mailchimp's activity feed for any error messages
3. Look at your browser's network tab to see the actual API responses

## Mailchimp Features Available

The current integration supports:

- ✅ Email subscription
- ✅ Duplicate email handling (won't error if email already exists)
- ✅ Tagging subscribers with 'wegotnext-community'
- ✅ Double opt-in (if enabled in Mailchimp settings)

## Next Steps

Once the basic integration is working, you can enhance it by:

1. Adding custom fields (name, interests, etc.)
2. Setting up automated welcome emails in Mailchimp
3. Creating segments based on subscription source (shop vs community)
4. Adding unsubscribe functionality

## Support

If you encounter issues:

1. Check the Mailchimp API documentation: https://mailchimp.com/developer/marketing/api/
2. Verify your account permissions in Mailchimp
3. Test with Mailchimp's API playground first

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API keys secure and rotate them periodically
- Use the minimum required permissions for your Mailchimp API key 