# Configuration

This section covers all settings available in the **AI Plugin Builder** plugin.

## ⚙️ Settings Page

### Accessing Settings

```
WordPress > AI Plugin Builder > Settings
```

### Settings Sections

```
┌─────────────────────────────────────────┐
│  AI Plugin Builder Settings             │
├─────────────────────────────────────────┤
│                                         │
│  [General] [API] [Security] [Advanced]  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ General Settings                   │  │
│  │                                    │  │
│  │ [Various settings]                │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🔧 General Settings

### Enable Plugin

```php
// Enable/disable plugin
Enable AI Plugin Builder: [✓] Enabled
```

### Interface Language

```php
// Language selection
Interface Language: 
[Dropdown: Persian | English | ...]
```

### Display Notifications

```php
// Show success notifications
Show Success Notifications: [✓] Enabled

// Show error notifications
Show Error Notifications: [✓] Enabled
```

### Chat History Storage

```php
// Auto-save chat history
Auto-save Chat History: [✓] Enabled

// History retention days
History Retention Days: [30]
```

## 🤖 API Settings

### Provider Selection

```php
// AI service selection
AI Provider: 
[Dropdown: OpenAI | Anthropic | Custom]

// API Key
API Key: [________________]

// Model
Model: 
[Dropdown: gpt-4-turbo | gpt-3.5-turbo | claude-3-opus | ...]
```

### OpenAI Settings

```php
// API Key
OpenAI API Key: [sk-...]

// Model
Model: [gpt-4-turbo-preview]

// Temperature (0-2)
Temperature: [0.7]

// Max Tokens
Max Tokens: [2000]

// Timeout (seconds)
Timeout: [60]
```

### Anthropic Settings

```php
// API Key
Anthropic API Key: [sk-ant-...]

// Model
Model: [claude-3-opus-20240229]

// Max Tokens
Max Tokens: [4096]

// Timeout (seconds)
Timeout: [60]
```

### Custom Provider Settings

```php
// API Endpoint
Custom API Endpoint: [https://api.example.com/v1/chat]

// API Key
Custom API Key: [________________]

// Headers (JSON)
Custom Headers: 
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {api_key}"
}

// Request Format (JSON)
Request Format: 
{
  "prompt": "{user_request}",
  "context": "{context}"
}
```

### Usage Limits

```php
// Daily request limit
Daily Request Limit: [100]

// Maximum message length
Max Message Length: [2000]

// Response timeout (seconds)
Response Timeout: [60]
```

## 🔒 Security Settings

### Security Checks

```php
// Security check for code before installation
Security Check: [✓] Enabled

// SQL Injection check
Check SQL Injection: [✓] Enabled

// XSS check
Check XSS: [✓] Enabled

// CSRF check
Check CSRF: [✓] Enabled

// File Inclusion check
Check File Inclusion: [✓] Enabled
```

### Approval Requirements

```php
// Require approval before installation
Require Approval Before Install: [ ] Disabled

// Require approval for complex plugins
Require Approval for Complex Plugins: [✓] Enabled
```

### Access Restrictions

```php
// Admin only usage
Admin Only: [✓] Enabled

// IP Whitelist
Allowed IPs: 
[192.168.1.1
10.0.0.1
...]

// Rate Limiting
Enable Rate Limiting: [✓] Enabled
Rate Limit: [100] requests per day
```

## 🎨 UI Settings

### Chat Settings

```php
// Show suggestions
Show Suggestions: [✓] Enabled

// Show chat history
Show Chat History: [✓] Enabled

// Show typing indicator
Show Typing Indicator: [✓] Enabled

// Sound notifications
Sound Notifications: [ ] Disabled
```

### Theme

```php
// Theme selection
Theme: 
[Dropdown: Light | Dark | Auto]

