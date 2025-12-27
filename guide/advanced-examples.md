# مثال‌های پیشرفته

این بخش شامل مثال‌های پیشرفته و سناریوهای کاربردی برای افزونه **AI Plugin Builder** است.

## 🎯 مثال 1: افزونه مدیریت محصولات

### درخواست

```
کاربر: "افزونه‌ای برای مدیریت محصولات با این ویژگی‌ها:
- Custom Post Type برای محصولات
- صفحه مدیریت در پنل ادمین
- امکان افزودن، ویرایش و حذف محصول
- فیلدهای: نام، قیمت، توضیحات، تصویر
- نمایش لیست محصولات در Frontend
- صفحه جزئیات محصول
- جستجو و فیلتر محصولات"
```

### ساختار تولید شده

```php
// فایل اصلی
products-manager/
├── products-manager.php
├── includes/
│   ├── class-post-type.php
│   ├── class-admin.php
│   ├── class-frontend.php
│   └── class-meta-boxes.php
├── templates/
│   ├── archive-products.php
│   └── single-product.php
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

### کدهای کلیدی

```php
// ثبت Custom Post Type
function register_products_post_type() {
    $args = array(
        'public' => true,
        'label' => 'محصولات',
        'supports' => array('title', 'editor', 'thumbnail'),
        'has_archive' => true,
        'rewrite' => array('slug' => 'products')
    );
    register_post_type('product', $args);
}
add_action('init', 'register_products_post_type');

