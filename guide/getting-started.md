# Getting Started

This guide walks you through installation and initial use of the **AI Plugin Builder** plugin.

## 📥 Plugin Installation

### Method 1: Install from WordPress Admin Panel

1. Go to **Plugins > Add New**
2. Click **Upload Plugin**
3. Select the plugin ZIP file
4. Click **Install Now**
5. After installation, click **Activate**

### Method 2: Manual Installation

```bash
# 1. Download the plugin
# 2. Extract the ZIP file
# 3. Upload the folder to wp-content/plugins/
# 4. Activate from the admin panel
```

### Method 3: Install via WP-CLI

```bash
wp plugin install ai-plugin-builder.zip --activate
```

## ⚙️ Initial Configuration

### 1. Access Settings Page

After activating the plugin, go to **AI Plugin Builder > Settings**.

### 2. Set Up API Key

The plugin requires an API key to work with AI:

#### Using OpenAI

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API Key
3. Enter the API Key in plugin settings

```php
// Example settings
API Provider: OpenAI
API Key: sk-...
Model: gpt-4-turbo-preview
```

#### Using Anthropic (Claude)

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an API Key
3. Enter the API Key in plugin settings

```php
// Example settings
API Provider: Anthropic
API Key: sk-ant-...
Model: claude-3-opus-20240229
```

### 3. Advanced Settings

#### Usage Limits

```php
// Daily request limit
Daily Request Limit: 100

// Maximum message length
Max Message Length: 2000

// Request timeout
Request Timeout: 60 seconds
```

#### Security Settings

```php
// Security code review
Security Check: Enabled

// WordPress standards check
WordPress Standards Check: Enabled

// Require approval before installation
Require Approval Before Install: Optional
```

## 🎯 Initial Use

### Step 1: Open Chat Interface

1. Go to **AI Plugin Builder > Create Plugin**
2. The chat interface will open automatically

### Step 2: Request a Plugin

In the chat box, describe your needs in simple language:

```
Example 1: "I want a plugin that displays today's date"

Example 2: "A plugin to show latest posts in the sidebar"

Example 3: "A task management plugin with add, edit, and delete capabilities"
```

### Step 3: Review and Confirm

The AI will:
1. Analyze your requirements
2. Suggest plugin structure
3. Generate code
4. Show the results

You can:
- ✅ Review code before installation
- ✏️ Request edits
- ❌ Reject the request

### Step 4: Install Plugin

After confirmation:
1. Plugin is automatically installed
2. Appears in the plugins list
3. You can activate/deactivate it

## 📝 Complete Example

### Scenario: Building a Date Display Plugin

**Step 1: Request**
```
User: "I want a plugin that displays today's date in Persian"
```

**Step 2: AI Response**
```
AI: "Building Persian date display plugin...
✅ Plugin successfully built!

Features:
- Display Persian (Solar) date
- Shortcode: [today_date]
- Widget for sidebar display
```

**Step 3: Code Review**
```php
<?php
/**
 * Plugin Name: Persian Date Display
 * Description: Display today's date in Persian
 * Version: 1.0.0
 */

// Generated code...
```

**Step 4: Installation**
```
✅ Plugin installed and activated!
You can use the shortcode [today_date].
```

## 🔧 Default Settings

After installation, these settings are enabled by default:

- ✅ Security code review
- ✅ WordPress standards compliance
- ✅ Chat history storage
- ✅ Code preview before installation
- ⚠️ Require approval before installation (optional)

## 🚨 Common Issues

### Issue: Invalid API Key

**Solution:**
1. Verify API Key correctness
2. Check API account balance
3. Check IP restrictions

### Issue: Plugin Not Being Created

**Solution:**
1. Check error logs
2. Increase timeout
3. Check server limitations

### Issue: Plugin Not Installing

**Solution:**
1. Check file permissions
2. Check disk space
3. Check PHP errors

## 📚 Next Steps

Now that you've installed and set up the plugin:

1. Study the **[System Architecture](/guide/architecture)**
2. Learn more about the **[Chat Interface](/guide/chat-interface)**
3. See **[Advanced Examples](/guide/advanced-examples)**

## 💡 Important Tips

::: tip Tip
Always test generated plugins in a staging environment before installing them in production.
:::

::: warning Warning
Regularly update generated plugins and check their security.
:::

::: danger Danger
Never expose your API key in code or public repositories.
:::