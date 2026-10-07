# 📋 25-Minute Teaching Demonstration Guide & Cue Sheet

* **Teacher / Presenter:** John Lawrence F. Maula
* **Subject:** Principles and Methods of Teaching (PMT) • BSIT-31A
* **Topic:** Programming Essentials: Python Fundamentals & Core Structures
* **Institution:** Pambayang Dalubhasaan ng Marilao
* **Total Time Allocation:** 25 Minutes (00:00 – 25:00)

---

## ⏱️ Quick Timekeeper Overview

| Timestamp | Slide | Activity | Student Deliverable |
| :--- | :--- | :--- | :--- |
| **00:00 – 02:00** | Slide 1 | Preliminaries & Topic Introduction | — |
| **02:00 – 05:00** | Slide 2 | Review Game ("Flip the Circle!") | Oral participation |
| **05:00 – 07:30** | Slide 3 | Core Concept: Compiler vs. Interpreter | Active listening |
| **07:30 – 10:30** | Slide 4 | Motivation: Spaghetti vs. Clean Code | Oral comparison |
| **10:30 – 17:00** | Slide 5 | Lesson Proper: The 4 Python Essentials | Live observation |
| **17:00 – 19:30** | Slide 6 | Reflection Activity | 1/4 Sheet (2 sentences) |
| **19:30 – 22:30** | Slide 7 | Application Coding Activity | 1/2 Sheet Crosswise |
| **22:30 – 24:00** | Slide 8 | Formative Evaluation Quiz (4 Items) | 1/4 Sheet (Bottom) |
| **24:00 – 24:45** | Slide 9 | Assignment: Research on 4 Pillars of OOP | Notes / 1/2 Sheet (Due next meeting) |
| **24:45 – 25:00** | Slide 10| Closing & Paper Collection | Pass papers forward |

---

## 📌 Slide-by-Slide Speaker Cues

### [00:00 – 02:00] Slide 1: Introduction & Preliminaries
* **Teacher Action:** Stand upright, greet class warmly, check attendance, state topic clearly.
* **Key Talking Points:**
  * *"Good morning / afternoon, BSIT-31A! I am John Lawrence F. Maula."*
  * *"Today's lesson: **Programming Essentials: Python Fundamentals & Core Structures**."*
  * *"Big systems (web apps, AI, databases) are all built on the same core programming fundamentals."*

---

### [02:00 – 05:00] Slide 2: Review Game ("Flip the Circle!")
* **Teacher Action:** Point to the 16 interactive numbered circles. Call 2 volunteers to flip circles.
* **Key Talking Points:**
  * *"Quick recall of last meeting! Let's match letter pairs to reveal our keyword."*
  * Call students to flip matching numbers (reveals letters C, O, M, P...).
  * Click **'Reveal Mystery Word'** button (confetti plays).
  * *"Our mystery word is: **COMPILER**! Great job, everyone!"*

---

### [05:00 – 07:30] Slide 3: Compiler vs. Interpreter
* **Teacher Action:** Contrast the left card (Compiler) vs. right card (Interpreter) using gestures.
* **Key Talking Points:**
  * **Compiler (C++, Java):** Translates the *entire source code* ahead of time into a standalone machine executable (`.exe`). Very fast, but only catches syntax errors after compiling all lines.
  * **Interpreter (Python, JS):** Translates code *line-by-line in real time*. Instant feedback, but halts immediately at the exact line containing an error.

---

### [07:30 – 10:30] Slide 4: Code Showdown (Motivation)
* **Teacher Action:** Point to Snippet A (17 lines) vs. Snippet B (8 lines) on screen.
* **Key Talking Points:**
  * *"Notice that both scripts produce the exact same terminal output!"*
  * **Snippet A:** Spaghetti code — copy-pasted 3 times for John Lawrence, Maria, and Pedro. Redundant and hard to maintain.
  * **Snippet B:** Clean code — uses a reusable function and loop. 50% fewer lines!
  * **Ask the Class:** *"If you had to grade 1,000 students instead of 3, which script would you rather maintain?"*

---