// Meta Box برای قیمت
function add_price_meta_box() {
    add_meta_box(
        'product_price',
        'قیمت',
        'render_price_meta_box',
        'product',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'add_price_meta_box');
```

## 🎯 مثال 2: افزونه فرم تماس پیشرفته

### درخواست

```
کاربر: "افزونه فرم تماس با این ویژگی‌ها:
- فرم تماس با فیلدهای: نام، ایمیل، موضوع، پیام
- اعتبارسنجی سمت سرور و کلاینت
- ارسال ایمیل به ادمین
- ذخیره در دیتابیس
- صفحه مدیریت برای مشاهده پیام‌ها
- امکان پاسخ به پیام‌ها
- فیلتر بر اساس وضعیت (خوانده شده/خوانده نشده)"
```

### ساختار تولید شده

```php
contact-form-advanced/
├── contact-form-advanced.php
├── includes/
│   ├── class-form-handler.php
│   ├── class-admin.php
│   └── class-email.php
├── templates/
│   └── contact-form.php
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── validation.js
```

### کدهای کلیدی

```php
// ایجاد جدول دیتابیس
function create_contacts_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_messages';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        subject varchar(255),
        message text NOT NULL,
        status varchar(20) DEFAULT 'unread',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// پردازش فرم
function handle_contact_form() {
    if (!isset($_POST['contact_form_nonce']) || 
        !wp_verify_nonce($_POST['contact_form_nonce'], 'contact_form_action')) {
        return;
    }
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $subject = sanitize_text_field($_POST['subject']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // اعتبارسنجی
    if (empty($name) || empty($email) || empty($message)) {
        wp_send_json_error(array('message' => 'لطفاً تمام فیلدها را پر کنید.'));
    }
    
    // ذخیره در دیتابیس
    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'contact_messages',
        array(
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message' => $message
        )
    );
    
    // ارسال ایمیل
    wp_mail(
        get_option('admin_email'),
        'پیام جدید: ' . $subject,
        "نام: $name\nایمیل: $email\n\nپیام:\n$message"
    );
    
    wp_send_json_success(array('message' => 'پیام شما با موفقیت ارسال شد.'));
}
add_action('wp_ajax_contact_form', 'handle_contact_form');
add_action('wp_ajax_nopriv_contact_form', 'handle_contact_form');
```

## 🎯 مثال 3: افزونه نمایش آمار سایت

### درخواست

```
کاربر: "افزونه نمایش آمار سایت با این ویژگی‌ها:
- نمایش تعداد پست‌ها، صفحات، کامنت‌ها
- نمایش تعداد کاربران
- نمایش آخرین فعالیت‌ها
- نمودار آمار بازدیدها (استفاده از Chart.js)
- ویجت برای نمایش در داشبورد
- صفحه تنظیمات برای سفارشی‌سازی"
```

### ساختار تولید شده

```php
site-statistics/
├── site-statistics.php
├── includes/
│   ├── class-statistics.php
│   ├── class-dashboard-widget.php
│   └── class-admin.php
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── chart.js
        └── statistics.js
```

### کدهای کلیدی

```php
// کلاس آمار
class Site_Statistics {
    public function get_post_count() {
        return wp_count_posts()->publish;
    }
    
    public function get_page_count() {
        return wp_count_posts('page')->publish;
    }
    
    public function get_comment_count() {
        return wp_count_comments()->approved;
    }
    
    public function get_user_count() {
        return count_users()['total_users'];
    }
    
    public function get_all_statistics() {
        return array(
            'posts' => $this->get_post_count(),
            'pages' => $this->get_page_count(),
            'comments' => $this->get_comment_count(),
            'users' => $this->get_user_count()
        );
    }
}

// REST API Endpoint
function register_statistics_endpoint() {
    register_rest_route('site-statistics/v1', '/stats', array(
        'methods' => 'GET',
        'callback' => 'get_statistics_data',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'register_statistics_endpoint');

function get_statistics_data() {
    $stats = new Site_Statistics();
    return $stats->get_all_statistics();
}
```

## 🎯 مثال 4: افزونه مدیریت رویدادها

### درخواست

```
کاربر: "افزونه مدیریت رویدادها با این ویژگی‌ها:
- Custom Post Type برای رویدادها
- فیلدهای: عنوان، توضیحات، تاریخ شروع، تاریخ پایان، مکان
- تقویم نمایش رویدادها
- فیلتر بر اساس تاریخ
- نمایش رویدادهای آینده
- شورت‌کد برای نمایش رویدادها
- ویجت برای نمایش رویدادهای نزدیک"
```

### ساختار تولید شده

```php
events-manager/
├── events-manager.php
├── includes/
│   ├── class-post-type.php
│   ├── class-meta-boxes.php
│   ├── class-calendar.php
│   └── class-widget.php
├── templates/
│   ├── archive-events.php
│   └── single-event.php
└── assets/
    ├── css/
    │   └── calendar.css
    └── js/
        └── calendar.js
```

### کدهای کلیدی

```php
// Meta Box برای تاریخ رویداد
function add_event_date_meta_box() {
    add_meta_box(
        'event_date',
        'تاریخ رویداد',
        'render_event_date_meta_box',
        'event',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'add_event_date_meta_box');

function render_event_date_meta_box($post) {
    wp_nonce_field('event_date_meta_box', 'event_date_meta_box_nonce');
    
    $start_date = get_post_meta($post->ID, '_event_start_date', true);
    $end_date = get_post_meta($post->ID, '_event_end_date', true);
    $location = get_post_meta($post->ID, '_event_location', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="event_start_date">تاریخ شروع</label></th>
            <td>
                <input type="date" id="event_start_date" 
                       name="event_start_date" 
                       value="<?php echo esc_attr($start_date); ?>">
            </td>
        </tr>
        <tr>
            <th><label for="event_end_date">تاریخ پایان</label></th>
            <td>
                <input type="date" id="event_end_date" 
                       name="event_end_date" 
                       value="<?php echo esc_attr($end_date); ?>">
            </td>
        </tr>
        <tr>
            <th><label for="event_location">مکان</label></th>
            <td>
                <input type="text" id="event_location" 
                       name="event_location" 
                       value="<?php echo esc_attr($location); ?>">
            </td>
        </tr>
    </table>
    <?php
}

// Query برای رویدادهای آینده
function get_upcoming_events($limit = 5) {
    $today = date('Y-m-d');
    
    $args = array(
        'post_type' => 'event',
        'posts_per_page' => $limit,
        'meta_query' => array(
            array(
                'key' => '_event_start_date',
                'value' => $today,
                'compare' => '>=',
                'type' => 'DATE'
            )
        ),
        'meta_key' => '_event_start_date',
        'orderby' => 'meta_value',
        'order' => 'ASC'
    );
    
    return new WP_Query($args);
}
```

## 🎯 مثال 5: افزونه سیستم رزرواسیون

### درخواست

```
کاربر: "افزونه سیستم رزرواسیون با این ویژگی‌ها:
- صفحه رزرو با انتخاب تاریخ و زمان
- بررسی دسترسی بودن زمان
- ذخیره رزرو در دیتابیس
- ارسال ایمیل تایید
- صفحه مدیریت رزروها
- امکان تایید/رد رزرو
- نمایش تقویم رزروها"
```

### ساختار تولید شده

```php
booking-system/
├── booking-system.php
├── includes/
│   ├── class-booking.php
│   ├── class-admin.php
│   └── class-email.php
├── templates/
│   └── booking-form.php
└── assets/
    ├── css/
    │   └── calendar.css
    └── js/
        └── booking.js
```

### کدهای کلیدی

```php
// بررسی دسترسی بودن زمان
function check_time_availability($date, $time) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bookings';
    
    $count = $wpdb->get_var($wpdb->prepare(
        "SELECT COUNT(*) FROM $table_name 
         WHERE booking_date = %s 
         AND booking_time = %s 
         AND status = 'confirmed'",
        $date,
        $time
    ));
    
    // حداکثر 3 رزرو در هر زمان
    return $count < 3;
}

// پردازش رزرو
function process_booking() {
    if (!wp_verify_nonce($_POST['booking_nonce'], 'booking_action')) {
        wp_send_json_error(array('message' => 'درخواست نامعتبر است.'));
    }
    
    $date = sanitize_text_field($_POST['date']);
    $time = sanitize_text_field($_POST['time']);
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    
    // بررسی دسترسی بودن
    if (!check_time_availability($date, $time)) {
        wp_send_json_error(array('message' => 'این زمان در دسترس نیست.'));
    }
    
    // ذخیره رزرو
    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'bookings',
        array(
            'booking_date' => $date,
            'booking_time' => $time,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'status' => 'pending'
        )
    );
    
    $booking_id = $wpdb->insert_id;
    
    // ارسال ایمیل تایید
    $subject = 'تایید رزرو شما';
    $message = "رزرو شما با موفقیت ثبت شد.\n\n";
    $message .= "تاریخ: $date\n";
    $message .= "زمان: $time\n";
    $message .= "کد رزرو: $booking_id";
    
    wp_mail($email, $subject, $message);
    
    wp_send_json_success(array(
        'message' => 'رزرو شما با موفقیت ثبت شد.',
        'booking_id' => $booking_id
    ));
}
add_action('wp_ajax_booking', 'process_booking');
add_action('wp_ajax_nopriv_booking', 'process_booking');
```

## 💡 نکات استفاده از مثال‌ها

### 1. سفارشی‌سازی

```
- تغییر نام فیلدها
- افزودن فیلدهای جدید
- تغییر استایل‌ها
- تغییر رفتار
```

### 2. ترکیب مثال‌ها

```
- ترکیب فرم تماس با مدیریت محصولات
- ترکیب آمار با رویدادها
- ایجاد سیستم کامل
```

### 3. بهبود عملکرد

```
- افزودن Cache
- بهینه‌سازی Query ها
- استفاده از AJAX
- Lazy Loading
```

## 🔄 به‌روزرسانی مثال‌ها

مثال‌ها می‌توانند به‌روزرسانی شوند:

```
کاربر: "مثال رزرواسیون را بهبود بده و امکان پرداخت آنلاین اضافه کن"
AI: "در حال بهبود افزونه..."
```

