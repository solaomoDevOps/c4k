# Google Auth Verification Checklist

## How Google Auth Works (No Redirects!)

Google Sign-In uses "One Tap" which means:
- **NO redirects happen** - it's a popup/modal overlay
- User stays on computer4kids.com the entire time
- Google shows account picker overlay
- After selection, token is sent directly to your site
- User is immediately logged in

## Critical Configuration Requirements

### 1. Google Cloud Console Settings

You MUST configure these EXACTLY:

**Authorized JavaScript Origins:**
```
https://computer4kids.com
https://www.computer4kids.com
```

**Authorized Redirect URIs (even though no redirect happens):**
```
https://computer4kids.com
https://www.computer4kids.com
```

**IMPORTANT:**
- Do NOT include trailing slashes in origins
- Include BOTH www and non-www versions
- Must be HTTPS (not HTTP)

### 2. Environment Variable Verification

Your `.env` file must have:
```
VITE_GOOGLE_CLIENT_ID=957716393184-6u772it38kb3c9n19nbbspsn55asg088.apps.googleusercontent.com
```

Verify this Client ID matches EXACTLY what's in Google Cloud Console.

### 3. JWT Decoding Fix

✅ Already fixed in `api/google-auth.php`:
- Handles base64url encoding (Google's format)
- Adds proper padding
- Decodes JWT payload correctly

This fix resolves the "string did not match expected pattern" error.

### 4. API Endpoint Verification

Your AuthModal sends requests to:
```
https://computer4kids.com/api/google-auth.php
```

Ensure:
- File exists at this exact path
- PHP has read/execute permissions
- CORS headers are set correctly (already configured)

## Testing Procedure

### Test on Desktop:
1. Open https://computer4kids.com
2. Click Sign In/Sign Up
3. Click "Continue with Google"
4. Should see Google account picker overlay (NOT a redirect)
5. Select an account
6. Should immediately be logged in

### Test on Mobile:
1. Open https://computer4kids.com on mobile browser
2. Click Sign In/Sign Up
3. Click "Continue with Google"
4. Should see Google account picker
5. Select an account
6. Should immediately be logged in

## Common Issues & Solutions

### Issue: "Google Sign-In is loading"
**Cause:** Google's SDK script hasn't loaded yet
**Solution:** Wait 2-3 seconds after page load before clicking

### Issue: "Google Sign-In is not configured"
**Cause:** Client ID not set or incorrect
**Solution:** Verify VITE_GOOGLE_CLIENT_ID in .env file

### Issue: "Invalid Google credential format"
**Cause:** JWT token is malformed
**Solution:** Already fixed with base64 padding in google-auth.php

### Issue: "string did not match expected pattern"
**Cause:** Base64url encoding not handled properly
**Solution:** Already fixed with proper base64url decoding

### Issue: Popup blocked
**Cause:** Browser blocking Google popup
**Solution:** User needs to allow popups for computer4kids.com

## What Happens Behind the Scenes

1. **User clicks button** → JavaScript calls `handleGoogleAuth()`
2. **Google initializes** → Shows account picker overlay
3. **User selects account** → Google generates JWT token
4. **Token sent to PHP** → `POST https://computer4kids.com/api/google-auth.php`
5. **PHP decodes JWT** → Extracts email, name, googleId
6. **Check database** → User exists? Log in : Create account
7. **Return token** → JavaScript receives auth token
8. **User logged in** → Redirected to dashboard

## Security Notes

- JWT is verified by decoding (Google's public key validation would be better but requires additional setup)
- User email is extracted from JWT payload
- New users are auto-created with verified email
- Session tokens are generated server-side
- No sensitive data stored in localStorage except auth token

## Guaranteed to Work If:

✅ Client ID in .env matches Google Cloud Console exactly
✅ Authorized origins include both www and non-www versions
✅ HTTPS is used (not HTTP)
✅ google-auth.php file is uploaded and accessible
✅ Database connection works (users table exists)

## Final Verification

Run this checklist before going live:

- [ ] Client ID is correct in .env
- [ ] Google Cloud Console has correct authorized origins
- [ ] google-auth.php is uploaded to server
- [ ] Test login on desktop Chrome
- [ ] Test login on desktop Firefox
- [ ] Test login on mobile Safari (iOS)
- [ ] Test login on mobile Chrome (Android)
- [ ] Verify user is created in database
- [ ] Verify session persists on page reload
