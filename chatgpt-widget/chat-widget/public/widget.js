const chatLog = document.getElementById("chat-log");
const statusEl = document.getElementById("status");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const soundSelect = document.getElementById("sound-select");
const voiceSelect = document.getElementById("voice-select");
const volumeInput = document.getElementById("volume-input");
const playButton = document.getElementById("play-sound");

appendMessage("System", "Widget ready. Ask something epic!", "bot");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  await sendMessage(text);
});

playButton.addEventListener("click", async () => {
  const achievement = soundSelect.value;
  if (!achievement) {
    setStatus("Pick an achievement first.");
    return;
  }
  setStatus(`Playing ${achievement}…`);
  try {
    await triggerSound({
      achievement,
      voiceGender: voiceSelect.value || undefined,
      volume: volumeInput.value,
    });
    setStatus(`${achievement} triggered.`);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Failed to trigger sound");
    appendMessage("System", `⚠️ ${error.message || "Failed to trigger sound."}`, "bot");
  }
});

async function sendMessage(text) {
  appendMessage("You", text, "user");
  setStatus("Thinking…");
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Chat endpoint failed");
    }

    appendMessage("AI", payload.reply, "bot");

    if (payload.quakeSound) {
      setStatus(`Triggering ${payload.quakeSound}…`);
      try {
        await triggerSound({ achievement: payload.quakeSound });
        setStatus(`${payload.quakeSound} played!`);
      } catch (soundError) {
        console.error(soundError);
        setStatus("Chat ok, but failed to play sound.");
        appendMessage(
          "System",
          `⚠️ Unable to play ${payload.quakeSound}: ${soundError.message}`,
          "bot"
        );
      }
    } else {
      setStatus("Reply delivered.");
    }
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Something went wrong");
    appendMessage("System", `⚠️ ${error.message || "ChatGPT request failed."}`, "bot");
  }
}

async function triggerSound({ achievement, voiceGender, volume }) {
  const params = new URLSearchParams({ achievement });
  if (voiceGender) params.set("voiceGender", voiceGender);
  if (volume) params.set("volume", volume);

  const response = await fetch(`/quake-sound?${params.toString()}`);
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "Sound endpoint failed");
  }
}

function appendMessage(author, text, variant) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${variant}`;

  const label = document.createElement("small");
  label.textContent = author;
  bubble.appendChild(label);

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.appendChild(paragraph);

  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function setStatus(text) {
  statusEl.textContent = text;
}
