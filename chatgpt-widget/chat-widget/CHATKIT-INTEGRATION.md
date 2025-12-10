# 🎮 ChatKit Integration Guide - Quake Coding Arena

This guide explains how to integrate OpenAI's ChatKit with the Enhanced Quake Coding Arena MCP server to create a powerful, embeddable chat experience with Quake achievement celebrations.

## 📚 **What is ChatKit?**

ChatKit is OpenAI's solution for building embeddable chat experiences. It provides:
- **Embeddable UI Widgets** - Pre-built chat components
- **Customizable Prompts** - Tailor chat interactions
- **Tool Invocation Support** - Integrate MCP tools
- **File Attachments** - Share files in chat
- **Chain-of-Thought Visualizations** - See AI reasoning

## 🎯 **Integration Approaches**

### **Approach 1: ChatKit with MCP Tool Integration (Recommended)**

Use ChatKit's UI with custom tool invocations to trigger Quake sounds:

```javascript
// ChatKit configuration with MCP tool support
import { ChatKit } from '@openai/chatkit';

const chatkit = new ChatKit({
  workflowId: 'your-workflow-id',
  clientToken: 'your-client-token',
  onToolCall: async (toolName, args) => {
    if (toolName === 'play_enhanced_quake_sound') {
      // Call your MCP server endpoint
      await fetch('http://localhost:4173/quake-sound', {
        method: 'GET',
        params: {
          achievement: args.achievement,
          voiceGender: args.voiceGender,
          volume: args.volume
        }
      });
    }
  }
});
```

### **Approach 2: Custom Backend with ChatKit Frontend**

Use ChatKit's UI components but route through your Express backend:

```javascript
// Backend: server/index.js
app.post('/chatkit/chat', async (req, res) => {
  // Handle ChatKit requests
  const response = await chatkit.handleRequest(req.body);
  
  // Trigger Quake sounds based on response
  const quakeSound = pickAchievement(response);
  if (quakeSound) {
    await triggerQuakeAchievement({ achievement: quakeSound });
  }
  
  res.json(response);
});
```

### **Approach 3: Hybrid - ChatKit Widget + Quake Controls**

Embed ChatKit for chat functionality and add custom Quake achievement controls:

```html
<!-- ChatKit widget -->
<div id="chatkit-container"></div>

<!-- Custom Quake controls -->
<section class="quake-controls">
  <select id="achievement-select">
    <option value="GODLIKE">GODLIKE</option>
    <option value="RAMPAGE">RAMPAGE</option>
    <!-- ... more options -->
  </select>
  <button onclick="triggerQuakeSound()">Play Achievement</button>
</section>

<script>
  // Initialize ChatKit
  const chatkit = new ChatKit({
    container: '#chatkit-container',
    workflowId: 'your-workflow-id'
  });
  
  // Custom Quake trigger
  async function triggerQuakeSound() {
    const achievement = document.getElementById('achievement-select').value;
    await fetch(`/quake-sound?achievement=${achievement}`);
  }
</script>
```

## 🛠️ **Implementation Steps**

### **Step 1: Set Up ChatKit Agent Workflow**

