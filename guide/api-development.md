# API و توسعه

این بخش به بررسی API ها و امکانات توسعه برای افزونه **AI Plugin Builder** می‌پردازد.

## 🔌 REST API

### پایه URL

```
/wp-json/ai-plugin-builder/v1/
```

### احراز هویت

تمام درخواست‌ها نیاز به احراز هویت دارند:

```php
// استفاده از Application Password
Authorization: Basic base64(username:password)

// یا استفاده از Cookie
// (برای درخواست‌های از مرورگر)
```

## 📡 Endpoints

### دریافت لیست افزونه‌ها

```http
GET /wp-json/ai-plugin-builder/v1/plugins
```

**پارامترها:**
- `status` (string): فیلتر بر اساس وضعیت (active, inactive, all)
- `per_page` (int): تعداد نتایج در هر صفحه
- `page` (int): شماره صفحه
- `search` (string): جستجو در نام و توضیحات

**مثال درخواست:**
```bash
curl -X GET "https://example.com/wp-json/ai-plugin-builder/v1/plugins?status=active&per_page=10" \
  -H "Authorization: Basic base64(username:password)"
```

**پاسخ:**
```json
{
  "plugins": [
    {
      "id": 1,
      "slug": "recent-posts-widget",
      "name": "آخرین پست‌ها",
      "description": "نمایش آخرین پست‌ها در سایدبار",
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

### دریافت اطلاعات افزونه

```http
GET /wp-json/ai-plugin-builder/v1/plugins/{slug}
```

**مثال:**
```bash
curl -X GET "https://example.com/wp-json/ai-plugin-builder/v1/plugins/recent-posts-widget" \
  -H "Authorization: Basic base64(username:password)"
