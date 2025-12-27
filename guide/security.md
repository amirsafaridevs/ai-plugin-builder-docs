# Security

This section covers security considerations and best practices for the **AI Plugin Builder** plugin.

## 🔒 Security Layers

### 1. Authentication and Authorization

#### Capability Check

```php
// Only admin can use the plugin
if (!current_user_can('manage_options')) {
    wp_die(__('You do not have the required permissions.'));
}
```

#### Nonce Check

```php
// Nonce validation for requests
if (!isset($_POST['_wpnonce']) || !wp_verify_nonce($_POST['_wpnonce'], 'ai_plugin_builder_action')) {
    wp_die(__('Invalid request.'));
}
```

### 2. Input Sanitization

#### Sanitization

```php
// Text sanitization
$text = sanitize_text_field($_POST['text']);

// Email sanitization
$email = sanitize_email($_POST['email']);

// URL sanitization
$url = esc_url_raw($_POST['url']);

// Number sanitization
$number = absint($_POST['number']);

// Full text sanitization
$content = wp_kses_post($_POST['content']);
```

#### Validation

```php
// Email validation
if (!is_email($email)) {
    wp_die(__('Invalid email.'));
}

// Number range validation
if ($number < 1 || $number > 100) {
    wp_die(__('Number is out of allowed range.'));
}
```

### 3. Output Escaping

#### Escaping

```php
// HTML escaping
echo esc_html($text);

// Attribute escaping
echo '<input value="' . esc_attr($value) . '">';

// URL escaping
echo '<a href="' . esc_url($url) . '">';

// JavaScript escaping
echo '<script>var data = ' . wp_json_encode($data) . ';</script>';

// Textarea escaping
echo '<textarea>' . esc_textarea($content) . '</textarea>';
```

## 🛡️ Generated Code Security Review

### SQL Injection Check

```php
// ❌ Bad
$query = "SELECT * FROM posts WHERE id = " . $_GET['id'];

// ✅ Good
$query = $wpdb->prepare("SELECT * FROM posts WHERE id = %d", $_GET['id']);

// Generated code check
if (preg_match('/\$_(GET|POST|REQUEST)\[.*\]\s*\)/', $code)) {
    // Need to use prepare
    $errors[] = 'SQL Injection risk detected';
}
```

### XSS Check

```php
// ❌ Bad
echo $_GET['message'];

// ✅ Good
echo esc_html($_GET['message']);

// Generated code check
if (preg_match('/echo\s+\$_(GET|POST|REQUEST)/', $code)) {
    // Need to escape
    $errors[] = 'XSS risk detected';
}
```

### CSRF Check

```php
// Nonce check in forms
if (!wp_verify_nonce($_POST['_wpnonce'], 'action_name')) {
    wp_die(__('Invalid request.'));
}

// Generated code check
if (preg_match('/admin_post/', $code) && !preg_match('/wp_verify_nonce/', $code)) {
    $errors[] = 'CSRF protection missing';
}
```

### File Inclusion Check

```php
// ❌ Bad
include $_GET['file'];

// ✅ Good
$allowed_files = array('file1.php', 'file2.php');
if (in_array($_GET['file'], $allowed_files)) {
    include $_GET['file'];
}

// Generated code check
if (preg_match('/include.*\$_(GET|POST|REQUEST)/', $code)) {
    $errors[] = 'File Inclusion risk detected';
}
```

### Command Injection Check

```php
// ❌ Bad
exec($_GET['command']);

// ✅ Good
$allowed_commands = array('ls', 'pwd');
if (in_array($_GET['command'], $allowed_commands)) {
    exec(escapeshellcmd($_GET['command']));
}

// Generated code check
if (preg_match('/(exec|system|shell_exec|passthru).*\$_(GET|POST|REQUEST)/', $code)) {
    $errors[] = 'Command Injection risk detected';
}
```

## 🔐 API Security

### Rate Limiting

```php
class Rate_Limiter {
    private $limit = 100; // requests per day
    private $window = DAY_IN_SECONDS;
    
    public function check_limit($user_id) {
        $key = 'ai_plugin_builder_requests_' . $user_id;
        $count = get_transient($key);
        
        if ($count === false) {
            set_transient($key, 1, $this->window);
            return true;
        }
        
        if ($count >= $this->limit) {
            return false;
        }
        
        set_transient($key, $count + 1, $this->window);
        return true;
    }
}
```

### IP Whitelisting

```php
$allowed_ips = array(
    '192.168.1.1',
    '10.0.0.1'
);

$user_ip = $_SERVER['REMOTE_ADDR'];
if (!in_array($user_ip, $allowed_ips)) {
    wp_die(__('Access from this IP is not allowed.'));
}
```

### API Key Validation

```php
function validate_api_key($api_key) {
    // Format check
    if (!preg_match('/^[a-zA-Z0-9]{32,}$/', $api_key)) {
        return false;
    }
    
    // Database check
    $stored_key = get_option('ai_plugin_builder_api_key');
    return hash_equals($stored_key, $api_key);
}
```

