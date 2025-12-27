# امنیت

این بخش به بررسی نکات امنیتی و بهترین روش‌های امنیتی برای افزونه **AI Plugin Builder** می‌پردازد.

## 🔒 لایه‌های امنیتی

### 1. احراز هویت و مجوز

#### بررسی Capability

```php
// فقط ادمین می‌تواند از افزونه استفاده کند
if (!current_user_can('manage_options')) {
    wp_die(__('شما دسترسی لازم را ندارید.'));
}
```

#### بررسی Nonce

```php
// بررسی Nonce برای درخواست‌ها
if (!isset($_POST['_wpnonce']) || !wp_verify_nonce($_POST['_wpnonce'], 'ai_plugin_builder_action')) {
    wp_die(__('درخواست نامعتبر است.'));
}
```

### 2. پاکسازی ورودی‌ها

#### Sanitization

```php
// پاکسازی متن
$text = sanitize_text_field($_POST['text']);

// پاکسازی ایمیل
$email = sanitize_email($_POST['email']);

// پاکسازی URL
$url = esc_url_raw($_POST['url']);

// پاکسازی عدد
$number = absint($_POST['number']);

// پاکسازی متن کامل
$content = wp_kses_post($_POST['content']);
```

#### Validation

```php
// بررسی صحت ایمیل
if (!is_email($email)) {
    wp_die(__('ایمیل نامعتبر است.'));
}

// بررسی محدوده عدد
if ($number < 1 || $number > 100) {
    wp_die(__('عدد خارج از محدوده مجاز است.'));
}
```

### 3. فرار از خروجی‌ها

#### Escaping

```php
// فرار از HTML
echo esc_html($text);

// فرار از Attribute
echo '<input value="' . esc_attr($value) . '">';

// فرار از URL
echo '<a href="' . esc_url($url) . '">';

// فرار از JavaScript
echo '<script>var data = ' . wp_json_encode($data) . ';</script>';

// فرار از Textarea
echo '<textarea>' . esc_textarea($content) . '</textarea>';
```

## 🛡️ بررسی امنیتی کدهای تولید شده

### بررسی SQL Injection

```php
// ❌ بد
$query = "SELECT * FROM posts WHERE id = " . $_GET['id'];

// ✅ خوب
$query = $wpdb->prepare("SELECT * FROM posts WHERE id = %d", $_GET['id']);

// بررسی کد تولید شده
if (preg_match('/\$_(GET|POST|REQUEST)\[.*\]\s*\)/', $code)) {
    // نیاز به استفاده از prepare
    $errors[] = 'SQL Injection risk detected';
}
```

### بررسی XSS

```php
// ❌ بد
echo $_GET['message'];

// ✅ خوب
echo esc_html($_GET['message']);

// بررسی کد تولید شده
if (preg_match('/echo\s+\$_(GET|POST|REQUEST)/', $code)) {
    // نیاز به escape
    $errors[] = 'XSS risk detected';
}
```

### بررسی CSRF

```php
// بررسی Nonce در فرم‌ها
if (!wp_verify_nonce($_POST['_wpnonce'], 'action_name')) {
    wp_die(__('درخواست نامعتبر است.'));
}

// بررسی کد تولید شده
if (preg_match('/admin_post/', $code) && !preg_match('/wp_verify_nonce/', $code)) {
    $errors[] = 'CSRF protection missing';
}
```

### بررسی File Inclusion

```php
// ❌ بد
include $_GET['file'];

// ✅ خوب
$allowed_files = array('file1.php', 'file2.php');
if (in_array($_GET['file'], $allowed_files)) {
    include $_GET['file'];
}

// بررسی کد تولید شده
if (preg_match('/include.*\$_(GET|POST|REQUEST)/', $code)) {
    $errors[] = 'File Inclusion risk detected';
}
```

### بررسی Command Injection

```php
// ❌ بد
exec($_GET['command']);

// ✅ خوب
$allowed_commands = array('ls', 'pwd');
if (in_array($_GET['command'], $allowed_commands)) {
    exec(escapeshellcmd($_GET['command']));
}

// بررسی کد تولید شده
if (preg_match('/(exec|system|shell_exec|passthru).*\$_(GET|POST|REQUEST)/', $code)) {
    $errors[] = 'Command Injection risk detected';
}
```

## 🔐 امنیت API

### Rate Limiting

```php
class Rate_Limiter {
    private $limit = 100; // درخواست در روز
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
    wp_die(__('دسترسی از این IP مجاز نیست.'));
}
```

### API Key Validation

```php
function validate_api_key($api_key) {
    // بررسی فرمت
    if (!preg_match('/^[a-zA-Z0-9]{32,}$/', $api_key)) {
        return false;
    }
    
    // بررسی در دیتابیس
    $stored_key = get_option('ai_plugin_builder_api_key');
    return hash_equals($stored_key, $api_key);
}
```

## 🔒 امنیت فایل‌ها

### بررسی دسترسی‌های فایل

```php
// بررسی دسترسی نوشتن
if (!is_writable($plugin_dir)) {
    wp_die(__('دسترسی نوشتن وجود ندارد.'));
}

// بررسی دسترسی خواندن
if (!is_readable($plugin_file)) {
    wp_die(__('دسترسی خواندن وجود ندارد.'));
}
```

### بررسی مسیر فایل

