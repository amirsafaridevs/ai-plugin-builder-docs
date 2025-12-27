# تولید افزونه

این بخش به بررسی فرآیند تولید افزونه‌ها توسط هوش مصنوعی می‌پردازد.

## 🔄 فرآیند تولید

### مراحل کلی

```
1. دریافت درخواست کاربر
   ↓
2. تحلیل و درک نیاز
   ↓
3. طراحی ساختار افزونه
   ↓
4. تولید کدها
   ↓
5. اعتبارسنجی
   ↓
6. آماده‌سازی برای نصب
```

## 📐 طراحی ساختار

### تحلیل نیاز

هوش مصنوعی ابتدا نیاز شما را تحلیل می‌کند:

```php
// مثال تحلیل
Input: "افزونه نمایش آخرین پست‌ها"

Analysis:
- Type: Widget
- Features: 
  * نمایش لیست پست‌ها
  * نمایش تصویر شاخص
  * نمایش تاریخ
- Dependencies: WordPress Core
- Complexity: Simple
```

### طراحی معماری

```php
// ساختار پیشنهادی
Plugin Structure:
├── main-plugin-file.php
├── includes/
│   ├── class-widget.php
│   └── class-settings.php
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── languages/
    └── plugin.pot
```

## 💻 تولید کد

### فایل اصلی افزونه

```php
<?php
/**
 * Plugin Name: {Plugin Name}
 * Plugin URI: https://example.com
 * Description: {Description}
 * Version: 1.0.0
 * Author: AI Plugin Builder
 * Author URI: https://example.com
 * License: GPL v2 or later
 * Text Domain: {plugin-slug}
 */

// جلوگیری از دسترسی مستقیم
if (!defined('ABSPATH')) {
    exit;
}

// تعریف ثابت‌ها
define('PLUGIN_VERSION', '1.0.0');
define('PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PLUGIN_URL', plugin_dir_url(__FILE__));

// بارگذاری فایل‌های مورد نیاز
require_once PLUGIN_DIR . 'includes/class-widget.php';

// فعال‌سازی افزونه
register_activation_hook(__FILE__, 'plugin_activate');
function plugin_activate() {
    // کدهای فعال‌سازی
}

// غیرفعال‌سازی افزونه
register_deactivation_hook(__FILE__, 'plugin_deactivate');
function plugin_deactivate() {
    // کدهای غیرفعال‌سازی
}

// بارگذاری افزونه
add_action('plugins_loaded', 'plugin_init');
function plugin_init() {
    // مقداردهی اولیه
}
```

### کلاس ویجت

```php
<?php
class Recent_Posts_Widget extends WP_Widget {
    
    public function __construct() {
        parent::__construct(
            'recent_posts_widget',
            __('آخرین پست‌ها', 'text_domain'),
            array('description' => __('نمایش آخرین پست‌ها', 'text_domain'))
        );
    }
    
    public function widget($args, $instance) {
        $title = apply_filters('widget_title', $instance['title']);
        $number = isset($instance['number']) ? absint($instance['number']) : 5;
        
        echo $args['before_widget'];
        if (!empty($title)) {
            echo $args['before_title'] . $title . $args['after_title'];
        }
        
        $query = new WP_Query(array(
            'posts_per_page' => $number,
            'post_status' => 'publish'
        ));
        
        if ($query->have_posts()) {
            echo '<ul>';
            while ($query->have_posts()) {
                $query->the_post();
                echo '<li>';
                echo '<a href="' . get_permalink() . '">' . get_the_title() . '</a>';
                echo '<span class="date">' . get_the_date() . '</span>';
                echo '</li>';
            }
            echo '</ul>';
            wp_reset_postdata();
        }
        
        echo $args['after_widget'];
    }
    
    public function form($instance) {
        $title = isset($instance['title']) ? $instance['title'] : __('آخرین پست‌ها', 'text_domain');
        $number = isset($instance['number']) ? absint($instance['number']) : 5;
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('عنوان:'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" 
                   name="<?php echo $this->get_field_name('title'); ?>" 
                   type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('number'); ?>"><?php _e('تعداد پست‌ها:'); ?></label>
            <input id="<?php echo $this->get_field_id('number'); ?>" 
                   name="<?php echo $this->get_field_name('number'); ?>" 
                   type="number" step="1" min="1" value="<?php echo $number; ?>" size="3">
        </p>
        <?php
    }
    
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
        $instance['number'] = (!empty($new_instance['number'])) ? absint($new_instance['number']) : 5;
        return $instance;
    }
}

// ثبت ویجت
function register_recent_posts_widget() {
    register_widget('Recent_Posts_Widget');
}
add_action('widgets_init', 'register_recent_posts_widget');
```

### شورت‌کد

```php
// ثبت شورت‌کد
function display_date_shortcode($atts) {
    $atts = shortcode_atts(array(
        'format' => 'Y/m/d',
        'lang' => 'fa'
    ), $atts);
    
    if ($atts['lang'] === 'fa') {
        // تبدیل به تاریخ شمسی
        return jdate($atts['format']);
    }
    
    return date($atts['format']);
}
add_shortcode('today_date', 'display_date_shortcode');
```

### صفحه تنظیمات

