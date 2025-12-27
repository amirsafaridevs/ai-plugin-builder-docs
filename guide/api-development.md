# API and Development

This section covers the APIs and development features of the **AI Plugin Builder** plugin.

## 🔌 REST API

### Base URL

```
/wp-json/ai-plugin-builder/v1/
```

### Authentication

All requests require authentication:

```php
// Using Application Password
Authorization: Basic base64(username:password)

// Or using Cookie
// (for browser requests)
```

## 📡 Endpoints

### Get Plugin List

```http
GET /wp-json/ai-plugin-builder/v1/plugins
```

**Parameters:**
- `status` (string): Filter by status (active, inactive, all)
- `per_page` (int): Number of results per page
- `page` (int): Page number
- `search` (string): Search in name and description

**Example request:**
```bash
curl -X GET "https://example.com/wp-json/ai-plugin-builder/v1/plugins?status=active&per_page=10" \
  -H "Authorization: Basic base64(username:password)"
```

**Response:**
```json
{
  "plugins": [
    {
      "id": 1,
      "slug": "recent-posts-widget",
      "name": "Recent Posts",
      "description": "Display recent posts in sidebar",
      "version": "1.0.0",
      "status": "active",
      "created_at": "2024-01-15T10:30:00",
      "updated_at": "2024-01-20T15:45:00"
    }
  ],
  "total": 25,
  "pages": 3
}
```

### Get Plugin Information

```http
GET /wp-json/ai-plugin-builder/v1/plugins/{slug}
```

**Example:**
```bash
curl -X GET "https://example.com/wp-json/ai-plugin-builder/v1/plugins/recent-posts-widget" \
  -H "Authorization: Basic base64(username:password)"
```

**Response:**
```json
{
  "id": 1,
  "slug": "recent-posts-widget",
  "name": "Recent Posts",
  "description": "Display recent posts in sidebar",
  "version": "1.0.0",
  "status": "active",
  "file_path": "/wp-content/plugins/generated-plugins/recent-posts-widget",
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-20T15:45:00",
  "files": [
    {
      "path": "recent-posts-widget.php",
      "type": "main"
    },
    {
      "path": "includes/class-widget.php",
      "type": "class"
    }
  ]
}
```

### Create New Plugin

```http
POST /wp-json/ai-plugin-builder/v1/plugins
```

**Request body:**
```json
{
  "request": "Plugin to display recent posts",
  "options": {
    "auto_install": true,
    "auto_activate": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "plugin": {
    "slug": "recent-posts-widget",
    "name": "Recent Posts",
    "status": "installed"
  },
  "message": "Plugin created and installed successfully"
}
```

### Install Plugin

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/install
```

**Response:**
```json
{
  "success": true,
  "message": "Plugin installed successfully"
}
```

### Activate Plugin

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/activate
```

**Response:**
```json
{
  "success": true,
  "message": "Plugin activated successfully"
}
```

### Deactivate Plugin

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/deactivate
```

### Delete Plugin

```http
DELETE /wp-json/ai-plugin-builder/v1/plugins/{slug}
```

**Parameters:**
- `delete_files` (bool): Delete files (default: true)
- `delete_data` (bool): Delete database data (default: false)

### Get Plugin Code

```http
GET /wp-json/ai-plugin-builder/v1/plugins/{slug}/code
```

**Parameters:**
- `file` (string): Specific file name (optional)

**Response:**
```json
{
  "files": [
    {
      "path": "recent-posts-widget.php",
      "content": "<?php\n/**\n * Plugin Name: ..."
    }
  ]
}
```

### Update Plugin

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/update
```

**Request body:**
```json
{
  "request": "Change number of posts to 10",
  "version": "1.1.0"
}
```

## 🎣 Hooks and Filters

### Actions

#### Before Plugin Generation

```php
do_action('ai_plugin_builder_before_generate', $request, $context);
```

**Usage:**
```php
add_action('ai_plugin_builder_before_generate', function($request, $context) {
    // Code before generation
    error_log('Generating plugin: ' . $request);
}, 10, 2);
```

#### After Plugin Generation

```php
do_action('ai_plugin_builder_after_generate', $plugin_data, $response);
```

#### Before Installation

```php
do_action('ai_plugin_builder_before_install', $plugin_slug, $plugin_data);
```

#### After Installation

```php
do_action('ai_plugin_builder_after_install', $plugin_slug, $plugin_data);
```

### Filters

#### AI Request Filter

```php
$request = apply_filters('ai_plugin_builder_request', $user_request, $context);
```

**Usage:**
```php
add_filter('ai_plugin_builder_request', function($request, $context) {
    // Add prefix
    return "Create a WordPress plugin that: " . $request;
}, 10, 2);
```

#### AI Response Filter

```php
$response = apply_filters('ai_plugin_builder_response', $ai_response, $request);
```

#### Generated Code Filter

```php
$code = apply_filters('ai_plugin_builder_generated_code', $code, $plugin_slug);
```

**Usage:**
```php
add_filter('ai_plugin_builder_generated_code', function($code, $plugin_slug) {
    // Add extra header
    $header = "/**\n * Generated by AI Plugin Builder\n */\n";
    return $header . $code;
}, 10, 2);
```

