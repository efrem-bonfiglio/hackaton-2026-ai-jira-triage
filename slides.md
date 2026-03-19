---
theme: default
background: /cover.png
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
title: AI-Powered Bug Triage
mdc: true
themeConfig:
  primary: '#7747FF'
addons:
  - slidev-addon-react
---

# AI-Powered Bug Triage

### To speed up issue understanding and resolution

<style>
.slidev-layout.cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 0;
  pointer-events: none;
}
.slidev-layout.cover h1,
.slidev-layout.cover h3 {
  position: relative;
  z-index: 1;
}
</style>

<div class="abs-br m-6 flex gap-2">
  <span class="text-sm opacity-50">Hackathon 2026</span>
</div>

<div class="abs-bl m-8 flex items-end gap-5" style="z-index: 1;">
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-UG92STQ3A-4aaef1c495d1-512" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60 text-white">Davide Gaggero</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-U5E0UM02U-2ffa430e06e2-512" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60 text-white">Matteo Santagata</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-U0372L1JHJT-bc6edfb6b71b-512" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60 text-white">Davide Ponti</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-U02SR030RL1-980595abddee-192" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60 text-white">Efrem Bonfiglio</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-UGLDB3YSE-0402501d27e2-192" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60 text-white">Marcello Garini</span>
  </div>
</div>

<!--
Hi everyone. Today I'm presenting an AI-powered system for automatic Jira bug triage.

The main goal of this project is reduce the time developers spend figuring out WHERE a bug lives
-->

---
layout: default
---

# The Bigger Picture: Mirko

From a trigger to a merged PR — fully orchestrated.

<div class="mt-8">
  <React is="PipelineAnimation" />
</div>

<!--
This project is actually part of a bigger initiative called Mirko by Matt, Roberto Pomoni and Loris, which aims to automate the entire bug-fixing lifecycle.
-->

---
transition: fade-out
layoutClass: gap-16
---

# The Problem

When a customer reports a bug, developers spend significant time **just understanding where the problem lives** across multiple projects.

<br>

<div class="mt-12 flex flex-col items-center gap-0.5 text-xs font-mono justify-center">

<v-click>🐛 Customer reports a bug</v-click>
<v-click>↓</v-click>
<v-click>❓ "Where does this live?"</v-click>
<v-click>↓</v-click>
<v-click>👨‍💻 Developer A investigates</v-click>
<v-click>↓</v-click>
<v-click>📋 Issue goes to backlog</v-click>
<v-click>↓</v-click>
<v-click>👩‍💻 Developer B picks it up</v-click>
<v-click>↓</v-click>
<v-click>🔁 Re-investigates from scratch</v-click>
<v-click>↓</v-click>
<v-click>🔧 Finally starts fixing</v-click>

</div>

<!--
Let's start with the problem.

When a customer reports a bug, the description often doesn't clearly indicate which project it belongs to. We have multiple projects— beefree-app-frontend, sdk-frontend, beefree-app-backend, authentication, parser, and many others. A developer has to read the ticket, interpret the content, and figure out where to look.

That takes time.

After the ticket lands in the backlog and gets picked up by a different developer, this analysis is often repeated from scratch because the triage work is not always written in the ticket. Context is lost, time is wasted.
-->

---
layout: center
class: text-center
---

# The Impact We're After

<div class="grid grid-cols-2 gap-8 mt-8 text-left max-w-2xl mx-auto">

<div class="p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
  <h3>⚡ Faster Triage</h3>
  <p class="text-sm opacity-75">Reduce time from bug report to project assignment</p>
</div>

<div class="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
  <h3>🧠 Preserve Context</h3>
  <p class="text-sm opacity-75">Analysis is saved on the ticket, never lost</p>
</div>

<div class="p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
  <h3>📝 Better Tickets</h3>
  <p class="text-sm opacity-75">Structured analysis improves ticket quality</p>
</div>

<div class="p-4 bg-orange-50 rounded-lg dark:bg-orange-900/20">
  <h3>🤝 Customer support ↔ Engineering</h3>
  <p class="text-sm opacity-75">Smoother collaboration between teams</p>
</div>

</div>

<!--
The impact we wanted to achieve with this project.

1: speed up triage by reducing the time needed to identify which project a bug belongs to.

2: preserve context, because the analysis is written directly on the Jira ticket and never lost.

3: improve ticket quality by providing structured analysis. 

4: create smoother collaboration between Customer support and Engineering.
-->

---
layout: default
---

# The Solution: A Multi-Agent AI System

Three specialized AI agents, each with a precise role, coordinated by a central orchestrator.

<div class="mt-12">
  <React is="WorkflowAnimation" />
</div>

<!--
The solution we built is a multi-agent system. 

We have three specialized agents, each with a precise responsibility.

The flow is sequential: the Coordinator receives a Jira ticket URL or ID, fetches it via API, then passes the data to the Ticket Analyzer which extracts key information, and finally the Infrastructure Reader uses that information to find the most relevant projects. The result is automatically written back to the Jira ticket.
-->

---
layout: default
---

# Agent 1: Ticket Analyzer 🔬

Parses and understands the Jira ticket content.

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

### Example

Given a ticket saying:

