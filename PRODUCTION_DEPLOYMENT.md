# Computer4Kids - Hostinger Production Deployment

## Package Contents

This deployment package contains:
- `dist/` - Built React application (frontend)
- `api/` - PHP backend API
- `database.sql` - MySQL database schema
- `.htaccess` - Root routing configuration
- `public/` - Static assets (robots.txt, sitemap.xml, manifest.json)

## Deployment Steps

### 1. Database Setup

1. Log into your Hostinger control panel
2. Go to **MySQL Databases**
3. Create a new database (or use existing one)
4. Import the `database.sql` file
5. Note your database credentials:
   - Database name
   - Database user
   - Database password
   - Database host (usually `localhost`)

### 2. Configure API

1. Open `api/config.php`
2. Update the database credentials:
   ```php
   $host = 'localhost';
   $dbname = 'your_database_name';
   $username = 'your_database_user';
   $password = 'your_database_password';
   ```
3. Update Google OAuth settings in `api/google-auth.php`:
   - Set your Google Client ID
   - Set your Google Client Secret
   - Verify redirect URI matches your domain

### 3. Upload Files

Upload to your Hostinger public_html folder:

```
public_html/
├── index.html              (from dist/)
├── assets/                 (from dist/assets/)
├── .htaccess              (root routing)
├── api/                   (PHP backend)
│   ├── .htaccess
│   ├── config.php
│   ├── auth.php
│   ├── children.php
│   ├── daily-rewards.php
│   ├── google-auth.php
│   ├── lessons.php
│   ├── progress.php
│   ├── settings.php
│   └── verify-email.php
├── robots.txt
├── sitemap.xml
└── manifest.json
```

### 4. File Permissions

Set proper permissions:
- Folders: 755
- PHP files: 644
- .htaccess: 644

### 5. Verify Installation

1. Visit your domain: `https://computer4kids.com`
2. Test user registration
3. Test Google Sign-In
4. Test child account creation
5. Test lesson completion and progress tracking

## Important Notes

- **SSL Certificate**: Ensure HTTPS is enabled in Hostinger
- **PHP Version**: Requires PHP 7.4 or higher
- **Email**: Configure SMTP in Hostinger for email verification
- **Google OAuth**: Add your domain to Google Cloud Console authorized origins

## API Endpoints

All API endpoints are accessible at: `https://computer4kids.com/api/`

- `POST /api/auth.php` - User authentication
- `POST /api/google-auth.php` - Google Sign-In
- `GET/POST /api/children.php` - Child account management
- `GET/POST /api/lessons.php` - Lesson data
- `POST /api/progress.php` - Progress tracking
- `POST /api/daily-rewards.php` - Daily reward system
- `GET/POST /api/settings.php` - User settings
- `GET /api/verify-email.php` - Email verification

## Troubleshooting

**500 Internal Server Error:**
- Check PHP error logs in Hostinger
- Verify database credentials in `api/config.php`
- Ensure .htaccess files are uploaded

**API not working:**
- Verify API folder has proper .htaccess
- Check PHP version (min 7.4)
- Review database connection

**Google Sign-In not working:**
- Verify domain in Google Cloud Console
- Check Client ID in `api/google-auth.php`
- Ensure redirect URI matches exactly

## Support

For issues, check:
1. Hostinger error logs
2. Browser console for frontend errors
3. Network tab for API response errors
