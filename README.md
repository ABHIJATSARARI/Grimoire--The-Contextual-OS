<div align="center">

# 🎭 Grimoire: The Contextual Operating System

**One State Machine. Three Realities. Zero Code Duplication.**

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-blueviolet?style=for-the-badge)](https://abhijatsarari.github.io/grimoire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Built with Kiro](https://img.shields.io/badge/Built%20with-Kiro-00D9FF?style=for-the-badge)](https://kiro.ai)

<img src="./logo.png" alt="Grimoire Logo" width="200"/>

### *Proving that startups, cults, and academia are mathematically identical*

[🎯 Try It Live](#-live-demo) • [🎬 Watch Demo](#-demo) • [⚡ Quick Start](#-quick-start) • [🏗️ Architecture](#-architecture)

</div>

---

## 🎯 The Core Concept

Grimoire is a **Contextual Operating System** - a single abstract state machine that powers three completely different applications:

<table>
<tr>
<td width="33%" align="center">

### 🦄 Unicorn Corp
**Startup Dashboard**

<img src="https://img.shields.io/badge/Port-3000-blueviolet?style=flat-square" alt="Port 3000"/>

Professional metrics, growth hacking, and runway burning

</td>
<td width="33%" align="center">

### ⛧ Eldritch Cult
**Dark Ritual Interface**

<img src="https://img.shields.io/badge/Port-3001-red?style=flat-square" alt="Port 3001"/>

Demonic summoning, soul harvesting, and entropy accumulation

</td>
<td width="33%" align="center">

### 🎓 Academia
**Research Institute**

<img src="https://img.shields.io/badge/Port-3002-blue?style=flat-square" alt="Port 3002"/>

Grant spending, paper publishing, and faculty meetings

</td>
</tr>
</table>

### The Twist

**Same numbers. Different words. That's the point.**

- Hell mode costs **60% more** than Reality mode
- Same data → **Inverted charts** (money down = chaos up)
- Same avatars → **CSS filters** (employees become demons)
- Same actions → **Different outcomes** (shake, sound, confetti)

---

## ✨ Features

### 🤖 Autonomous Mode
Organizations **govern themselves** - no user input required. Watch them make decisions based on policy.

### 🧠 AI CEO Mode
**Gemini AI** becomes the decision maker. Unpredictable, emergent behavior. Every run is unique.

### 📊 Visual Proof
**Burn Rate vs Entropy Charts** - Same data, inverted meaning. Mathematical equivalence visualized.

### 💾 Persistent State
State saves automatically. Refresh the page - organizations continue evolving.

### 🎬 Interactive Tour
8-step guided tour explains the concept. Shows on first load, restartable anytime.

### 🎨 Rich Visuals
- Gradient charts with glow effects
- Particle systems (coins, souls, ghosts)
- Screen shake and sound effects
- Smooth animations throughout

---

## 🎬 Demo

<div align="center">

### Reality Mode (Startup)
<img src="https://via.placeholder.com/800x450/667eea/ffffff?text=Unicorn+Corp+Dashboard" alt="Reality Mode" width="100%"/>

### Hell Mode (Cult)
<img src="https://via.placeholder.com/800x450/ff0000/ffffff?text=Eldritch+Cult+Interface" alt="Hell Mode" width="100%"/>

### Side-by-Side Comparison
<img src="https://via.placeholder.com/800x450/8a2be2/ffffff?text=Same+Engine+Different+Reality" alt="Comparison" width="100%"/>

</div>

---

## ⚡ Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abhijatsarari/grimoire.git
cd grimoire

# Install all dependencies
npm run install:all
```

### Run All Apps

```bash
# Terminal 1 - Unicorn Corp (Port 3000)
npm run reality

# Terminal 2 - Eldritch Cult (Port 3001)
npm run hell

# Terminal 3 - Academia (Port 3002)
npm run academia
```

### Or Run All at Once

```bash
# Install concurrently
npm install -g concurrently

# Run all servers
npm run dev:all
```

Then open:
- 🦄 **Reality**: http://localhost:3000
- ⛧ **Hell**: http://localhost:3001
- 🎓 **Academia**: http://localhost:3002

### Or Try Live Demo

- 🌐 **Landing**: https://abhijatsarari.github.io/grimoire
- 🦄 **Reality**: https://abhijatsarari.github.io/grimoire/reality
- ⛧ **Hell**: https://abhijatsarari.github.io/grimoire/hell
- 🎓 **Academia**: https://abhijatsarari.github.io/grimoire/academia

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│   @grimoire/core (Contextual OS)        │
│   • GrimoireEntity (State Machine)      │
│   • Autonomous Agent (Self-Governing)   │
│   • Gemini CEO (AI Decision Maker)      │
│   • State Manager (Persistence)         │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┬────────────┐
       │                │            │
┌──────▼──────┐  ┌─────▼──────┐  ┌──▼────────┐
│ Unicorn Corp│  │Eldritch Cult│  │ Academia  │
│  (REALITY)  │  │   (HELL)    │  │ (ACADEMIA)│
│             │  │             │  │           │
│ 90% Shared  │  │ 90% Shared  │  │ 90% Shared│
└─────────────┘  └─────────────┘  └───────────┘
```

### Core Principles

1. **One State Machine** - All apps use `GrimoireEntity`
2. **Dictionary-Driven** - Only semantics change, not logic
3. **Divergent Behavior** - Different costs, effects, visualizations
4. **Mathematical Proof** - Verified equivalence via tests

---

## 🎯 Key Concepts

### Divergent Logic

```javascript
// Same action, different costs
case 'GROWTH':
  this.state.followers += amount;
  const cost = this.mode === 'HELL' ? amount * 8 : amount * 5;
  this.state.resources -= cost; // Hell is 60% more expensive!
```

### Visual Divergence

| Feature | Reality Mode | Hell Mode |
|---------|-------------|-----------|
| **Action Effect** | Confetti 🎉 | Screen shake + beep 🔊 |
| **Chart Direction** | Money DOWN ↓ | Chaos UP ↑ |
| **Avatar Filter** | Clean | `invert(100%) hue-rotate(90deg)` |
| **Toast Style** | ✅ Green | ⛧ Red pulsing |

### The Mathematical Joke

**A startup losing money = A cult gaining chaos**

Same data. Different interpretation. That's the Contextual OS.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **State Management**: Custom state machine
- **AI Integration**: Google Gemini Pro
- **Styling**: CSS3 with gradients & animations
- **Canvas**: HTML5 Canvas for charts
- **Persistence**: localStorage
- **Monorepo**: npm workspaces

---

## 📊 Project Stats

- **3 Apps** built from one core
- **90%+ Code Sharing** across apps
- **3,500+ Lines** of code
- **25+ Components** created
- **8 Divergent Behaviors** implemented
- **6-Second Splash** screen with video
- **8-Step Interactive** tour

---

## 🎮 Usage

### Manual Mode
Click buttons to control your organization manually.

### Autonomous Mode 🤖
```javascript
// Click "Start Autonomous Mode"
// Organization makes its own decisions
// Policy-driven behavior every 2 seconds
```

### AI CEO Mode 🧠
```javascript
// Click "AI CEO Mode"
// Gemini AI analyzes state and chooses actions
// Unpredictable, emergent behavior
```

### Compare Modes
Open all three apps side-by-side. Watch them evolve with different strategies.

---

## 🔧 Configuration

### Add Gemini API Key (Optional)

Create `.env` files in each app:

```bash
# apps/unicorn-corp/.env
VITE_GEMINI_API_KEY=your_api_key_here

# apps/eldritch-cult/.env
VITE_GEMINI_API_KEY=your_api_key_here

# apps/academia/.env
VITE_GEMINI_API_KEY=your_api_key_here
```

Get your free API key at [Google AI Studio](https://makersuite.google.com/app/apikey)

**Note**: The app works WITHOUT an API key using smart pattern matching!

---

## 🧪 Testing

```bash
# Verify mathematical equivalence
npm run verify

# Compare all three apps side-by-side
npm run compare:all

# Run CLI versions
npm run reality:cli
npm run hell:cli
npm run academia:cli
```

---

## 🎨 Customization

### Add a New Mode

1. Create dictionary in `packages/core/index.js`:
```javascript
export const MILITARY_DICTIONARY = {
  GROWTH: 'Recruited {n} soldiers',
  SACRIFICE: 'Deployed {n} units',
  // ...
};
```

2. Create new app in `apps/military/`
3. Use the same core engine
4. **That's it!** 90% of code is shared.

---

## 🏆 Built With Kiro

This project was built in **3 hours** using [Kiro](https://kiro.ai) - an AI-powered IDE.

**Productivity Gain**: 5.6x faster than manual coding

Features used:
- 🎯 Spec-driven development
- 🎨 Vibe coding
- 🪝 Agent hooks (commit message transformation)
- 📝 Steering docs (tone consistency)

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🙏 Acknowledgments

- Built for the **Kiro Hackathon 2025**
- Categories: **Skeleton Crew** + **Most Creative** + **Best AI Integration**
- Concept: Organizations are mathematically identical, they just use different marketing

---

<div align="center">

### 🎭 The Punchline

**We used an AI to prove all organizations are the same.**

**They just use different words.**

---

Made with 🤖 by [Abhijat Sarari](https://github.com/abhijatsarari)

[⭐ Star this repo](https://github.com/abhijatsarari/grimoire) • [🐛 Report Bug](https://github.com/abhijatsarari/grimoire/issues) • [💡 Request Feature](https://github.com/abhijatsarari/grimoire/issues)

</div>