> *"The sidebar disappears when dragging a module in the editor"*

It extracts:
<React is="AnalyzerOutput" />

</div>

</div>

<!--
The first specialized agent is the Ticket Analyzer.

Its job is to scan and understand the ticket content. It extracts structured information that the next agent will use.
-->

---
layout: default
---

# Agent 2: Infrastructure Reader 📚

Matches ticket content to the right project using **infrastructure documentation**.

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

### How it works

<v-clicks>

1. Reads the **Router** document first
2. Uses routing rules to narrow down candidates
3. Reads relevant **project docs**
4. Returns matches with **confidence scores**

</v-clicks>

<div v-click class="mt-4 p-3 bg-yellow-50 rounded dark:bg-yellow-900/20 text-sm">

💡 Only repositories above the **confidence threshold** (default 90%) are included in results

</div>

</div>

<div>

### Output example

<React is="TypewriterOutput" />

</div>

</div>

<!--
The second specialized agent is the Infrastructure Reader. This is the heart of the system.

It's job is to find the most relevant projects a bug belongs to.

CUT
-->

---
layout: default
---

# The Knowledge Base 📄

The AI's domain knowledge lives in **two types of Markdown documents**.

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="p-4 border-2 border-purple-400 rounded-xl text-sm">

### 📍 Router Doc
*One file — acts as a routing map.*

Maps **symptoms → projects**:

- drag and drop, sidebar → **sdk-frontend**
- login failures → **bee-auth**
- HTML rendering → **beefree-multiparser**
- one entry for **every repository**


</div>

<div class="p-4 border-2 border-blue-400 rounded-xl text-sm">

### 📄 Project Docs
*One file per repository.*

Each doc describes:

- **Responsibilities** — what the project owns
- **Typical Issues** — common failure patterns
- **Routing Signals** — key phrases and symptoms

</div>

</div>

<div class="mt-3 p-3 bg-purple-50 rounded dark:bg-purple-900/20 text-sm text-center">

💡 The AI reads the Router first to narrow candidates, then the matching Project Docs to score confidence.

</div>

<!--
The Knowledge Base is made up of Markdown files built from two sources: repository code analysis and already resolved Jira tickets

The Router is the routing map: it acts as guard to exclude projects

Individual project documents, describing responsibilities, common issues, and routing signals.

This approach is powerful: the documentation is composed from real code and real tickets — not written by hand from scratch. And the AI uses it at runtime to make informed decisions, without any model training.
-->

---
layout: default
---

# Two Modes of Operation

<div class="grid grid-cols-2 gap-8 mt-6">

<div class="p-6 border-2 border-blue-400 rounded-xl">

## 🔍 Analysis Mode
**Triage a single ticket**

<div class="mt-4 text-sm">

1. Receives a Jira ticket URL
2. Fetches ticket data via Jira API
3. Ticket Analyzer extracts entities & keywords
4. Infrastructure Reader finds matching repos
5. **Writes result back to Jira** (custom field)

</div>

</div>

<div class="p-6 border-2 border-green-400 rounded-xl">

## 🧠 Learning Mode
**Improve the knowledge base**

<div class="mt-4 text-sm">

1. Receives a batch of resolved ticket keys
2. Fetches all tickets via Jira API
3. Analyzes patterns across tickets
4. Extracts common issues & routing signals
5. **Enriches repository documentation**

</div>

</div>

</div>

<!--
The system has two operating modes.

Analysis mode is the primary one: it receives a Jira ticket URL, analyzes it, and writes the result directly to the ticket in a custom "AI Triage" field.

Learning mode: it takes a batch of already-resolved tickets, analyzes and automatically enriches the repository documentation. This means the system gets smarter over time. The more tickets we process in learning mode, the more accurate future analyses become.
-->

---
layout: center
class: text-center
---

# Demo

<div class="text-6xl mt-8 mb-4">🎬</div>

*Live demonstration of the triage flow*

<!--
At this point I'll show you a quick demo of the system in action.

[RUN THE DEMO HERE - show the flow:
1. Open the web UI with `adk web src/jira_ai_triage`
2. Paste a Jira ticket URL
3. Show how the system fetches the ticket, analyzes it, and identifies repositories
4. Show the result written to the AI Triage field in Jira]
-->

---
layout: center
class: text-center
---

# Thank you!

### Questions?

<div class="mt-8 text-sm opacity-50">

AI-Powered Bug Triage — Hackathon 2026

</div>

<div class="abs-bl m-8 flex items-end gap-5" style="z-index: 1;">
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-UG92STQ3A-4aaef1c495d1-512" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60">Davide Gaggero</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-U5E0UM02U-2ffa430e06e2-512" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60">Matteo Santagata</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-U0372L1JHJT-bc6edfb6b71b-512" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60">Davide Ponti</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-U02SR030RL1-980595abddee-192" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60">Efrem Bonfiglio</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <img src="https://ca.slack-edge.com/T066A6DDG-UGLDB3YSE-0402501d27e2-192" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/40" />
    <span class="text-xs opacity-60">Marcello Garini</span>
  </div>
</div>

<!--
Mention Mirko

Matt, Pomo, Loris are working
-->
