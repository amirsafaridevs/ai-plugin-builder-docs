# Plugin Installation and Management

This section covers how to install, manage, and maintain generated plugins.

## 📦 Installing Plugins

### Automatic Installation

After generating a plugin, you can install it automatically:

```
1. Plugin generation by AI
2. Code review (optional)
3. Click "Install and Activate"
4. Plugin appears in the plugins list
```

### Manual Installation

If you want to install the plugin later:

```
1. Go to "Generated Plugins" section
2. Select the desired plugin
3. Click "Install"
```

### Installation via WP-CLI

```bash
# List generated plugins
wp ai-plugin list

# Install plugin
wp ai-plugin install plugin-slug

# Activate
wp ai-plugin activate plugin-slug
```

## 📋 Managing Plugins

### Management Page

Go to **AI Plugin Builder > My Plugins**:

```
┌─────────────────────────────────────────┐
│  Generated Plugins                      │
├─────────────────────────────────────────┤
│                                         │
│  [Search] [Filter] [Sort]               │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Plugin 1                           │  │
│  │ Status: Active                     │  │
│  │ Date: 2024-01-15                   │  │
│  │ [Edit] [Deactivate] [Delete]       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Plugin 2                           │  │
│  │ Status: Inactive                   │  │
│  │ Date: 2024-01-14                   │  │
│  │ [Edit] [Activate] [Delete]        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Filters and Search

#### Filter by Status

```
- All
- Active
- Inactive
- Deleted
```

#### Filter by Date

```
- Today
- This Week
- This Month
- All
```

#### Search

```
Search by:
- Plugin name
- Description
- Tags
```

## ✏️ Editing Plugins

### Edit via Chat Interface

```
User: "Edit the previous plugin and change the number of posts to 10"
AI: "Applying changes..."
```

### Direct Code Editing

1. Go to plugin details page
2. Click "Edit Code"
3. Edit the code
4. Click "Save"

### Editing Files

```php
// Edit example
// Before:
'posts_per_page' => 5

// After:
'posts_per_page' => 10
```

## 🔄 Updating Plugins

### Automatic Updates

Plugins can be updated automatically:

```
1. Request update via chat interface
2. AI applies changes
3. New version is installed
```

### Manual Update

```
1. Select plugin
2. Click "Update"
3. Review changes
4. Confirm update
```

### Version Management

```php
// Main plugin file
Version: 1.0.0

// Update to
Version: 1.1.0

// Changes:
- Added new feature
- Bug fix
- Performance improvement
```

## 🗑️ Deleting Plugins

### Delete from Admin Panel

```
1. Select plugin
2. Click "Delete"
3. Confirm deletion
4. Plugin and its files are removed
```

### Delete via WP-CLI

```bash
# Delete plugin
wp ai-plugin delete plugin-slug

# Delete with confirmation
wp ai-plugin delete plugin-slug --yes
```

### Complete Deletion

Complete deletion includes:
- ✅ Delete plugin files
- ✅ Delete from database
- ✅ Delete tables (optional)
- ✅ Delete settings (optional)

## 📊 Statistics and Reports

### General Statistics

```
Total plugins: 25
Active plugins: 18
Inactive plugins: 7
Space used: 15 MB
```

### Per Plugin Statistics

```
Name: Posts Display Plugin
Status: Active
Version: 1.0.0
Creation date: 2024-01-15
Last update date: 2024-01-20
Usage count: 150
Space used: 2.5 MB
```

### Performance Report

```
Most used plugins:
1. Posts Display Plugin (150 uses)
2. Date Display Plugin (120 uses)
3. Contact Form Plugin (95 uses)
```

## 🔍 Review and Testing

### Code Review

```php
// Syntax check
php -l plugin-file.php

// WordPress standards check
phpcs --standard=WordPress plugin-file.php
```

### Functionality Test

```
1. Activate plugin
2. Check functionality
3. Test in different environments
4. Check for errors
```

### Security Testing

```
1. SQL Injection check
2. XSS check
3. CSRF check
4. File Inclusion check
```

## 💾 Backup

### Automatic Backup

```
Daily backup:
- Plugin files
- Settings
- Database data
```

### Manual Backup

```
1. Select plugin
2. Click "Backup"
3. Download ZIP file
```

### Restore

```
1. Upload backup file
2. Select plugin
3. Click "Restore"
```

## 🔐 Security

### Security Check Before Installation

```
✅ SQL Injection check
✅ XSS check
✅ CSRF check
✅ File Inclusion check
✅ File access permissions check
```

### Access Restrictions

```
- Only admin can install plugins
- Confirmation required for complex plugins
- Log all operations
```

## 📱 Management via API

### REST API

```php
// Get plugin list
GET /wp-json/ai-plugin-builder/v1/plugins

// Get plugin information
GET /wp-json/ai-plugin-builder/v1/plugins/{slug}

// Install plugin
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/install

// Activate
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/activate

// Deactivate
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/deactivate

// Delete
DELETE /wp-json/ai-plugin-builder/v1/plugins/{slug}
```

## 🎯 Best Practices

### Plugin Organization

```
✅ Use clear names
✅ Add complete descriptions
✅ Use tags
✅ Categorize plugins
```

### Maintenance

```
✅ Regular updates
✅ Security checks
✅ Functionality testing
✅ Regular backups
```

### Optimization

```
✅ Remove unnecessary plugins
✅ Optimize code
✅ Use cache
✅ Reduce resource usage
```

## 🚨 Common Issues

### Issue: Plugin won't install

**Solution:**
1. Check file permissions
2. Check disk space
3. Check PHP errors
4. Check logs

### Issue: Plugin won't activate

**Solution:**
1. Check PHP errors
2. Check dependencies
3. Check conflicts with other plugins
4. Check PHP version

### Issue: Plugin not working

**Solution:**
1. Check settings
2. Check code
3. Check JavaScript errors
4. Check browser console
```