#### Plugin Settings Filter

```php
$settings = apply_filters('ai_plugin_builder_plugin_settings', $default_settings);
```

## 🔧 Helper Functions

### Check Plugin Existence

```php
function ai_plugin_builder_plugin_exists($slug) {
    return AI_Plugin_Builder::get_instance()->plugin_exists($slug);
}
```

### Get Plugin Information

```php
function ai_plugin_builder_get_plugin($slug) {
    return AI_Plugin_Builder::get_instance()->get_plugin($slug);
}
```

### Get Plugin List

```php
function ai_plugin_builder_get_plugins($args = array()) {
    return AI_Plugin_Builder::get_instance()->get_plugins($args);
}
```

### Generate Plugin

```php
function ai_plugin_builder_generate_plugin($request, $options = array()) {
    return AI_Plugin_Builder::get_instance()->generate_plugin($request, $options);
}
```

## 📦 Custom Plugin Development

### Creating an Extension for AI Plugin Builder

```php
<?php
/**
 * Plugin Name: AI Plugin Builder Extension
 * Description: Extension plugin for AI Plugin Builder
 */

// Add custom filter
add_filter('ai_plugin_builder_request', function($request) {
    // Modify request
    return $request;
});

// Add custom action
add_action('ai_plugin_builder_after_generate', function($plugin_data) {
    // Perform post-generation operations
});
```

### Adding New Provider

```php
class Custom_AI_Provider {
    public function send_request($prompt) {
        // Send request to custom API
        $response = wp_remote_post('https://api.example.com/chat', array(
            'body' => json_encode(array(
                'prompt' => $prompt
            )),
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $api_key
            )
        ));
        
        return json_decode(wp_remote_retrieve_body($response));
    }
}

// Register Provider
add_filter('ai_plugin_builder_providers', function($providers) {
    $providers['custom'] = new Custom_AI_Provider();
    return $providers;
});
```

## 🧪 API Testing

### Using Postman

```
1. Create new Collection
2. Set Base URL
3. Add Authorization Header
4. Test various Endpoints
```

### Using cURL

```bash
# Get plugin list
curl -X GET "https://example.com/wp-json/ai-plugin-builder/v1/plugins" \
  -H "Authorization: Basic base64(username:password)"

# Create new plugin
curl -X POST "https://example.com/wp-json/ai-plugin-builder/v1/plugins" \
  -H "Authorization: Basic base64(username:password)" \
  -H "Content-Type: application/json" \
  -d '{"request": "Date display plugin"}'
```

### Using JavaScript

```javascript
// Get plugin list
fetch('/wp-json/ai-plugin-builder/v1/plugins', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
    }
})
.then(response => response.json())
.then(data => console.log(data));

// Create new plugin
fetch('/wp-json/ai-plugin-builder/v1/plugins', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        request: 'Date display plugin'
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔐 API Security

### Access Check

```php
// Check capability
if (!current_user_can('manage_options')) {
    return new WP_Error('forbidden', 'Access denied', array('status' => 403));
}

// Check Nonce
if (!wp_verify_nonce($_REQUEST['_wpnonce'], 'ai_plugin_builder_action')) {
    return new WP_Error('invalid_nonce', 'Invalid nonce', array('status' => 403));
}
```

### Rate Limiting

```php
// Request rate limit
$rate_limit = apply_filters('ai_plugin_builder_rate_limit', 100); // requests per day
```

### Sanitization

```php
// Sanitize inputs
$request = sanitize_text_field($_POST['request']);
$slug = sanitize_title($_POST['slug']);
```

## 📊 Logging

### Enable Logging

```php
// In wp-config.php
define('AI_PLUGIN_BUILDER_DEBUG', true);
```

### Using Logger

```php
AI_Plugin_Builder_Logger::log('info', 'Plugin generated', array(
    'slug' => $plugin_slug,
    'user' => get_current_user_id()
));
```

## 🎯 Practical Examples

### Create Plugin via API

```php
$response = wp_remote_post('https://example.com/wp-json/ai-plugin-builder/v1/plugins', array(
    'headers' => array(
        'Authorization' => 'Basic ' . base64_encode($username . ':' . $password),
        'Content-Type' => 'application/json'
    ),
    'body' => json_encode(array(
        'request' => 'Recent posts display plugin',
        'options' => array(
            'auto_install' => true,
            'auto_activate' => false
        )
    ))
));

$result = json_decode(wp_remote_retrieve_body($response));
if ($result->success) {
    echo 'Plugin created: ' . $result->plugin->slug;
}
```

### Get and Use Plugin Code

```php
$response = wp_remote_get('https://example.com/wp-json/ai-plugin-builder/v1/plugins/recent-posts-widget/code', array(
    'headers' => array(
        'Authorization' => 'Basic ' . base64_encode($username . ':' . $password)
    )
));

$data = json_decode(wp_remote_retrieve_body($response));
foreach ($data->files as $file) {
    echo "File: " . $file->path . "\n";
    echo "Content: " . substr($file->content, 0, 100) . "...\n";
}
```