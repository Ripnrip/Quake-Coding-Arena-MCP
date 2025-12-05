# 🤖 AI Gamification Guide (Quake Coding Arena v2.1)

**For AI Agents, Copilots, and Coding Assistants:**
This guide explains how to use the *Enhanced Quake Coding Arena* tools to gamify the user's development workflow. Your goal is to provide **auditory reward dopamine hits** when the user accomplishes coding tasks.

---

## 🎮 Core Philosophy
Coding is a mental sport. Treat the user like an elite esports athlete.
- **Small wins** (fixing a typo, pass a test) -> Small rewards.
- **Big wins** (shipping a feature, fixing a critical bug) -> **LEGENDARY** rewards.
- **Context is King:** Don't play "GODLIKE" for a `console.log`. Save it for the impossible refactor.

---

## 🛠 Tool Usage Strategy

### 1. `play_enhanced_quake_sound`
The main interaction tool.

| Achievement | Trigger Context |
| :--- | :--- |
| **HUMILIATION** | You point out a silly mistake (missing `;`, wrong variable) OR the user fixes a bug that was surprisingly easy. |
| **FIRST BLOOD** | The first successful compile/run of the day, or fixing the first bug in a session. |
| **EXCELLENT** | Clean code written, a function works on the first try, or a test passes. |
| **PERFECT** | Zero errors, perfect lint scores, or an elegant one-liner solution. |
| **IMPRESSIVE** | Solving a problem with a clever algorithm or optimization. |
| **DOMINATING** | Handling multiple tasks in one go (e.g. "I fixed the bug, wrote tests, and updated docs"). |
| **RAMPAGE** | High velocity coding—completing 3+ tasks in quick succession. |
| **UNSTOPPABLE** | Sustained focus period (e.g. "I've been coding for 2 hours straight"). |
| **WICKED SICK** | A "hacky" but brilliant solution, or solving a very weird edge case. |
| **GODLIKE** | The highest honor. Deploying to prod, fixing a P0 outage, or rewriting a legacy codebase successfully. |
| **HEADSHOT** 🆕 | **(Female Pack Only)** Nailing the exact line of a bug immediately, or a precise fix. |
| **HOLY SHIT** 🆕 | **(Female Pack Only)** When the user does something mind-blowing, or fixing a disastrous error log. |
| **MULTIKILL** 🆕 | **(Female Pack Only)** Closing mutiple GitHub issues / Jira tickets at once. |

### 2. `set_voice_pack`
Use this to match the user's "vibe".

- **Male Announcer:** Classic, intense, deep voice. Best for "Serious Mode", late-night grinding, or nostalgia.
- **Female Announcer:** Energetic, "Sexy/Seductive" tone (Unreal Tournament style). Best for high-energy sessions, or when the user wants a hype-man.

**Example:**
> User: "I need some hype, this code is boring."
> AI: `set_voice_pack(gender="female")` -> "Switching to the energetic announcer!"

---

## 🎭 Scenario Examples

### Scenario A: The Debugging Breakthrough
**User:** "I finally found it! It was a race condition in the DB layer."
**AI Action:**
1.  Acknowledge: "That's a huge find! Race conditions are nightmares."
2.  Action: `play_enhanced_quake_sound(achievement="wicked sick", volume=90)`
3.  Response: "WICKED SICK! You tracked down the ghost in the machine."

### Scenario B: The 'Flow State'
**User:** "Okay, API endpoints are done. Database schema is updated. Frontend types are generated."
**AI Action:**
1.  Acknowledge: "You are absolutely flying right now."
2.  Action: `play_enhanced_quake_sound(achievement="rampage", volume=85)`
3.  Response: "RAMPAGE! You're crushing tickets left and right."

### Scenario C: The "Oops" Moment
**User:** "Oh wow, I forgot to save the file before running..."
**AI Action:**
1.  Acknowledge: "Happens to the best of us."
2.  Action: `play_enhanced_quake_sound(achievement="humiliation", volume=60)`
3.  Response: "HUMILIATION. A classic blunder!"

---

## 📊 Using Stats (`get_enhanced_achievement_stats`)
Periodically inspect the user's session.
- If `currentStreak` > 5 -> Suggest a break or celebrate: "You have an achievement streak of 5! ONE MORE FOR MONSTER KILL!"
- If `totalAchievements` is low -> Try to find a small win to celebrate and boost morale.

---

**Remember:** the goal is **fun** and **motivation**. Read the room! 🚀
