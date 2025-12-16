# Google OAuth Setup Guide for computer4kids.com

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in required fields:
     - App name: `Computer4Kids`
     - User support email: `support@computer4kids.com`
     - Developer contact: Your email
   - Save and continue through all screens

## Step 2: Configure OAuth Client

1. Select **Web application** as the application type
2. Set the following values:
   - **Name**: `Computer4Kids Production`
   - **Authorized JavaScript origins**:
     - `https://computer4kids.com`
     - `https://www.computer4kids.com`
   - **Authorized redirect URIs**:
     - `https://computer4kids.com`
     - `https://www.computer4kids.com`

**CRITICAL:** Include BOTH www and non-www versions to ensure it works regardless of which URL users visit.

3. Click **Create**

## Step 3: Update Environment Variables

1. Copy the **Client ID** from Google Cloud Console
2. Open your `.env` file
3. Replace `your_google_client_id_here` with your actual Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your-actual-client-id-from-google.apps.googleusercontent.com
   ```

## Step 4: Deploy

1. Upload all files to your Hostinger server
2. Make sure the new `api/google-auth.php` file is uploaded
3. Test Google Sign-In on your production site

## How It Works

- Users click "Continue with Google"
- Google's authentication popup appears
- After successful authentication, Google sends a credential token
- Your PHP backend validates the token and creates/logs in the user
- User accounts created via Google are automatically verified (no email verification needed)

## Testing

1. Visit `https://computer4kids.com`
2. Click sign up/sign in
3. Click "Continue with Google"
4. Complete Google authentication
5. You should be automatically signed in

## Troubleshooting

- If you see "Google Sign-In is not configured", verify your Client ID is set correctly in `.env`
- If popup is blocked, check browser popup settings
- Ensure your domain matches exactly what's configured in Google Cloud Console
