# 🎯 ChatKit Widget Action Handling Guide

## 📋 **Understanding onClickAction**

In ChatKit widgets, `onClickAction` has a specific type structure. The action type is used to identify which handler to call in your ChatKit workflow.

## ✅ **Correct Format**

```jsx
<Button
  label="Play Achievement"
  onClickAction={{
    type: "play_quake_achievement"
  }}
  style="primary"
  block
/>
```

## 🔧 **Passing Data to Actions**

### **Option 1: Widget State (Recommended)**

The widget state (like selected values) is automatically available to your action handler:

```jsx
<Select key="achievement" ... />
<Button
  onClickAction={{ type: "play_quake_achievement" }}
/>
```

In your ChatKit workflow action handler, access the widget state:

```javascript
// In your ChatKit workflow
onAction: async (actionType, widgetState) => {
  if (actionType === "play_quake_achievement") {
    const achievement = widgetState.achievement?.value;
    const voice = widgetState.voice?.value;
    const volume = widgetState.volume?.value;
    
    // Call your MCP server
    await fetch(`/quake-sound?achievement=${achievement}&voiceGender=${voice}&volume=${volume}`);
  }
}
```

### **Option 2: Action Parameters (If Supported)**

Some ChatKit versions may support passing parameters directly:

```jsx
<Button
  onClickAction={{
    type: "play_quake_achievement",
    params: {
      achievement: "GODLIKE"
    }
  }}
/>
```

### **Option 3: Button Label as Identifier**

For quick-select buttons, you can use the button label:

```jsx
<Button
  label="GODLIKE"
  onClickAction={{ type: "play_quake_achievement" }}
/>
```

Then in your handler, extract the achievement from the button label or use a mapping.

## 🎮 **Complete Example**

### **Widget JSX:**
```jsx
<Card size="md">
  <Col>
    <Select key="achievement" ... />
    <Select key="voice" ... />
    <Input key="volume" ... />
    <Button
      label="Play Achievement"
      onClickAction={{ type: "play_quake_achievement" }}
      style="primary"
      block
    />
  </Col>
</Card>
```

### **ChatKit Workflow Handler:**
```javascript
{
  type: "action",
  name: "play_quake_achievement",
  handler: async (widgetState) => {
    const achievement = widgetState.achievement?.value || "FIRST BLOOD";
    const voiceGender = widgetState.voice?.value || "";
    const volume = widgetState.volume?.value || 80;
    
    // Call MCP server
    const response = await fetch(
      `http://localhost:4173/quake-sound?achievement=${achievement}&voiceGender=${voiceGender}&volume=${volume}`
    );
    
    return { success: response.ok };
  }
}
```

## 🔍 **Troubleshooting**

### **TypeScript Error: onClickAction type mismatch**

**Solution:** Ensure `onClickAction` only contains the `type` property:
```jsx
// ✅ Correct
onClickAction={{ type: "play_quake_achievement" }}

// ❌ Incorrect (causes type error)
onClickAction={{
  type: "play_quake_achievement",
  achievement: "GODLIKE"  // Don't put data here
}}
```

### **Action not receiving widget state**

**Solution:** Make sure your widget components have `key` attributes:
```jsx
<Select key="achievement" ... />  // ✅ Has key
<Input key="volume" ... />         // ✅ Has key
```

### **Multiple buttons with same action type**

**Solution:** Use different action types or identify by button label:
```jsx
// Option 1: Different action types
<Button onClickAction={{ type: "play_first_blood" }} />
<Button onClickAction={{ type: "play_godlike" }} />

// Option 2: Same type, identify by label in handler
<Button label="FIRST BLOOD" onClickAction={{ type: "play_quake_achievement" }} />
<Button label="GODLIKE" onClickAction={{ type: "play_quake_achievement" }} />
```

## 📚 **References**

- [ChatKit Widget Builder](https://widgets.chatkit.studio)
- [ChatKit Components](https://widgets.chatkit.studio/components)
- [ChatKit Action Handling](https://platform.openai.com/docs/guides/chatkit)

---

**Remember:** Keep `onClickAction` simple with just the `type`, and access widget state in your action handler! 🎯