```php
// جلوگیری از Directory Traversal
$file = sanitize_file_name($_GET['file']);
$plugin_dir = realpath(plugin_dir_path(__FILE__));
$file_path = realpath($plugin_dir . '/' . $file);

if (strpos($file_path, $plugin_dir) !== 0) {
    wp_die(__('دسترسی غیرمجاز به فایل.'));
}
```

### بررسی نوع فایل

```php
$allowed_types = array('php', 'js', 'css');
$file_ext = pathinfo($file, PATHINFO_EXTENSION);

if (!in_array($file_ext, $allowed_types)) {
    wp_die(__('نوع فایل مجاز نیست.'));
}
```

## 🛡️ امنیت دیتابیس

### استفاده از Prepared Statements

```php
// ❌ بد
$wpdb->query("SELECT * FROM table WHERE id = " . $id);

// ✅ خوب
$wpdb->prepare("SELECT * FROM table WHERE id = %d", $id);

// برای چندین پارامتر
$wpdb->prepare(
    "SELECT * FROM table WHERE name = %s AND age = %d",
    $name,
    $age
);
```

### Escaping در Queries

```php
// برای LIKE
$wpdb->prepare(
    "SELECT * FROM table WHERE name LIKE %s",
    '%' . $wpdb->esc_like($search) . '%'
);
```

### بررسی دسترسی دیتابیس

```php
// بررسی Capability قبل از Query
if (!current_user_can('manage_options')) {
    return;
}

// استفاده از $wpdb->prefix برای جلوگیری از SQL Injection
$table_name = $wpdb->prefix . 'custom_table';
```

## 🔐 امنیت Session

### استفاده از WordPress Nonces

```php
// ایجاد Nonce
$nonce = wp_create_nonce('action_name');

// بررسی Nonce
if (!wp_verify_nonce($_POST['nonce'], 'action_name')) {
    wp_die(__('درخواست نامعتبر است.'));
}

// در فرم‌ها
wp_nonce_field('action_name', 'nonce_field');
```

### جلوگیری از Session Fixation

```php
// WordPress به صورت خودکار این کار را انجام می‌دهد
// اما می‌توانید بررسی کنید
if (session_status() === PHP_SESSION_ACTIVE) {
    session_regenerate_id(true);
}
```

## 🚨 مدیریت خطاها

### لاگ‌گیری امن

```php
// ❌ بد - نمایش اطلاعات حساس
error_log('API Key: ' . $api_key);

// ✅ خوب - لاگ بدون اطلاعات حساس
error_log('API request failed for user: ' . get_current_user_id());
```

### نمایش خطاها

```php
// در محیط Production
if (WP_DEBUG) {
    echo $error_message;
} else {
    echo __('خطایی رخ داده است. لطفاً با مدیر تماس بگیرید.');
}
```

## 🔍 بررسی امنیتی منظم

### اسکن خودکار

```php
class Security_Scanner {
    public function scan_plugin($plugin_slug) {
        $issues = array();
        
        // بررسی SQL Injection
        $issues = array_merge($issues, $this->check_sql_injection($plugin_slug));
        
        // بررسی XSS
        $issues = array_merge($issues, $this->check_xss($plugin_slug));
        
        // بررسی CSRF
        $issues = array_merge($issues, $this->check_csrf($plugin_slug));
        
        // بررسی File Inclusion
        $issues = array_merge($issues, $this->check_file_inclusion($plugin_slug));
        
        return $issues;
    }
}
```

### گزارش امنیتی

```php
// ارسال گزارش به ادمین
function send_security_report($issues) {
    $admin_email = get_option('admin_email');
    $subject = 'گزارش امنیتی افزونه';
    $message = 'مشکلات امنیتی یافت شده:\n';
    
    foreach ($issues as $issue) {
        $message .= '- ' . $issue . '\n';
    }
    
    wp_mail($admin_email, $subject, $message);
}
```

## 📋 چک‌لیست امنیتی

### قبل از نصب افزونه

- [ ] بررسی SQL Injection
- [ ] بررسی XSS
- [ ] بررسی CSRF
- [ ] بررسی File Inclusion
- [ ] بررسی Command Injection
- [ ] بررسی دسترسی‌های فایل
- [ ] بررسی استفاده از Nonce
- [ ] بررسی Sanitization
- [ ] بررسی Escaping
- [ ] بررسی Rate Limiting

### تنظیمات امنیتی

- [ ] استفاده از HTTPS
- [ ] محدودیت دسترسی IP
- [ ] Rate Limiting فعال
- [ ] لاگ‌گیری فعال
- [ ] بررسی منظم امنیت
- [ ] به‌روزرسانی منظم

## 💡 بهترین روش‌ها

### 1. اصل کمترین دسترسی

```php
// فقط دسترسی‌های لازم را بدهید
if (!current_user_can('manage_options')) {
    return;
}
```

### 2. دفاع در عمق

```php
// چندین لایه امنیتی
// 1. بررسی Capability
// 2. بررسی Nonce
// 3. Sanitization
// 4. Validation
// 5. Escaping
```

### 3. به‌روزرسانی منظم

```php
// بررسی به‌روزرسانی‌های امنیتی
add_action('admin_init', function() {
    // بررسی به‌روزرسانی‌ها
});
```

### 4. استفاده از کتابخانه‌های امن

```php
// استفاده از توابع WordPress
// به جای توابع PHP خام
wp_remote_get() // به جای file_get_contents()
wp_safe_redirect() // به جای header('Location: ...')
```