// Primary color
Primary Color: [#0073aa]

// Font family
Font Family: [Arial, sans-serif]
```

## 📦 Plugin Settings

### Storage Path

```php
// Generated plugins storage path
Plugin Storage Path: 
[wp-content/plugins/generated-plugins/]
```

### Defaults

```php
// Auto install after generation
Auto Install After Generation: [ ] Disabled

// Auto activate after install
Auto Activate After Install: [ ] Disabled

// Default version
Default Version: [1.0.0]

// Default author
Default Author: [AI Plugin Builder]
```

### Naming

```php
// Plugin name pattern
Plugin Name Pattern: 
[{user_request}]

// Plugin slug pattern
Plugin Slug Pattern: 
[{sanitized_name}]
```

## 🔍 Validation Settings

### WordPress Standards Check

```php
// Check WordPress standards
Check WordPress Standards: [✓] Enabled

// Check wp_enqueue_script usage
Check Script Enqueuing: [✓] Enabled

// Check wp_enqueue_style usage
Check Style Enqueuing: [✓] Enabled

// Check Nonce usage
Check Nonce Usage: [✓] Enabled
```

### Syntax Checking

```php
// Check PHP syntax
Check PHP Syntax: [✓] Enabled

// Check JavaScript syntax
Check JavaScript Syntax: [✓] Enabled

// Check CSS syntax
Check CSS Syntax: [✓] Enabled
```

## 📊 Logging Settings

### Enable Logging

```php
// Enable logging
Enable Logging: [✓] Enabled

// Log level
Log Level: 
[Dropdown: Error | Warning | Info | Debug]

// Log file path
Log File Path: 
[wp-content/uploads/ai-plugin-builder.log]
```

### Log Types

```php
// Log API requests
Log API Requests: [✓] Enabled

// Log plugin generation
Log Plugin Generation: [✓] Enabled

// Log plugin installation
Log Plugin Installation: [✓] Enabled

// Log errors
Log Errors: [✓] Enabled
```

## 💾 Backup Settings

### Auto Backup

```php
// Enable auto backup
Auto Backup: [✓] Enabled

// Backup frequency
Backup Frequency: 
[Dropdown: Daily | Weekly | Monthly]

// Number of backup versions to keep
Keep Backup Versions: [5]

// Backup storage path
Backup Storage Path: 
[wp-content/uploads/ai-plugin-builder-backups/]
```

### Manual Backup

```php
// Manual backup option
Manual Backup: [✓] Enabled

// Include files
Include Files: [✓] Enabled

// Include database
Include Database: [✓] Enabled
```

## 🚀 Performance Settings

### Cache

```php
// Enable cache
Enable Cache: [✓] Enabled

// Cache duration (seconds)
Cache Duration: [3600]

// Cache AI responses
Cache AI Responses: [✓] Enabled
```

### Optimization

```php
// Use background processing
Use Background Processing: [✓] Enabled

// Number of threads
Number of Threads: [2]

// Background job timeout
Background Job Timeout: [300]
```

## 🔔 Notification Settings

### Email Notifications

```php
// Send email on success
Email on Success: [ ] Disabled

// Send email on error
Email on Error: [✓] Enabled

// Email address
Email Address: [admin@example.com]
```

### In-site Notifications

```php
// Show admin panel notifications
Show Admin Notifications: [✓] Enabled

// Show user notifications
Show User Notifications: [ ] Disabled
```

## 🌐 Multilingual Settings

### Language Support

```php
// Enable multilingual
Enable Multilingual: [✓] Enabled

// Default language
Default Language: [fa_IR]

// Supported languages
Supported Languages: 
[✓] Persian
[✓] English
[ ] Arabic
[ ] ...
```

## 📝 Advanced Settings

### Developer Settings

```php
// Debug mode
Debug Mode: [ ] Disabled

// Show errors
Show Errors: [ ] Disabled

// Show query log
Show Query Log: [ ] Disabled
```

### Custom Settings

```php
// Custom CSS code
Custom CSS: 
[________________]

// Custom JavaScript code
Custom JavaScript: 
[________________]
```

## 💾 Save Settings

### Auto-save

```php
// Auto-save settings
Auto-save Settings: [✓] Enabled
```

### Reset Settings

```php
// Reset to default settings
Reset to Defaults: [Button]
```

## 🔄 Update Settings

### Update Checks

```php
// Auto-check for updates
Auto-check Updates: [✓] Enabled

// Auto-install updates
Auto-install Updates: [ ] Disabled
```

## 📋 Settings Export/Import

### Export

```php
// Export settings
Export Settings: [Button]

// Export format
Export Format: [JSON | XML]
```

### Import

```php
// Import settings
Import Settings: [Choose File] [Import]

// Import format
Import Format: [JSON | XML]
```