## 🔒 File Security

### File Permissions Check

```php
// Write permission check
if (!is_writable($plugin_dir)) {
    wp_die(__('Write permission not available.'));
}

// Read permission check
if (!is_readable($plugin_file)) {
    wp_die(__('Read permission not available.'));
}
```

### File Path Check

```php
// Prevent Directory Traversal
$file = sanitize_file_name($_GET['file']);
$plugin_dir = realpath(plugin_dir_path(__FILE__));
$file_path = realpath($plugin_dir . '/' . $file);

if (strpos($file_path, $plugin_dir) !== 0) {
    wp_die(__('Unauthorized file access.'));
}
```

### File Type Check

```php
$allowed_types = array('php', 'js', 'css');
$file_ext = pathinfo($file, PATHINFO_EXTENSION);

if (!in_array($file_ext, $allowed_types)) {
    wp_die(__('File type not allowed.'));
}
```

## 🛡️ Database Security

### Using Prepared Statements

```php
// ❌ Bad
$wpdb->query("SELECT * FROM table WHERE id = " . $id);

// ✅ Good
$wpdb->prepare("SELECT * FROM table WHERE id = %d", $id);

// For multiple parameters
$wpdb->prepare(
    "SELECT * FROM table WHERE name = %s AND age = %d",
    $name,
    $age
);
```

### Escaping in Queries

```php
// For LIKE
$wpdb->prepare(
    "SELECT * FROM table WHERE name LIKE %s",
    '%' . $wpdb->esc_like($search) . '%'
);
```

### Database Access Check

```php
// Capability check before Query
if (!current_user_can('manage_options')) {
    return;
}

// Use $wpdb->prefix to prevent SQL Injection
$table_name = $wpdb->prefix . 'custom_table';
```

## 🔐 Session Security

### Using WordPress Nonces

```php
// Create Nonce
$nonce = wp_create_nonce('action_name');

// Verify Nonce
if (!wp_verify_nonce($_POST['nonce'], 'action_name')) {
    wp_die(__('Invalid request.'));
}

// In forms
wp_nonce_field('action_name', 'nonce_field');
```

### Preventing Session Fixation

```php
// WordPress does this automatically
// but you can check
if (session_status() === PHP_SESSION_ACTIVE) {
    session_regenerate_id(true);
}
```

## 🚨 Error Management

### Secure Logging

```php
// ❌ Bad - exposing sensitive information
error_log('API Key: ' . $api_key);

// ✅ Good - log without sensitive information
error_log('API request failed for user: ' . get_current_user_id());
```

### Error Display

```php
// In Production environment
if (WP_DEBUG) {
    echo $error_message;
} else {
    echo __('An error occurred. Please contact the administrator.');
}
```

## 🔍 Regular Security Scanning

### Automatic Scan

```php
class Security_Scanner {
    public function scan_plugin($plugin_slug) {
        $issues = array();
        
        // SQL Injection check
        $issues = array_merge($issues, $this->check_sql_injection($plugin_slug));
        
        // XSS check
        $issues = array_merge($issues, $this->check_xss($plugin_slug));
        
        // CSRF check
        $issues = array_merge($issues, $this->check_csrf($plugin_slug));
        
        // File Inclusion check
        $issues = array_merge($issues, $this->check_file_inclusion($plugin_slug));
        
        return $issues;
    }
}
```

### Security Report

```php
// Send report to admin
function send_security_report($issues) {
    $admin_email = get_option('admin_email');
    $subject = 'Plugin Security Report';
    $message = 'Security issues found:\n';
    
    foreach ($issues as $issue) {
        $message .= '- ' . $issue . '\n';
    }
    
    wp_mail($admin_email, $subject, $message);
}
```

## 📋 Security Checklist

### Before Installing a Plugin

- [ ] SQL Injection check
- [ ] XSS check
- [ ] CSRF check
- [ ] File Inclusion check
- [ ] Command Injection check
- [ ] File permissions check
- [ ] Nonce usage check
- [ ] Sanitization check
- [ ] Escaping check
- [ ] Rate Limiting check

### Security Settings

- [ ] Use HTTPS
- [ ] IP access restriction
- [ ] Rate Limiting active
- [ ] Logging active
- [ ] Regular security checks
- [ ] Regular updates

## 💡 Best Practices

### 1. Principle of Least Privilege

```php
// Only give necessary permissions
if (!current_user_can('manage_options')) {
    return;
}
```

### 2. Defense in Depth

```php
// Multiple security layers
// 1. Capability check
// 2. Nonce check
// 3. Sanitization
// 4. Validation
// 5. Escaping
```

### 3. Regular Updates

```php
// Check for security updates
add_action('admin_init', function() {
    // Check for updates
});
```

### 4. Using Secure Libraries

```php
// Use WordPress functions
// instead of raw PHP functions
wp_remote_get() // instead of file_get_contents()
wp_safe_redirect() // instead of header('Location: ...')
```