1. Go to [OpenAI Agent Builder](https://platform.openai.com/agent-builder)
2. Create a new workflow
3. Add a tool step that calls your MCP server
4. Configure the workflow to handle chat + Quake achievements

### **Step 2: Configure MCP Tool in ChatKit**

In your Agent Builder workflow, add a tool configuration:

```json
{
  "type": "function",
  "function": {
    "name": "play_enhanced_quake_sound",
    "description": "Play a Quake 3 Arena achievement sound to celebrate coding victories",
    "parameters": {
      "type": "object",
      "properties": {
        "achievement": {
          "type": "string",
          "enum": ["GODLIKE", "RAMPAGE", "FIRST BLOOD", "HEADSHOT", ...],
          "description": "The achievement to play"
        },
        "voiceGender": {
          "type": "string",
          "enum": ["male", "female"],
          "description": "Voice pack to use"
        },
        "volume": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "description": "Volume level (0-100)"
        }
      },
      "required": ["achievement"]
    }
  }
}
```

### **Step 3: Create Backend Endpoint**

Update your Express server to handle ChatKit tool calls:

```javascript
// server/index.js
app.post('/chatkit/tools/play_enhanced_quake_sound', async (req, res) => {
  const { achievement, voiceGender, volume } = req.body;
  
  try {
    await triggerQuakeAchievement({ achievement, voiceGender, volume });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **Step 4: Embed ChatKit Widget**

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.openai.com/chatkit/v1/chatkit.js"></script>
</head>
<body>
  <div id="chatkit-widget"></div>
  
  <script>
    ChatKit.init({
      container: '#chatkit-widget',
      workflowId: 'your-workflow-id',
      clientToken: 'your-client-token',
      theme: {
        // Customize to match Quake aesthetic
        primaryColor: '#7c3aed',
        backgroundColor: '#07040f'
      }
    });
  </script>
</body>
</html>
```

## 🎨 **Customization Options**

### **Theme Customization**

Match ChatKit's theme to the Quake aesthetic:

```javascript
ChatKit.init({
  theme: {
    primaryColor: '#7c3aed',      // Purple gradient
    backgroundColor: '#07040f',    // Dark background
    textColor: '#f8fafc',          // Light text
    borderRadius: '18px',           // Rounded corners
    fontFamily: "'Space Grotesk', sans-serif"
  }
});
```

### **Custom Widgets**

Add custom Quake achievement widgets:

```javascript
ChatKit.addWidget({
  name: 'quake-achievement',
  render: (props) => {
    return `
      <div class="quake-achievement-widget">
        <h3>${props.achievement}</h3>
        <button onclick="playAchievement('${props.achievement}')">
          Play Sound
        </button>
      </div>
    `;
  }
});
```

## 🔗 **MCP Server Integration**

### **Direct MCP Integration**

Connect ChatKit directly to your MCP server:

```javascript
import { Client as McpClient } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

// Initialize MCP client
const mcpClient = new McpClient({
  name: 'chatkit-quake-integration',
  version: '1.0.0'
});

const transport = new StreamableHTTPClientTransport(
  new URL('http://localhost:3000/mcp')
);
await mcpClient.connect(transport);

// Use in ChatKit tool handler
ChatKit.onToolCall('play_enhanced_quake_sound', async (args) => {
  await mcpClient.callTool({
    name: 'play_enhanced_quake_sound',
    arguments: args
  });
});
```

## 📦 **Complete Example**

See `chatkit-widget.html` for a complete working example that combines:
- ChatKit UI components
- MCP server integration
- Quake achievement triggers
- Custom styling

## 🚀 **Benefits of ChatKit Integration**

1. **Professional UI** - Pre-built, polished chat interface
2. **Tool Support** - Native tool invocation for MCP integration
3. **Scalability** - OpenAI handles backend scaling
4. **Customization** - Themes, widgets, and actions
5. **File Support** - Built-in file attachment handling
6. **Analytics** - Usage tracking and insights

## 🔍 **Resources**

- [ChatKit Documentation](https://platform.openai.com/docs/guides/chatkit)
- [ChatKit JS SDK](https://github.com/openai/chatkit-js)
- [ChatKit Python SDK](https://github.com/openai/chatkit-python)
- [Agent Builder Guide](https://platform.openai.com/docs/guides/agent-builder)
- [Widget Builder](https://platform.openai.com/docs/guides/custom-chatkit)

## 🎯 **Next Steps**

1. **Set up Agent Builder workflow** with Quake MCP tool
2. **Generate client token** for your application
3. **Embed ChatKit widget** in your site
4. **Customize theme** to match Quake aesthetic
5. **Test tool invocations** to trigger achievements
6. **Add custom widgets** for achievement controls

Enjoy combining ChatKit's powerful UI with Quake's epic celebrations! 🎮✨