### [10:30 – 17:00] Slide 5: The 4 Python Essentials (Interactive IDE)
* **Teacher Action:** Click sidebar buttons Concept 01 through Concept 04 in order.

1. **Concept 01 — Variables & Data Types:**
   * Named storage boxes in memory (`str`, `int`, `float`, `bool`).
   * Python uses dynamic typing (no need to pre-declare types).
   * Type casting: explain why `int(age_str)` or `str(age)` is needed for user inputs.

2. **Concept 02 — Conditional Logic (`if - else`):**
   * Decision-making structure (`age >= 18`).
   * Emphasize the **4-space indentation rule** — indentation defines code blocks in Python!

3. **Concept 03 — Iterative Loops (`for` & `range`):**
   * Automates repeated actions without duplicated code lines.
   * `range(5)` produces numbers `0, 1, 2, 3, 4` (5 iterations total).

4. **Concept 04 — Exception Handling (`try - except`):**
   * Defensive programming: prevents the application from crashing.
   * What if a user enters words instead of numbers? `try-except` catches `ValueError` gracefully and gives user-friendly feedback.

---

### [17:00 – 19:30] Slide 6: Reflection Activity
* **Teacher Action:** Instruct students to take out a **1/4 sheet of paper**. Give 60 seconds of silent writing time.
* **Question on Screen:**
  > *“How do you think mastering programming essentials helps you in building your future IT projects or systems?”*
* **Teacher Action:** Call 1 student to stand and share their 2-sentence reflection. Connect their answer to real-world capstone defenses.

---

### [19:30 – 22:30] Slide 7: Application (Library Penalty Calculator)
* **Teacher Action:** Instruct students to prepare a **1/2 sheet crosswise**. Give 60 seconds to write code.
* **Problem Scenario:** Write a **6-line Python script** that:
  1. Asks for overdue days (`input`).
  2. If `days > 0`, computes a penalty of 10 Pesos per day (`days * 10`).
  3. Displays the fine.
  4. Uses `try-except` to catch `ValueError` if text is typed.
* **Teacher Action:** Test with live simulator (`3` ➔ Fine: 30 Pesos; `abc` ➔ Invalid input).
* **Teacher Action:** Click **'Reveal / Blur Solution'** to show standard 6-line code:
  ```python
  try:
      days = int(input("Overdue days: "))
      if days > 0:
          print(f"Fine: {days * 10} Pesos")
  except ValueError:
      print("Invalid input!")
  ```
* **Teacher Action:** Ask for a show of hands for who got it right.

---

### [22:30 – 24:00] Slide 8: Evaluation Quiz (4 Items)
* **Teacher Action:** Have students number 1 to 4 on the bottom of their 1/4 sheet. Peer check.
* **Questions & Answers:**
  1. Function converting `"100"` to integer `100`? ➔ **`int()`** or `int("100")`
  2. Structure branching on True/False? ➔ **`if-else` statement**
  3. Output sequence of `for i in range(3): print(i)`? ➔ **`0, 1, 2`**
  4. Block that catches runtime input errors? ➔ **`try-except` block**
* **Teacher Action:** Click **'Reveal All Answers'**. Ask who got 4/4.

---

### [24:00 – 24:45] Slide 9: Assignment (Research on OOP)
* **Teacher Action:** Point to the 4 Mystery Pillar cards on screen.
* **Key Talking Points:**
  * *"Our next lesson moves into **Object-Oriented Programming (OOP)**."*
  * *"The 4 pillars are hidden on screen because **it is your assignment to research them**!"*
  * **On 1/2 sheet crosswise:**
    1. **Identify** the Four (4) Pillars of OOP.
    2. **Define** each pillar in 1 concise sentence in your own words.
    3. **Give 1 real-world analogy** for any one of the pillars.
  * *"Due next meeting at the start of class."*

---

### [24:45 – 25:00] Slide 10: Closing
* **Teacher Action:** Collect all 1/4 and 1/2 sheets forward. Smile and dismiss class.
* **Say:**
  * *"Pass all papers to the center aisle: 3, 2, 1."*
  * *"**Thank you, class! Have a great day and goodbye!**"*
