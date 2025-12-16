# Hostinger Setup Guide

This guide will help you deploy your Computer Kids Learning app to Hostinger.

## Prerequisites

- Hostinger hosting account with MySQL database support
- Access to Hostinger control panel (hPanel)
- FTP access or File Manager access

## Step 1: Create MySQL Database

1. Log in to your Hostinger hPanel
2. Navigate to **Databases** → **MySQL Databases**
3. Click **Create New Database**
4. Enter a database name (e.g., `computerkids_db`)
5. Create a database user with a strong password
6. Grant the user ALL PRIVILEGES on the database
7. Note down these details:
   - Database name
   - Database username
   - Database password
   - Database host (usually `localhost`)

## Step 2: Import Database Schema

1. In hPanel, go to **Databases** → **phpMyAdmin**
2. Select your newly created database from the left sidebar
3. Click the **Import** tab
4. Click **Choose File** and select the `database.sql` file from your project
5. Click **Go** to import the schema and default lessons

## Step 3: Configure API Connection

1. Open the file `api/config.php` in your project
2. Update the database configuration:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');     // Your database name
define('DB_USER', 'your_database_user');      // Your database username
define('DB_PASS', 'your_database_password');  // Your database password
```

3. Update the secret key for token generation (change 'secret_key_change_this' to a random string):

```php
$expectedHash = hash('sha256', $user['id'] . $user['email'] . 'YOUR_RANDOM_SECRET_KEY');
```

## Step 4: Upload Files to Hostinger

### Using File Manager:

1. In hPanel, go to **Files** → **File Manager**
2. Navigate to `public_html` directory
3. Upload the entire project:
   - All files from the `dist` folder (after running `npm run build`)
   - The entire `api` folder
   - The `.htaccess` file from the project root

### Using FTP:

1. Connect to your Hostinger account via FTP
2. Navigate to `public_html` directory
3. Upload files as mentioned above

## Step 5: Update API URL in Frontend

If your website domain is `https://example.com`, the API will be accessible at:
`https://example.com/api/`

No additional configuration needed if you uploaded files correctly.

## Step 6: Test Your Application

1. Visit your website URL
2. Try creating a new account
3. Create a child profile
4. Complete a lesson and check if progress is saved
5. Sign out and sign back in to verify data persistence

## Folder Structure on Hostinger

```
public_html/
├── index.html              (from dist folder)
├── assets/                 (from dist folder)
│   ├── index-*.css
│   └── index-*.js
├── api/
│   ├── .htaccess
│   ├── config.php
│   ├── auth.php
│   ├── children.php
│   ├── lessons.php
│   ├── progress.php
│   ├── settings.php
│   └── daily-rewards.php
├── .htaccess
└── (other static files)
```

## Troubleshooting

### Database Connection Issues

1. Verify database credentials in `api/config.php`
2. Ensure your database user has proper privileges
3. Check if MySQL is running on Hostinger

### API Not Working

1. Verify `.htaccess` is uploaded in the `api` folder
2. Check if mod_rewrite is enabled on your hosting (it should be by default)
3. Check PHP error logs in hPanel

### CORS Errors

1. Verify the API `.htaccess` file is properly uploaded
2. Check browser console for specific error messages
3. Ensure your domain is correctly configured

## Security Notes

1. **Change the secret key** in `config.php` immediately after setup
2. **Use strong passwords** for database users
3. **Keep PHP updated** through Hostinger panel
4. **Regularly backup** your database through phpMyAdmin

## Support

If you encounter issues:
1. Check Hostinger knowledge base
2. Contact Hostinger support
3. Review PHP error logs in hPanel → Advanced → Error Logs
