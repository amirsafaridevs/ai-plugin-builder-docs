# Advanced Examples

This section includes advanced examples and practical scenarios for the **AI Plugin Builder** plugin.

## 🎯 Example 1: Product Management Plugin

### Request

```
User: "A plugin for product management with these features:
- Custom Post Type for products
- Admin management page
- Add, edit and delete product capability
- Fields: name, price, description, image
- Display product list in Frontend
- Product details page
- Product search and filter"
```

### Generated Structure

```php
// Main file
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

### Key Code

```php
// Register Custom Post Type
function register_products_post_type() {
    $args = array(
        'public' => true,
        'label' => 'Products',
        'supports' => array('title', 'editor', 'thumbnail'),
        'has_archive' => true,
        'rewrite' => array('slug' => 'products')
    );
    register_post_type('product', $args);
}
add_action('init', 'register_products_post_type');

// Meta Box for price
function add_price_meta_box() {
    add_meta_box(
        'product_price',
        'Price',
        'render_price_meta_box',
        'product',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'add_price_meta_box');
```

## 🎯 Example 2: Advanced Contact Form Plugin

### Request

```
User: "A contact form plugin with these features:
- Contact form with fields: name, email, subject, message
- Server and client validation
- Send email to admin
- Save to database
- Admin page to view messages
- Ability to reply to messages
- Filter by status (read/unread)"
```

### Generated Structure

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

### Key Code

```php
// Create database table
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

// Process form
function handle_contact_form() {
    if (!isset($_POST['contact_form_nonce']) || 
        !wp_verify_nonce($_POST['contact_form_nonce'], 'contact_form_action')) {
        return;
    }
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $subject = sanitize_text_field($_POST['subject']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        wp_send_json_error(array('message' => 'Please fill all fields.'));
    }
    
    // Save to database
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
    
    // Send email
    wp_mail(
        get_option('admin_email'),
        'New message: ' . $subject,
        "Name: $name\nEmail: $email\n\nMessage:\n$message"
    );
    
    wp_send_json_success(array('message' => 'Your message has been sent successfully.'));
}
add_action('wp_ajax_contact_form', 'handle_contact_form');
add_action('wp_ajax_nopriv_contact_form', 'handle_contact_form');
```

## 🎯 Example 3: Site Statistics Plugin

### Request

```
User: "A site statistics plugin with these features:
- Display post count, page count, comment count
- Display user count
- Display latest activities
- Visit statistics chart (using Chart.js)
- Widget for dashboard display
- Settings page for customization"
```

### Generated Structure

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

### Key Code

```php
// Statistics class
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

## 🎯 Example 4: Events Management Plugin

### Request

```
User: "An events management plugin with these features:
- Custom Post Type for events
- Fields: title, description, start date, end date, location
- Calendar display of events
- Filter by date
- Display upcoming events
- Shortcode to display events
- Widget to display upcoming events"
```

### Generated Structure

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

### Key Code

```php
// Meta Box for event date
function add_event_date_meta_box() {
    add_meta_box(
        'event_date',
        'Event Date',
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
            <th><label for="event_start_date">Start Date</label></th>
            <td>
                <input type="date" id="event_start_date" 
                       name="event_start_date" 
                       value="<?php echo esc_attr($start_date); ?>">
            </td>
        </tr>
        <tr>
            <th><label for="event_end_date">End Date</label></th>
            <td>
                <input type="date" id="event_end_date" 
                       name="event_end_date" 
                       value="<?php echo esc_attr($end_date); ?>">
            </td>
        </tr>
        <tr>
            <th><label for="event_location">Location</label></th>
            <td>
                <input type="text" id="event_location" 
                       name="event_location" 
                       value="<?php echo esc_attr($location); ?>">
            </td>
        </tr>
    </table>
    <?php
}

// Query for upcoming events
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

## 🎯 Example 5: Booking System Plugin

### Request

```
User: "A booking system plugin with these features:
- Booking page with date and time selection
- Availability check
- Save booking to database
- Send confirmation email
- Booking management page
- Ability to confirm/reject booking
- Booking calendar display"
```

### Generated Structure

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

### Key Code

```php
// Check time availability
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
    
    // Maximum 3 bookings per time slot
    return $count < 3;
}

// Process booking
function process_booking() {
    if (!wp_verify_nonce($_POST['booking_nonce'], 'booking_action')) {
        wp_send_json_error(array('message' => 'Invalid request.'));
    }
    
    $date = sanitize_text_field($_POST['date']);
    $time = sanitize_text_field($_POST['time']);
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    
    // Check availability
    if (!check_time_availability($date, $time)) {
        wp_send_json_error(array('message' => 'This time slot is not available.'));
    }
    
    // Save booking
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
    
    // Send confirmation email
    $subject = 'Booking Confirmation';
    $message = "Your booking has been confirmed.\n\n";
    $message .= "Date: $date\n";
    $message .= "Time: $time\n";
    $message .= "Booking ID: $booking_id";
    
    wp_mail($email, $subject, $message);
    
    wp_send_json_success(array(
        'message' => 'Your booking has been confirmed.',
        'booking_id' => $booking_id
    ));
}
add_action('wp_ajax_booking', 'process_booking');
add_action('wp_ajax_nopriv_booking', 'process_booking');
```

## 💡 Tips for Using Examples

### 1. Customization

```
- Change field names
- Add new fields
- Change styles
- Modify behavior
```

### 2. Combining Examples

```
- Combine contact form with product management
- Combine statistics with events
- Create complete system
```

### 3. Performance Improvement

```
- Add Cache
- Optimize queries
- Use AJAX
- Lazy Loading
```

## 🔄 Updating Examples

Examples can be updated:

```
User: "Improve the booking example and add online payment capability"
AI: "Improving plugin..."
```