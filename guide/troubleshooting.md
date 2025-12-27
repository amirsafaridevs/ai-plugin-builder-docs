# Troubleshooting

This section examines common problems and their solutions.

## 🔍 Common Problems

### Problem: Invalid API Key

**Symptoms:**
- "Invalid API Key" error
- No response from AI
- 401 error in logs

**Solutions:**

1. **Verify API Key Correctness**
   ```
   - Check correct copy/paste
   - Check extra spaces
   - Check special characters
   ```

2. **Check Account Balance**
   ```
   - Log in to API Provider panel
   - Check balance/credit
   - Check usage limits
   ```

3. **Check IP Restrictions**
   ```
   - Check Whitelist IP in API Provider
   - Add server IP to Whitelist
   ```

4. **Check Rate Limit**
   ```
   - Check request count
   - Wait for limit reset
   ```

### Problem: Plugin Not Being Created

**Symptoms:**
- "Failed to generate plugin" error
- Timeout during generation
- Invalid response from AI

**Solutions:**

1. **Check Internet Connection**
   ```bash
   # Test connection
   ping api.openai.com
   ```

2. **Check Timeout**
   ```
   - Increase timeout in settings
   - Check server limitations
   ```

3. **Check Request Limits**
   ```
   - Reduce message length
   - Break request into smaller parts
   ```

4. **Check Logs**
   ```
   - Check log file
   - Check PHP errors
   - Check API errors
   ```

### Problem: Plugin Not Installing

**Symptoms:**
- "Failed to install plugin" error
- File permission error
- Disk space error

**Solutions:**

1. **Check File Permissions**
   ```bash
   # Check write permission
   ls -la wp-content/plugins/
   
   # Change permissions
   chmod 755 wp-content/plugins/
   chmod 755 wp-content/plugins/generated-plugins/
   ```

2. **Check Disk Space**
   ```bash
   # Check free space
   df -h
   
   # Clean unnecessary files
   ```

3. **Check PHP Errors**
   ```
   - Enable WP_DEBUG
   - Check debug.log file
   ```

4. **Check Memory Limit**
   ```php
   // In wp-config.php
   define('WP_MEMORY_LIMIT', '256M');
   ```

### Problem: Plugin Not Activating

**Symptoms:**
- "Plugin activation failed" error
- Fatal Error
- White screen

**Solutions:**

1. **Check PHP Errors**
   ```php
   // In wp-config.php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```

2. **Check Dependencies**
   ```
   - Check PHP version
   - Check required plugins
   - Check WordPress version
   ```

3. **Check Conflicts**
   ```
   - Deactivate other plugins
   - Test with default theme
   ```

4. **Check Code Syntax**
   ```bash
   # Check PHP syntax
   php -l plugin-file.php
   ```

### Problem: Plugin Not Working

**Symptoms:**
- Plugin active but not working
- JavaScript errors
- No output display

**Solutions:**

1. **Check Browser Console**
   ```
   - Open Developer Tools
   - Check JavaScript errors
   - Check Network errors
   ```

2. **Check Settings**
   ```
   - Check plugin settings
   - Check Widget Settings
   - Check Shortcode Attributes
   ```

3. **Check Cache**
   ```
   - Clear browser cache
   - Clear plugin cache
   - Clear server cache
   ```

4. **Check Code**
   ```
   - Check generated code
   - Check logical errors
   - Check proper API usage
   ```

### Problem: AI Response Irrelevant

**Symptoms:**
- Irrelevant responses
- Failure to understand request
- Incorrect code generation

**Solutions:**

1. **Improve Request**
   ```
   - Write request more clearly
   - Add more details
   - Use examples
   ```

2. **Split Request**
   ```
   - Break into smaller parts
   - Incremental requests
   ```

3. **Use Context**
   ```
   - Add context to request
   - Reference previous plugins
   ```

4. **Change Model**
   ```
   - Use stronger Model
   - Adjust Temperature
   ```

## 🔧 Troubleshooting Tools

### Enable Debug Mode

```php
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);
define('SAVEQUERIES', true);
```

### Check Logs

```php
// WordPress log file
wp-content/debug.log

// Plugin log file
wp-content/uploads/ai-plugin-builder.log

// Server log
/var/log/apache2/error.log
/var/log/nginx/error.log
```

### Use Query Monitor

```php
// Install Query Monitor
// Check database queries
// Check hooks
// Check scripts and styles
```

### Use Debug Bar

```php
// Install Debug Bar
// Display debug information
// Display queries
// Display cache
```

## 📊 Performance Check

### Check Response Time

```php
// Add timer
$start_time = microtime(true);
// Code
$end_time = microtime(true);
$execution_time = $end_time - $start_time;
error_log("Execution time: " . $execution_time . " seconds");
```

### Check Memory Usage

```php
// Check memory usage
$memory_usage = memory_get_usage(true);
$memory_peak = memory_get_peak_usage(true);
error_log("Memory usage: " . $memory_usage . " bytes");
error_log("Memory peak: " . $memory_peak . " bytes");
```

### Check Database Queries

```php
// Enable SAVEQUERIES
define('SAVEQUERIES', true);

// Display queries
global $wpdb;
print_r($wpdb->queries);
```

## 🚨 Common Errors

### Fatal Error: Allowed memory size

**Solution:**
```php
// Increase Memory Limit
ini_set('memory_limit', '256M');
// Or in wp-config.php
define('WP_MEMORY_LIMIT', '256M');
```

### Fatal Error: Maximum execution time

**Solution:**
```php
// Increase Execution Time
ini_set('max_execution_time', 300);
set_time_limit(300);
```

### Warning: Cannot modify header information

**Solution:**
```php
// Check output before header
// Use ob_start()
ob_start();
// Code
ob_end_flush();
```

### Notice: Undefined variable

**Solution:**
```php
// Check variable existence before use
if (isset($variable)) {
    // Use variable
}

// Or use ?? operator
$value = $variable ?? 'default';
```

## 📞 Getting Help

### Required Information

Before requesting help, prepare this information:

1. **System Information**
   ```
   - WordPress version
   - PHP version
   - Plugin version
   - Operating system
   ```

2. **Error Information**
   ```
   - Error message
   - Stack Trace
   - Relevant logs
   ```

3. **Error Reproduction Steps**
   ```
   - Exact steps to reproduce error
   - Settings used
   - Request sent
   ```

### Support Channels

```
- GitHub Issues
- Support forum
- Support email
- Online chat
```

## 🔄 Reset Settings

### Reset to Default

```php
// In plugin settings
// Click "Reset to Default"
```

### Reinstall

```php
// 1. Deactivate plugin
// 2. Delete plugin
// 3. Delete database data
// 4. Reinstall
```

### Clear Cache

```php
// Clear plugin cache
wp_cache_flush();

// Clear transients
global $wpdb;
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_%'");
```

## 💡 Prevention Tips

### Regular Updates

```
- Update WordPress
- Update PHP
- Update plugin
```

### Regular Backups

```
- Daily backups
- Backup before changes
- Test backups
```

### Test in Development Environment

```
- Test before production
- Use staging environment
- Complete functionality testing
```

### Monitoring

```
- Error monitoring
- Performance monitoring
- Resource usage monitoring
```