```php
class Plugin_Settings {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
    }
    
    public function add_settings_page() {
        add_options_page(
            'تنظیمات افزونه',
            'افزونه من',
            'manage_options',
            'plugin-settings',
            array($this, 'render_settings_page')
        );
    }
    
    public function register_settings() {
        register_setting('plugin_settings', 'plugin_option_1');
        register_setting('plugin_settings', 'plugin_option_2');
    }
    
    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1>تنظیمات افزونه</h1>
            <form method="post" action="options.php">
                <?php settings_fields('plugin_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">گزینه 1</th>
                        <td>
                            <input type="text" name="plugin_option_1" 
                                   value="<?php echo esc_attr(get_option('plugin_option_1')); ?>">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">گزینه 2</th>
                        <td>
                            <input type="text" name="plugin_option_2" 
                                   value="<?php echo esc_attr(get_option('plugin_option_2')); ?>">
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

new Plugin_Settings();
```

## 🎨 تولید استایل‌ها

### CSS

```css
/* استایل‌های افزونه */
.recent-posts-widget {
    margin: 20px 0;
}

.recent-posts-widget ul {
    list-style: none;
    padding: 0;
}

.recent-posts-widget li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.recent-posts-widget li:last-child {
    border-bottom: none;
}

.recent-posts-widget a {
    text-decoration: none;
    color: #333;
}

.recent-posts-widget a:hover {
    color: #0073aa;
}

.recent-posts-widget .date {
    display: block;
    font-size: 0.9em;
    color: #666;
    margin-top: 5px;
}
```

## 📜 تولید اسکریپت‌ها

### JavaScript

```javascript
(function($) {
    'use strict';
    
    $(document).ready(function() {
        // کدهای JavaScript
        $('.recent-posts-widget a').on('click', function(e) {
            // مدیریت کلیک
        });
    });
    
})(jQuery);
```

## 🗄️ تولید جداول دیتابیس

```php
// ایجاد جدول دیتابیس
function create_custom_table() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'custom_data';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        content text,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

register_activation_hook(__FILE__, 'create_custom_table');
```

## 🔍 اعتبارسنجی کد

### بررسی سینتکس

```php
// بررسی سینتکس PHP
$syntax_check = shell_exec("php -l " . $file_path);
if (strpos($syntax_check, 'No syntax errors') === false) {
    // خطای سینتکس
}
```

### بررسی امنیت

```php
// بررسی SQL Injection
if (preg_match('/\$_(GET|POST|REQUEST)\[.*\]\s*\)/', $code)) {
    // نیاز به استفاده از prepare
}

// بررسی XSS
if (preg_match('/echo\s+\$_(GET|POST|REQUEST)/', $code)) {
    // نیاز به escape
}

// بررسی File Inclusion
if (preg_match('/include.*\$_(GET|POST|REQUEST)/', $code)) {
    // خطرناک
}
```

### بررسی استانداردهای وردپرس

```php
// بررسی استفاده از wp_enqueue_script
if (!preg_match('/wp_enqueue_script/', $code)) {
    // هشدار
}

// بررسی استفاده از nonce
if (preg_match('/admin_post/', $code) && !preg_match('/wp_verify_nonce/', $code)) {
    // نیاز به nonce
}
```

## 📦 بسته‌بندی افزونه

### ساختار نهایی

```
plugin-slug/
├── plugin-slug.php          # فایل اصلی
├── readme.txt               # فایل readme
├── includes/                # فایل‌های PHP
│   ├── class-widget.php
│   └── class-settings.php
├── assets/                  # فایل‌های استاتیک
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── languages/               # فایل‌های ترجمه
    └── plugin.pot
```

### فایل readme.txt

```
=== Plugin Name ===
Contributors: ai-plugin-builder
Tags: widget, posts, recent
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
License: GPLv2 or later

== Description ==
افزونه نمایش آخرین پست‌ها

== Installation ==
1. آپلود افزونه
2. فعال‌سازی
3. استفاده از ویجت

== Changelog ==
= 1.0.0 =
* نسخه اولیه
```

## 🎯 انواع افزونه‌های قابل تولید

### 1. افزونه‌های ساده
- شورت‌کد
- ویجت
- فیلتر و Action

### 2. افزونه‌های با رابط کاربری
- صفحه تنظیمات
- Meta Box
- Custom Post Type UI

### 3. افزونه‌های با دیتابیس
- Custom Tables
- Custom Fields
- Data Management

### 4. افزونه‌های با API
- REST API Endpoints
- AJAX Handlers
- Webhook Handlers

## 💡 بهینه‌سازی کد تولید شده

### استفاده از Cache

```php
// کش کردن نتایج
$cache_key = 'recent_posts_' . $number;
$posts = get_transient($cache_key);

if (false === $posts) {
    $posts = get_posts(array('numberposts' => $number));
    set_transient($cache_key, $posts, HOUR_IN_SECONDS);
}
```

### استفاده از Namespace

```php
namespace MyPlugin;

class Widget {
    // کدها
}
```

### استفاده از Autoloading

```php
spl_autoload_register(function ($class) {
    $prefix = 'MyPlugin\\';
    $base_dir = __DIR__ . '/includes/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});
```