```

**پاسخ:**
```json
{
  "id": 1,
  "slug": "recent-posts-widget",
  "name": "آخرین پست‌ها",
  "description": "نمایش آخرین پست‌ها در سایدبار",
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

### ساخت افزونه جدید

```http
POST /wp-json/ai-plugin-builder/v1/plugins
```

**بدنه درخواست:**
```json
{
  "request": "افزونه نمایش آخرین پست‌ها",
  "options": {
    "auto_install": true,
    "auto_activate": false
  }
}
```

**پاسخ:**
```json
{
  "success": true,
  "plugin": {
    "slug": "recent-posts-widget",
    "name": "آخرین پست‌ها",
    "status": "installed"
  },
  "message": "افزونه با موفقیت ساخته و نصب شد"
}
```

### نصب افزونه

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/install
```

**پاسخ:**
```json
{
  "success": true,
  "message": "افزونه با موفقیت نصب شد"
}
```

### فعال‌سازی افزونه

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/activate
```

**پاسخ:**
```json
{
  "success": true,
  "message": "افزونه با موفقیت فعال شد"
}
```

### غیرفعال‌سازی افزونه

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/deactivate
```

### حذف افزونه

```http
DELETE /wp-json/ai-plugin-builder/v1/plugins/{slug}
```

**پارامترها:**
- `delete_files` (bool): حذف فایل‌ها (پیش‌فرض: true)
- `delete_data` (bool): حذف داده‌های دیتابیس (پیش‌فرض: false)

### دریافت کد افزونه

```http
GET /wp-json/ai-plugin-builder/v1/plugins/{slug}/code
```

**پارامترها:**
- `file` (string): نام فایل خاص (اختیاری)

**پاسخ:**
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

### به‌روزرسانی افزونه

```http
POST /wp-json/ai-plugin-builder/v1/plugins/{slug}/update
```

**بدنه درخواست:**
```json
{
  "request": "تعداد پست‌ها را به 10 تغییر بده",
  "version": "1.1.0"
}
```

## 🎣 Hooks و Filters

### Actions

#### قبل از تولید افزونه

```php
do_action('ai_plugin_builder_before_generate', $request, $context);
```

**استفاده:**
```php
add_action('ai_plugin_builder_before_generate', function($request, $context) {
    // کدهای قبل از تولید
    error_log('Generating plugin: ' . $request);
}, 10, 2);
```

#### بعد از تولید افزونه

```php
do_action('ai_plugin_builder_after_generate', $plugin_data, $response);
```

#### قبل از نصب

```php
do_action('ai_plugin_builder_before_install', $plugin_slug, $plugin_data);
```

#### بعد از نصب

```php
do_action('ai_plugin_builder_after_install', $plugin_slug, $plugin_data);
```

### Filters

#### فیلتر درخواست AI

```php
$request = apply_filters('ai_plugin_builder_request', $user_request, $context);
```

**استفاده:**
```php
add_filter('ai_plugin_builder_request', function($request, $context) {
    // اضافه کردن پیش‌متن
    return "Create a WordPress plugin that: " . $request;
}, 10, 2);
```

#### فیلتر پاسخ AI

```php
$response = apply_filters('ai_plugin_builder_response', $ai_response, $request);
```

#### فیلتر کد تولید شده

```php
$code = apply_filters('ai_plugin_builder_generated_code', $code, $plugin_slug);
```

**استفاده:**
```php
add_filter('ai_plugin_builder_generated_code', function($code, $plugin_slug) {
    // اضافه کردن header اضافی
    $header = "/**\n * Generated by AI Plugin Builder\n */\n";
    return $header . $code;
}, 10, 2);
```

#### فیلتر تنظیمات افزونه

```php
$settings = apply_filters('ai_plugin_builder_plugin_settings', $default_settings);
```

## 🔧 توابع کمکی

### بررسی وجود افزونه

```php
function ai_plugin_builder_plugin_exists($slug) {
    return AI_Plugin_Builder::get_instance()->plugin_exists($slug);
}
```

### دریافت اطلاعات افزونه

```php
function ai_plugin_builder_get_plugin($slug) {
    return AI_Plugin_Builder::get_instance()->get_plugin($slug);
}
```

### دریافت لیست افزونه‌ها

```php
function ai_plugin_builder_get_plugins($args = array()) {
    return AI_Plugin_Builder::get_instance()->get_plugins($args);
}
```

### تولید افزونه

```php
function ai_plugin_builder_generate_plugin($request, $options = array()) {
    return AI_Plugin_Builder::get_instance()->generate_plugin($request, $options);
}
```

## 📦 توسعه افزونه‌های سفارشی

### ساخت افزونه برای AI Plugin Builder

```php
<?php
/**
 * Plugin Name: AI Plugin Builder Extension
 * Description: افزونه توسعه برای AI Plugin Builder
 */

// افزودن فیلتر سفارشی
add_filter('ai_plugin_builder_request', function($request) {
    // تغییر درخواست
    return $request;
});

// افزودن Action سفارشی
add_action('ai_plugin_builder_after_generate', function($plugin_data) {
    // انجام عملیات بعد از تولید
});
```

### اضافه کردن Provider جدید

```php
class Custom_AI_Provider {
    public function send_request($prompt) {
        // ارسال درخواست به API سفارشی
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

// ثبت Provider
add_filter('ai_plugin_builder_providers', function($providers) {
    $providers['custom'] = new Custom_AI_Provider();
    return $providers;
});
```

## 🧪 تست API

### استفاده از Postman

```
1. ایجاد Collection جدید
2. تنظیم Base URL
3. افزودن Authorization Header
4. تست Endpoints مختلف
```

### استفاده از cURL

```bash
# دریافت لیست افزونه‌ها
curl -X GET "https://example.com/wp-json/ai-plugin-builder/v1/plugins" \
  -H "Authorization: Basic base64(username:password)"

# ساخت افزونه جدید
curl -X POST "https://example.com/wp-json/ai-plugin-builder/v1/plugins" \
  -H "Authorization: Basic base64(username:password)" \
  -H "Content-Type: application/json" \
  -d '{"request": "افزونه نمایش تاریخ"}'
```

### استفاده از JavaScript

```javascript
// دریافت لیست افزونه‌ها
fetch('/wp-json/ai-plugin-builder/v1/plugins', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
    }
})
.then(response => response.json())
.then(data => console.log(data));

// ساخت افزونه جدید
fetch('/wp-json/ai-plugin-builder/v1/plugins', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        request: 'افزونه نمایش تاریخ'
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔐 امنیت API

### بررسی دسترسی

```php
// بررسی Capability
if (!current_user_can('manage_options')) {
    return new WP_Error('forbidden', 'دسترسی ندارید', array('status' => 403));
}

// بررسی Nonce
if (!wp_verify_nonce($_REQUEST['_wpnonce'], 'ai_plugin_builder_action')) {
    return new WP_Error('invalid_nonce', 'Nonce نامعتبر', array('status' => 403));
}
```

### Rate Limiting

```php
// محدودیت تعداد درخواست
$rate_limit = apply_filters('ai_plugin_builder_rate_limit', 100); // درخواست در روز
```

### Sanitization

```php
// پاکسازی ورودی‌ها
$request = sanitize_text_field($_POST['request']);
$slug = sanitize_title($_POST['slug']);
```

## 📊 لاگ‌گیری

### فعال‌سازی لاگ

```php
// در wp-config.php
define('AI_PLUGIN_BUILDER_DEBUG', true);
```

### استفاده از Logger

```php
AI_Plugin_Builder_Logger::log('info', 'Plugin generated', array(
    'slug' => $plugin_slug,
    'user' => get_current_user_id()
));
```

## 🎯 مثال‌های کاربردی

### ساخت افزونه از طریق API

```php
$response = wp_remote_post('https://example.com/wp-json/ai-plugin-builder/v1/plugins', array(
    'headers' => array(
        'Authorization' => 'Basic ' . base64_encode($username . ':' . $password),
        'Content-Type' => 'application/json'
    ),
    'body' => json_encode(array(
        'request' => 'افزونه نمایش آخرین پست‌ها',
        'options' => array(
            'auto_install' => true,
            'auto_activate' => false
        )
    ))
));

$result = json_decode(wp_remote_retrieve_body($response));
if ($result->success) {
    echo 'افزونه ساخته شد: ' . $result->plugin->slug;
}
```

### دریافت و استفاده از کد افزونه

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

