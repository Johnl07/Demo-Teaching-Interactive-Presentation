# 🎓 Demo Teaching Interactive Presentation: Programming Essentials

An interactive, projector-optimized web-based presentation developed for a 25-minute Teaching Demonstration in **Principles and Methods of Teaching (PMT)** for **BSIT-31A** at **Pambayang Dalubhasaan ng Marilao**.

* **Presenter:** John Lawrence F. Maula
* **Topic:** Programming Essentials: Python Fundamentals & Core Structures
* **Time Allocation:** 25 Minutes

---

## 📖 Description

This interactive web presentation replaces traditional static slide decks with a dynamic, hands-on teaching experience designed to foster active student engagement. It incorporates:
* **Interactive Motivation & Review Game ("Flip the Circle!"):** A 16-circle memory matching game with confetti celebrations to review compilers and interpreters.
* **Compiler vs. Interpreter Interactive Comparison:** Visual cards breaking down translation models, compilation lifecycles, and error reporting.
* **Code Showdown (Motivation):** Side-by-side comparison of 17-line unorganized code vs. 8-line clean code with one-click clipboard copying.
* **Live In-Browser Python Sandbox (Interactive IDE):** An interactive code runner demonstrating the 4 core essentials (Variables & Data Types, Conditional Logic, Iteration/Loops, and Exception Handling) with explanatory banners and online compiler integration.
* **Student Activities:** Guided reflection prompt and a 6-line practical coding scenario for student evaluation.
* **Formative Evaluation Quiz:** Live 4-item multiple-choice quiz with immediate visual feedback, answer explanations, and automated scoring.
* **Teacher Guide:** Complete timed presentation cue sheet in [TEACHER_GUIDE.md](TEACHER_GUIDE.md).

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphic UI)
* **Scripting:** Vanilla JavaScript (ES6+)
* **Animation & Visuals:** HTML5 Canvas API (Custom confetti physics engine)
* **Fonts & Icons:** Google Fonts (Inter, Fira Code, Outfit) & Inline SVG icons

---

## 🚀 Setup Instructions

No complex build pipeline or package installation required. You can run the presentation locally with any modern web browser:

### Option 1: Direct File Open
Double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
# In the root directory (D:\PMT-LESSON)
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your web browser.

Using Node.js (`npx serve`):
```bash
npx serve .
```

---

## 🎮 Usage

### Keyboard Shortcuts
* <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> : Next Slide
* <kbd>←</kbd> / <kbd>PageUp</kbd> : Previous Slide
* <kbd>Home</kbd> : Jump to First Slide
* <kbd>End</kbd> : Jump to Final Slide

### Navigation Controls
* **Top Bar / Bottom Floating Bar:** Click slide dots or previous/next buttons to switch slides seamlessly.
* **Interactive Modules:**
  * **Slide 2:** Click numbered circles to flip and reveal letters. Click "Reveal Mystery Word" to trigger the victory state.
  * **Slide 4:** Click "Copy Snippet" to copy code directly to your clipboard.
  * **Slide 5:** Select any of the 4 concept tabs, edit python code in real time, and click "Run ▶" to execute and view terminal output.
  * **Slide 8:** Select radio answers and click "Submit Quiz" to calculate the score and display explanations.

For teacher speaker notes and pacing timings, refer to [TEACHER_GUIDE.md](TEACHER_GUIDE.md).

---

## 🤝 Contributing

Contributions and enhancements are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for details on branching, commit conventions, and pull request procedures.
