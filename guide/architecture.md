# معماری سیستم

این بخش به بررسی معماری فنی و ساختار داخلی افزونه **AI Plugin Builder** می‌پردازد.

## 🏗️ نمای کلی معماری

```
┌─────────────────────────────────────────────────┐
│           WordPress Admin Panel                  │
│  ┌──────────────────────────────────────────┐   │
│  │      AI Plugin Builder Interface          │   │
│  │  ┌──────────────┐    ┌─────────────────┐  │   │
│  │  │ Chat UI      │    │ Plugin Manager  │  │   │
│  │  └──────────────┘    └─────────────────┘  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│         Core Plugin Components                   │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ Chat Handler │  │ Code Generator│           │
│  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ Validator    │  │ Installer    │           │
│  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│           External Services                     │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ AI API       │  │ File System  │           │
│  │ (OpenAI/     │  │ WordPress    │           │
│  │  Anthropic)  │  │ Database     │           │
│  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────┘
```

## 📁 ساختار فایل‌ها

```
ai-plugin-builder/
├── admin/
│   ├── class-admin.php          # مدیریت پنل ادمین
│   ├── class-chat-handler.php   # مدیریت رابط چت
│   ├── class-plugin-manager.php # مدیریت افزونه‌ها
│   ├── css/
│   │   └── admin.css            # استایل‌های ادمین
│   └── js/
│       └── admin.js             # اسکریپت‌های ادمین
├── includes/
│   ├── class-core.php           # کلاس اصلی
│   ├── class-api-client.php     # کلاینت API هوش مصنوعی
│   ├── class-code-generator.php # تولیدکننده کد
│   ├── class-validator.php      # اعتبارسنج کد
│   ├── class-installer.php      # نصب‌کننده افزونه
│   └── class-security.php       # بررسی‌های امنیتی
├── templates/
│   ├── chat-interface.php       # قالب رابط چت
│   └── plugin-list.php          # قالب لیست افزونه‌ها
├── generated-plugins/            # افزونه‌های تولید شده
│   └── {plugin-slug}/
│       ├── {plugin-slug}.php
│       ├── includes/
│       ├── assets/
│       └── ...
├── languages/                    # فایل‌های ترجمه
├── ai-plugin-builder.php        # فایل اصلی افزونه
└── uninstall.php                # فایل حذف افزونه
```

## 🔧 کامپوننت‌های اصلی

### 1. Core Plugin Class

کلاس اصلی که تمام کامپوننت‌ها را مدیریت می‌کند:

```php
class AI_Plugin_Builder {
    private $api_client;
    private $code_generator;
    private $validator;
    private $installer;
    
    public function __construct() {
        $this->load_dependencies();
        $this->init_hooks();
    }
    
    private function load_dependencies() {
        require_once plugin_dir_path(__FILE__) . 'includes/class-api-client.php';
        require_once plugin_dir_path(__FILE__) . 'includes/class-code-generator.php';
        require_once plugin_dir_path(__FILE__) . 'includes/class-validator.php';
        require_once plugin_dir_path(__FILE__) . 'includes/class-installer.php';
    }
}
```

### 2. API Client

ارتباط با API های هوش مصنوعی:

```php
class API_Client {
    private $provider;      // OpenAI, Anthropic, etc.
    private $api_key;
    private $model;
    private $timeout;
    
    public function send_request($prompt, $context = []) {
        // ارسال درخواست به API
        // پردازش پاسخ
        // مدیریت خطاها
    }
    
    private function format_prompt($user_request, $context) {
        // فرمت کردن درخواست برای AI
    }
}
```

### 3. Code Generator

تولید کد افزونه بر اساس پاسخ AI:

```php
class Code_Generator {
    public function generate_plugin($ai_response, $plugin_slug) {
        // استخراج اطلاعات از پاسخ AI
        $plugin_data = $this->parse_ai_response($ai_response);
        
        // تولید ساختار فایل‌ها
        $structure = $this->create_structure($plugin_data);
        
        // تولید کد PHP
        $php_code = $this->generate_php($plugin_data);
        
        // تولید کد JavaScript
        $js_code = $this->generate_js($plugin_data);
        
        // تولید کد CSS
        $css_code = $this->generate_css($plugin_data);
        
        return [
            'structure' => $structure,
            'files' => [
                'main' => $php_code,
                'js' => $js_code,
                'css' => $css_code
            ]
        ];
    }
}
```

### 4. Validator

اعتبارسنجی کدهای تولید شده:

```php
class Validator {
    public function validate_code($code) {
        $errors = [];
        
        // بررسی سینتکس PHP
        $syntax_ok = $this->check_php_syntax($code);
        
        // بررسی امنیت
        $security_ok = $this->check_security($code);
        
        // بررسی استانداردهای وردپرس
        $standards_ok = $this->check_wp_standards($code);
        
        return [
            'valid' => $syntax_ok && $security_ok && $standards_ok,
            'errors' => $errors
        ];
    }
    
    private function check_security($code) {
        // بررسی SQL Injection
        // بررسی XSS
        // بررسی CSRF
        // بررسی File Inclusion
    }
}
```

### 5. Installer

نصب و فعال‌سازی افزونه‌های تولید شده:

```php
class Installer {
    public function install_plugin($plugin_data) {
        // ایجاد پوشه افزونه
        $plugin_dir = $this->create_plugin_directory($plugin_data['slug']);
        
        // نوشتن فایل‌ها
        $this->write_files($plugin_dir, $plugin_data['files']);
        
        // ثبت در دیتابیس
        $this->register_plugin($plugin_data);
        
        // فعال‌سازی (اختیاری)
        if ($plugin_data['activate']) {
            $this->activate_plugin($plugin_data['slug']);
        }
    }
}
```

## 🔄 جریان کار (Workflow)

### 1. دریافت درخواست کاربر

```
User Request → Chat Handler → Format Prompt
```

### 2. ارتباط با AI

```
Formatted Prompt → API Client → AI API → Response
```

### 3. تولید کد

```
AI Response → Code Generator → Plugin Files
```

### 4. اعتبارسنجی

```
Plugin Files → Validator → Validation Result
```

### 5. نصب

```
Validated Files → Installer → Installed Plugin
```

## 🗄️ ساختار دیتابیس

### جدول اصلی: `wp_ai_plugin_builder_plugins`

```sql
CREATE TABLE wp_ai_plugin_builder_plugins (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    plugin_slug VARCHAR(255) NOT NULL,
    plugin_name VARCHAR(255) NOT NULL,
    description TEXT,
    version VARCHAR(20) DEFAULT '1.0.0',
    status ENUM('active', 'inactive', 'deleted') DEFAULT 'inactive',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT(20) UNSIGNED,
    ai_provider VARCHAR(50),
    ai_model VARCHAR(100),
    file_path VARCHAR(500),
    INDEX idx_slug (plugin_slug),
    INDEX idx_status (status)
);
```

### جدول چت‌ها: `wp_ai_plugin_builder_chats`

```sql
CREATE TABLE wp_ai_plugin_builder_chats (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    plugin_id BIGINT(20) UNSIGNED,
    user_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plugin_id) REFERENCES wp_ai_plugin_builder_plugins(id)
);
```

## 🔐 امنیت

### لایه‌های امنیتی

1. **Capability Check**: بررسی دسترسی کاربر
2. **Nonce Verification**: بررسی Nonce برای درخواست‌ها
3. **Input Sanitization**: پاکسازی ورودی‌ها
4. **Output Escaping**: فرار از خروجی‌ها
5. **Code Validation**: بررسی امنیتی کدها

```php
// مثال بررسی دسترسی
if (!current_user_can('manage_options')) {
    wp_die(__('شما دسترسی لازم را ندارید.'));
}

// مثال بررسی Nonce
if (!wp_verify_nonce($_POST['nonce'], 'ai_plugin_builder_action')) {
    wp_die(__('درخواست نامعتبر است.'));
}
```

## 🚀 بهینه‌سازی‌ها

### Caching

- کش کردن پاسخ‌های AI برای درخواست‌های مشابه
- کش کردن کدهای تولید شده

### Performance

- استفاده از Background Processing برای تولید افزونه‌های بزرگ
- استفاده از Queue System برای درخواست‌های متعدد

### Error Handling

- مدیریت خطاهای API
- Logging برای دیباگ
- Fallback برای خطاها

## 📊 Monitoring

### لاگ‌ها

```php
class Logger {
    public function log($level, $message, $context = []) {
        // ثبت در فایل لاگ
        // ارسال به سیستم مانیتورینگ
    }
}
```

### متریک‌ها

- تعداد افزونه‌های تولید شده
- زمان متوسط تولید
- نرخ موفقیت
- خطاهای رایج

## 🔄 به‌روزرسانی

سیستم به‌روزرسانی خودکار برای:
- بهبود الگوریتم‌های تولید کد
- رفع باگ‌ها
- افزودن ویژگی‌های جدید

