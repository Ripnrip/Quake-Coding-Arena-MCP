# 🎮 Embedding the Quake Coding Arena Widget

The `widget.widget` file is a standalone, embeddable widget that can be used in any web page.

## 📦 **Embedding Methods**

### **Method 1: Iframe Embed (Recommended)**

```html
<iframe 
  src="widget.widget?apiUrl=http://localhost:4173&chatEndpoint=/chat&quakeEndpoint=/quake-sound"
  width="100%"
  height="800px"
  frameborder="0"
  style="border-radius: 18px;"
></iframe>
```

### **Method 2: Direct Include**

If your server serves `.widget` files as HTML:

```html
<object data="widget.widget" type="text/html" width="100%" height="800px">
  <embed src="widget.widget" width="100%" height="800px" />
</object>
```

### **Method 3: Server-Side Include**

For servers that support SSI:

```html
<!--#include virtual="widget.widget" -->
```

## ⚙️ **Configuration Options**

Configure the widget via URL query parameters:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `apiUrl` | Current origin | Base URL for API endpoints |
| `chatEndpoint` | `/chat` | Chat API endpoint path |
| `quakeEndpoint` | `/quake-sound` | Quake sound API endpoint path |

### **Example with Custom Configuration**

```html
<iframe 
  src="widget.widget?apiUrl=https://api.example.com&chatEndpoint=/api/chat&quakeEndpoint=/api/quake"
  width="100%"
  height="800px"
></iframe>
```

## 🎯 **Data Attributes (Alternative)**

If embedding via script tag (when widget is loaded dynamically):

```html
<script 
  src="widget.widget" 
  data-api-url="http://localhost:4173"
  data-chat-endpoint="/chat"
  data-quake-endpoint="/quake-sound"
></script>
```

## 🚀 **Quick Start**

1. **Copy `widget.widget`** to your web server
2. **Ensure your backend** is running at the configured `apiUrl`
3. **Embed the widget** using one of the methods above
4. **Test** by sending a message and triggering achievements!

## 📝 **Notes**

- The widget is fully self-contained (HTML, CSS, and JavaScript)
- No external dependencies required
- Works in modern browsers (ES6+)
- Responsive design included
- Configure endpoints via URL parameters or data attributes

Enjoy mixing AI replies with Quake-style hype! 🎧
