---
layout: doc
title: Authentication
description: User authentication and security setup for Raghim AI Enterprise Platform
---

# Authentication Setup

This guide covers user authentication and security configuration for the Enterprise RAG System.

## Default Authentication

The Enterprise RAG System includes built-in authentication with:

- **Username/Password**: Standard login credentials
- **JWT Tokens**: Secure session management
- **Admin Management**: User creation and management by administrators

## Admin User Setup

### First-Time Setup
During installation, the system creates an admin user:

1. **Access Admin Panel**: Navigate to `/admin` in your browser
2. **Default Credentials**: Use the credentials provided during installation
3. **Change Password**: Update the default password immediately

### Creating Users
Administrators can create new users:

1. **Login as Admin**: Access the admin panel
2. **User Management**: Navigate to User Management
3. **Create User**: Add new users with appropriate permissions
4. **Set Permissions**: Configure user roles and access levels

## User Roles

### Admin
- Full system access
- User management
- System configuration
- License management

### User
- Standard user access
- Document upload and processing
- AI model interaction
- Personal collections

## Security Features

### Password Requirements
- Minimum 8 characters
- Mixed case letters
- Numbers and special characters
- Password change enforcement

### Session Management
- JWT token-based sessions
- Configurable session timeout
- Secure cookie handling
- Automatic logout on inactivity

### IP Whitelisting
Configure allowed IP addresses:

```env
# In .env file
ALLOWED_IPS=192.168.1.0/24,10.0.0.0/8
```

## Authentication Configuration

### JWT Settings
Configure JWT secret and expiration:

```env
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION_HOURS=24
```

### Session Configuration
```env
SESSION_TIMEOUT_MINUTES=60
AUTO_LOGOUT_ENABLED=true
```

## Troubleshooting Authentication

### Common Issues

**Login Failures:**
- Verify username and password
- Check user account status (active/inactive)
- Ensure user has proper permissions

**Session Expired:**
- Increase `JWT_EXPIRATION_HOURS`
- Check system time synchronization
- Clear browser cookies

**Admin Access Issues:**
- Verify admin user exists
- Check admin permissions
- Reset admin password if needed

### Password Reset
Administrators can reset user passwords:

1. **Admin Panel**: Access user management
2. **Select User**: Choose the user requiring password reset
3. **Reset Password**: Generate new temporary password
4. **Notify User**: Provide new credentials securely

## Best Practices

### Password Security
- Use strong, unique passwords
- Enable password change requirements
- Regular password updates
- Two-factor authentication (if available)

### User Management
- Regular user access reviews
- Remove inactive accounts
- Monitor login attempts
- Maintain user documentation

### System Security
- Keep JWT secrets secure
- Regular security updates
- Monitor authentication logs
- Implement IP restrictions as needed
