/**
 * Programming Essentials Presentation Application
 * Presenter: John Lawrence F. Maula (BSIT-31A)
 * Institution: Pambayang Dalubhasaan ng Marilao
 */

// ==========================================
// 1. SOUND EFFECTS (Web Audio API - 100% Offline)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, volume = 0.1) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  flip() {
    this.playTone(400, 'triangle', 0.08, 0.08);
  }

  match() {
    this.playTone(523.25, 'sine', 0.1, 0.12);
    setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.12), 100);
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.15), 200);
  }

  slide() {
    this.playTone(280, 'sine', 0.06, 0.05);
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. CONFETTI PARTICLES GENERATOR
// ==========================================
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#00e5ff', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#ffffff'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.alpha -= 0.012;
      p.rotation += p.vRot;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }
  render();
}

// ==========================================
// 3. MAIN PRESENTATION CONTROLLER
// ==========================================
class PresentationApp {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 10;
    this.slides = document.querySelectorAll('.slide');
    this.dotsContainer = document.getElementById('slide-dots');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.progressBar = document.getElementById('progress-bar');
    this.counterEl = document.getElementById('slide-counter');

    this.initDots();
    this.bindEvents();
    this.showSlide(0);
  }

  initDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `slide-dot ${i === 0 ? 'active' : ''}`;
      dot.title = `Slide ${i + 1}`;
      dot.addEventListener('click', () => {
        sfx.slide();
        this.showSlide(i);
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => {
      sfx.slide();
      this.prev();
    });
    this.nextBtn?.addEventListener('click', () => {
      sfx.slide();
      this.next();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        sfx.slide();
        this.next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        sfx.slide();
        this.prev();
      } else if (e.key.toLowerCase() === 'f') {
        this.toggleFullscreen();
      }
    });

    document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
      this.toggleFullscreen();
    });
  }

  showSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;
    this.currentSlide = index;

    this.slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i === index) {
        slide.classList.add('active');
      } else if (i < index) {
        slide.classList.add('prev');
      }
    });

    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.slide-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Update progress bar
    if (this.progressBar) {
      const percent = ((index + 1) / this.totalSlides) * 100;
      this.progressBar.style.width = `${percent}%`;
    }

    // Update counter
    if (this.counterEl) {
      this.counterEl.innerHTML = `<strong>${index + 1}</strong> / ${this.totalSlides}`;
    }

    // Buttons state
    if (this.prevBtn) this.prevBtn.style.opacity = index === 0 ? '0.4' : '1';
    if (this.nextBtn) this.nextBtn.style.opacity = index === this.totalSlides - 1 ? '0.4' : '1';
  }

  next() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.showSlide(this.currentSlide + 1);
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.showSlide(this.currentSlide - 1);
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
}

// ==========================================
// 4. SLIDE 2: FLIP THE CIRCLE GAME LOGIC
// ==========================================
class FlipGame {
  constructor() {
    // Word to solve: COMPILER (8 letters, 8 pairs = 16 cards)
    this.word = "COMPILER";
    this.cardData = [
      { id: 1, letter: 'C' },
      { id: 2, letter: 'O' },
      { id: 3, letter: 'M' },
      { id: 4, letter: 'C' }, // Matches #1 as per DLP!
      { id: 5, letter: 'P' },
      { id: 6, letter: 'I' },
      { id: 7, letter: 'L' },
      { id: 8, letter: 'E' },
      { id: 9, letter: 'O' }, // Matches #2
      { id: 10, letter: 'R' },
      { id: 11, letter: 'M' }, // Matches #3
      { id: 12, letter: 'P' }, // Matches #5
      { id: 13, letter: 'I' }, // Matches #6
      { id: 14, letter: 'L' }, // Matches #7
      { id: 15, letter: 'E' }, // Matches #8
      { id: 16, letter: 'R' }  // Matches #10
    ];

    this.firstCard = null;
    this.secondCard = null;
    this.lockBoard = false;
    this.matchedPairs = 0;
    this.totalPairs = 8;
    this.movesCount = 0;

    this.gridEl = document.getElementById('circle-grid-16');
    this.wordSlotsEl = document.getElementById('letter-slots-row');
    this.matchedStatEl = document.getElementById('matched-stat');
    this.movesStatEl = document.getElementById('moves-stat');

    this.init();
  }

  init() {
    if (!this.gridEl || !this.wordSlotsEl) return;
    this.renderWordSlots();
    this.renderCards();

    document.getElementById('auto-solve-btn')?.addEventListener('click', () => {
      this.autoSolve();
    });

    document.getElementById('reset-game-btn')?.addEventListener('click', () => {
      this.resetGame();
    });
  }

  renderWordSlots() {
    this.wordSlotsEl.innerHTML = '';
    for (let i = 0; i < this.word.length; i++) {
      const slot = document.createElement('div');
      slot.className = 'letter-slot';
      slot.id = `slot-${this.word[i]}-${i}`;
      slot.textContent = this.word[i];
      this.wordSlotsEl.appendChild(slot);
    }
  }

  renderCards() {
    this.gridEl.innerHTML = '';
    this.cardData.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'circle-card';
      card.dataset.id = item.id;
      card.dataset.letter = item.letter;

      card.innerHTML = `
        <div class="circle-inner">
          <div class="circle-front">#${item.id}</div>
          <div class="circle-back">${item.letter}</div>
        </div>
      `;

      card.addEventListener('click', () => this.handleCardClick(card));
      this.gridEl.appendChild(card);
    });
  }

  handleCardClick(card) {
    if (this.lockBoard) return;
    if (card === this.firstCard) return;
    if (card.classList.contains('matched') || card.classList.contains('flipped')) return;

    sfx.flip();
    card.classList.add('flipped');

    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }

    this.secondCard = card;
    this.movesCount++;
    if (this.movesStatEl) this.movesStatEl.textContent = this.movesCount;
    this.checkForMatch();
  }

  checkForMatch() {
    const isMatch = this.firstCard.dataset.letter === this.secondCard.dataset.letter;
    if (isMatch) {
      this.handleMatch();
    } else {
      this.unflipCards();
    }
  }

  handleMatch() {
    sfx.match();
    this.firstCard.classList.add('matched');
    this.secondCard.classList.add('matched');

    const matchedLetter = this.firstCard.dataset.letter;
    this.unlockWordLetter(matchedLetter);

    this.matchedPairs++;
    if (this.matchedStatEl) this.matchedStatEl.textContent = `${this.matchedPairs}/8`;

    this.resetTurn();

    if (this.matchedPairs === this.totalPairs) {
      setTimeout(() => {
        triggerConfetti();
        document.getElementById('mystery-word-banner')?.classList.add('solved');
      }, 300);
    }
  }

  unlockWordLetter(letter) {
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        const slot = document.getElementById(`slot-${letter}-${i}`);
        if (slot) slot.classList.add('revealed');
      }
    }
  }

  unflipCards() {
    this.lockBoard = true;
    setTimeout(() => {
      if (this.firstCard) this.firstCard.classList.remove('flipped');
      if (this.secondCard) this.secondCard.classList.remove('flipped');
      this.resetTurn();
    }, 1000);
  }

  resetTurn() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockBoard = false;
  }

  autoSolve() {
    const cards = document.querySelectorAll('.circle-card');
    cards.forEach(c => {
      c.classList.add('flipped', 'matched');
    });
    for (let char of this.word) {
      this.unlockWordLetter(char);
    }
    this.matchedPairs = 8;
    if (this.matchedStatEl) this.matchedStatEl.textContent = '8/8';
    sfx.match();
    triggerConfetti();
  }

  resetGame() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockBoard = false;
    this.matchedPairs = 0;
    this.movesCount = 0;
    if (this.movesStatEl) this.movesStatEl.textContent = '0';
    if (this.matchedStatEl) this.matchedStatEl.textContent = '0/8';
    this.renderWordSlots();
    const cards = document.querySelectorAll('.circle-card');
    cards.forEach(c => c.classList.remove('flipped', 'matched'));
  }
}

// ==========================================
// 5. SLIDE 4: MOTIVATION CODE RUNNER
// ==========================================
function initMotivationRunner() {
  const runBtn = document.getElementById('run-motivation-btn');
  const outputEl = document.getElementById('motivation-output');

  if (runBtn && outputEl) {
    runBtn.addEventListener('click', () => {
      sfx.match();
      outputEl.textContent = "Running both scripts...\n";
      setTimeout(() => {
        outputEl.textContent += "=== OUTPUT FROM SNIPPET A (40 lines) ===\n";
        outputEl.textContent += "Student: John Lawrence  | Score: 92 | Grade: Passed\nStudent: Maria Santos   | Score: 88 | Grade: Passed\nStudent: Pedro Penduko  | Score: 74 | Grade: Failed\n";
      }, 200);

      setTimeout(() => {
        outputEl.textContent += "\n=== OUTPUT FROM SNIPPET B (8 lines) ===\n";
        outputEl.textContent += "Student: John Lawrence  | Score: 92 | Grade: Passed\nStudent: Maria Santos   | Score: 88 | Grade: Passed\nStudent: Pedro Penduko  | Score: 74 | Grade: Failed\n";
        outputEl.textContent += "\n=> BOTH SCRIPTS PRODUCE THE SAME OUTPUT! Snippet B is 80% shorter, uses loops & functions, and is much cleaner!";
      }, 500);
    });
  }

  // Copy Snippet A button
  const copySnippetABtn = document.getElementById('copy-snippet-a-btn');
  if (copySnippetABtn) {
    copySnippetABtn.addEventListener('click', () => {
      const codeA = `# Student 1
name1 = "John Lawrence"
score1 = 92
status1 = "Passed" if score1 >= 75 else "Failed"
print(f"Student: {name1} | Score: {score1} | Grade: {status1}")

# Student 2
name2 = "Maria Santos"
score2 = 88
status2 = "Passed" if score2 >= 75 else "Failed"
print(f"Student: {name2} | Score: {score2} | Grade: {status2}")

# Student 3
name3 = "Pedro Penduko"
score3 = 74
status3 = "Passed" if score3 >= 75 else "Failed"
print(f"Student: {name3} | Score: {score3} | Grade: {status3}")`;

      navigator.clipboard?.writeText(codeA).then(() => {
        sfx.playTone(750, 'sine', 0.1, 0.08);
        copySnippetABtn.classList.add('copied');
        const span = copySnippetABtn.querySelector('span');
        if (span) span.textContent = '✓ Copied!';
        setTimeout(() => {
          copySnippetABtn.classList.remove('copied');
          if (span) span.textContent = 'Copy Code';
        }, 2000);
      });
    });
  }

  // Copy Snippet B button
  const copySnippetBBtn = document.getElementById('copy-snippet-b-btn');
  if (copySnippetBBtn) {
    copySnippetBBtn.addEventListener('click', () => {
      const codeB = `def evaluate(name, score):
    status = "Passed" if score >= 75 else "Failed"
    print(f"Student: {name:<15} | Score: {score} | Grade: {status}")

students = [("John Lawrence", 92), ("Maria Santos", 88), ("Pedro Penduko", 74)]

for name, score in students:
    evaluate(name, score)`;

      navigator.clipboard?.writeText(codeB).then(() => {
        sfx.playTone(750, 'sine', 0.1, 0.08);
        copySnippetBBtn.classList.add('copied');
        const span = copySnippetBBtn.querySelector('span');
        if (span) span.textContent = '✓ Copied!';
        setTimeout(() => {
          copySnippetBBtn.classList.remove('copied');
          if (span) span.textContent = 'Copy Code';
        }, 2000);
      });
    });
  }
}

// ==========================================
// 6. SLIDE 5: INTERACTIVE PYTHON IDE (main.py)
// ==========================================
class InteractiveIDE {
  constructor() {
    this.activeModule = 1;
    this.codeEditor = document.getElementById('ide-code-display');
    this.consoleOutput = document.getElementById('ide-console-output');
    this.runBtn = document.getElementById('ide-run-btn');
    this.copyBtn = document.getElementById('ide-copy-btn');
    this.resetBtn = document.getElementById('ide-reset-btn');

    this.modules = {
      1: {
        tag: "Concept 01",
        title: "Variables & Data Types",
        description: "Variables serve as named storage containers that hold data values in computer memory. Python dynamically infers data types based on assigned values—such as text (<code>str</code>), integers (<code>int</code>), floating-point decimals (<code>float</code>), and booleans (<code>bool</code>)—while type casting functions like <code>int()</code> and <code>str()</code> safely convert values between formats.",
        rule: "Variables are created upon assignment. Python is dynamically typed, so explicit conversion is required when combining incompatible types (e.g., strings and numbers).",
        code: `# 1. Variables & Data Types
student_name = "John Lawrence"
age = 20
gpa = 1.25
is_enrolled = True

# Type Conversion
age_str = str(age)
converted_age = int(age_str)

print(f"Student: {student_name}")
print(f"Age: {age} (Type: {type(age).__name__})")
print(f"GPA: {gpa} (Type: {type(gpa).__name__})")
print(f"Enrolled Status: {is_enrolled}")
print(f"Converted Age (str): '{age_str}' (Type: {type(age_str).__name__})")`
      },

      2: {
        tag: "Concept 02",
        title: "Conditional Logic (if - else)",
        description: "Conditional logic enables programs to make decisions and execute different paths of code based on whether a condition evaluates to <code>True</code> or <code>False</code>. Using comparison operators (<code>&gt;=</code>, <code>==</code>, <code>!=</code>, <code>&lt;</code>), the program tests rules and executes the appropriate indented code block while skipping alternative branches.",
        rule: "Python relies strictly on 4-space indentation to define blocks. Make sure your conditions evaluate cleanly to a boolean (True/False).",
        code: `# 2. Conditional Logic (Voting Eligibility)
age = 20

if age >= 18:
    print("you're eligible to vote")
else:
    print("you're not eligible to vote")`
      },

      3: {
        tag: "Concept 03",
        title: "Iterative Loops (for & range)",
        description: "Iterative loops automate repetitive tasks by repeating a block of instructions multiple times without duplicating code. Combined with <code>range()</code>, a <code>for</code> loop counts through sequences or traverses data collections step-by-step, making code concise, scalable, and easy to maintain.",
        rule: "Use range(n) to iterate n times (from 0 to n-1). Loops eliminate repetitive copy-pasted code and scale effortlessly with large datasets.",
        code: `# 3. Iterative Loops
# Repeating tasks with for & range()
for i in range(5):
    print("Hello world")`
      },

      4: {
        tag: "Concept 04",
        title: "Exception Handling (try - except)",
        description: "Exception handling is a defensive programming mechanism that anticipates and catches runtime errors before they crash the application. Potentially problematic operations run inside the <code>try</code> block; if an error occurs (such as invalid user input), control transfers safely to the <code>except</code> block to recover smoothly.",
        rule: "Never let your program crash unexpectedly. Use try-except blocks to catch anticipated errors (like ValueError) and display user-friendly recovery messages.",
        code: `# 4. Exception Handling (Graceful Error Catching)
try:
    age = int("20")
    print(f"Age accepted: {age}")
except ValueError:
    print("Please enter numbers only!")`
      }
    };

    this.init();
  }

  init() {
    this.bindButtons();
    this.switchModule(1);
  }

  bindButtons() {
    const conceptBtns = document.querySelectorAll('.concept-btn');
    conceptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modId = parseInt(btn.dataset.module, 10);
        this.switchModule(modId);
      });
    });

    this.runBtn?.addEventListener('click', () => {
      sfx.playTone(600, 'sine', 0.1, 0.08);
      this.executeActiveModule();
    });

    this.resetBtn?.addEventListener('click', () => {
      sfx.playTone(500, 'sine', 0.08, 0.08);
      const mod = this.modules[this.activeModule];
      if (mod && this.codeEditor) {
        this.codeEditor.value = mod.code;
        if (this.consoleOutput) {
          this.consoleOutput.textContent = `Code reset to original Module ${this.activeModule} template.\nClick "Run ▶" to execute.`;
        }
      }
    });

    this.copyBtn?.addEventListener('click', () => {
      const code = this.codeEditor ? this.codeEditor.value : '';
      if (!code) return;

      const copyTextEl = document.getElementById('ide-copy-text');
      const setCopiedFeedback = () => {
        sfx.playTone(750, 'sine', 0.1, 0.08);
        this.copyBtn.classList.add('copied');
        if (copyTextEl) copyTextEl.textContent = '✓ Copied!';

        if (this.consoleOutput) {
          this.consoleOutput.textContent = `✓ Code successfully copied to clipboard!\n\nYou can now paste it (Ctrl + V) directly into your online Python compiler:\n• Programiz Python: https://www.programiz.com/python-programming/online-compiler/\n• Replit: https://replit.com/languages/python3`;
        }

        setTimeout(() => {
          this.copyBtn.classList.remove('copied');
          if (copyTextEl) copyTextEl.textContent = 'Copy Code';
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(setCopiedFeedback).catch(() => {
          if (this.codeEditor) {
            this.codeEditor.select();
            document.execCommand('copy');
            setCopiedFeedback();
          }
        });
      } else if (this.codeEditor) {
        this.codeEditor.select();
        document.execCommand('copy');
        setCopiedFeedback();
      }
    });

    // Support Tab indentation and prevent presentation slides navigation when editing code
    if (this.codeEditor) {
      this.codeEditor.addEventListener('keydown', (e) => {
        e.stopPropagation(); // prevent slide change on space or arrow keys
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = this.codeEditor.selectionStart;
          const end = this.codeEditor.selectionEnd;
          this.codeEditor.value = this.codeEditor.value.substring(0, start) + "    " + this.codeEditor.value.substring(end);
          this.codeEditor.selectionStart = this.codeEditor.selectionEnd = start + 4;
        }
      });
    }
  }

  switchModule(id) {
    this.activeModule = id;
    document.querySelectorAll('.concept-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.module, 10) === id);
    });

    const mod = this.modules[id];
    if (mod) {
      if (this.codeEditor) this.codeEditor.value = mod.code;
      if (this.consoleOutput) {
        this.consoleOutput.textContent = `Ready to run Module ${id}: ${mod.title}\nFeel free to edit the code above, click "Copy Code", or click "Run ▶".`;
      }

      // Update Explanation Banner & Sidebar Summary Card
      const tagEl = document.getElementById('concept-banner-tag');
      const titleEl = document.getElementById('concept-banner-title');
      const descEl = document.getElementById('concept-banner-desc');
      const ruleEl = document.getElementById('concept-sidebar-rule');

      if (tagEl) tagEl.textContent = mod.tag;
      if (titleEl) titleEl.textContent = mod.title;
      if (descEl) descEl.innerHTML = mod.description;
      if (ruleEl) ruleEl.textContent = mod.rule;
    }
  }

  executeActiveModule() {
    if (!this.consoleOutput) return;
    const currentCode = this.codeEditor ? this.codeEditor.value : '';
    this.consoleOutput.textContent = this.executePythonCode(currentCode);
  }

  executePythonCode(sourceCode) {
    const outputs = [`$ python main.py`];
    const env = {};
    const lines = sourceCode.split('\n');

    let i = 0;
    let maxIterations = 500;
    let stepCount = 0;

    // Helper: evaluate Python expression in current scope
    const evaluateExpr = (expr) => {
      let trimmed = expr.trim();
      if (!trimmed) return "";

      // 1. type(x) or type(x).__name__
      const typeMatch = trimmed.match(/^type\((.+)\)(\.__name__)?$/);
      if (typeMatch) {
        const innerVal = evaluateExpr(typeMatch[1]);
        let typeName = 'object';
        if (typeof innerVal === 'number') {
          typeName = Number.isInteger(innerVal) ? 'int' : 'float';
        } else if (typeof innerVal === 'boolean') {
          typeName = 'bool';
        } else if (typeof innerVal === 'string') {
          typeName = 'str';
        } else if (Array.isArray(innerVal)) {
          typeName = 'list';
        }
        return typeMatch[2] ? typeName : `<class '${typeName}'>`;
      }

      // 2. int(x) conversion
      const intMatch = trimmed.match(/^int\((.+)\)$/);
      if (intMatch) {
        const val = evaluateExpr(intMatch[1]);
        if (typeof val === 'number') {
          return Math.trunc(val);
        }
        const strVal = String(val).trim();
        if (!/^-?\d+$/.test(strVal)) {
          throw new Error(`ValueError: invalid literal for int() with base 10: '${val}'`);
        }
        return parseInt(strVal, 10);
      }

      // 3. float(x) conversion
      const floatMatch = trimmed.match(/^float\((.+)\)$/);
      if (floatMatch) {
        const val = evaluateExpr(floatMatch[1]);
        if (typeof val === 'number') return val;
        const strVal = String(val).trim();
        if (!/^-?\d+(\.\d+)?$/.test(strVal)) {
          throw new Error(`ValueError: could not convert string to float: '${val}'`);
        }
        return parseFloat(strVal);
      }

      // 4. str(x) conversion
      const strMatch = trimmed.match(/^str\((.+)\)$/);
      if (strMatch) {
        const val = evaluateExpr(strMatch[1]);
        if (typeof val === 'boolean') return val ? 'True' : 'False';
        return String(val);
      }

      // 5. String literal: "..." or '...'
      if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return trimmed.slice(1, -1);
      }

      // 6. Booleans
      if (trimmed === 'True') return true;
      if (trimmed === 'False') return false;

      // 7. Numeric literals
      if (!isNaN(Number(trimmed)) && trimmed !== '') {
        return Number(trimmed);
      }

      // 8. Direct variable lookup
      if (trimmed in env) {
        return env[trimmed];
      }

      // 9. Comparison: left >= right, left <= right, ==, !=, >, <
      const compMatch = trimmed.match(/^(.+?)\s*(>=|<=|==|!=|>|<)\s*(.+)$/);
      if (compMatch) {
        const left = evaluateExpr(compMatch[1]);
        const op = compMatch[2];
        const right = evaluateExpr(compMatch[3]);
        if (op === '>=') return left >= right;
        if (op === '<=') return left <= right;
        if (op === '==') return left == right;
        if (op === '!=') return left != right;
        if (op === '>') return left > right;
        if (op === '<') return left < right;
      }

      // 10. Logical operators: and, or
      if (trimmed.includes(' and ')) {
        const parts = trimmed.split(' and ');
        return parts.every(p => Boolean(evaluateExpr(p)));
      }
      if (trimmed.includes(' or ')) {
        const parts = trimmed.split(' or ');
        return parts.some(p => Boolean(evaluateExpr(p)));
      }

      // 11. Arithmetic: +, -, *, /
      const mathMatch = trimmed.match(/^(.+?)\s*([\+\-\*\/])\s*(.+)$/);
      if (mathMatch) {
        const left = evaluateExpr(mathMatch[1]);
        const op = mathMatch[2];
        const right = evaluateExpr(mathMatch[3]);
        if (op === '+') return typeof left === 'string' || typeof right === 'string' ? `${left}${right}` : left + right;
        if (op === '-') return left - right;
        if (op === '*') return left * right;
        if (op === '/') return left / right;
      }

      return trimmed;
    };

    // Helper: split top-level comma arguments (handles quotes and parentheses)
    const splitArgs = (str) => {
      const args = [];
      let current = '';
      let inQuotes = false;
      let quoteChar = '';
      let parenDepth = 0;

      for (let j = 0; j < str.length; j++) {
        const ch = str[j];
        if (!inQuotes && (ch === '"' || ch === "'")) {
          inQuotes = true;
          quoteChar = ch;
          current += ch;
        } else if (inQuotes && ch === quoteChar) {
          inQuotes = false;
          current += ch;
        } else if (!inQuotes && ch === '(') {
          parenDepth++;
          current += ch;
        } else if (!inQuotes && ch === ')') {
          parenDepth--;
          current += ch;
        } else if (!inQuotes && ch === ',' && parenDepth === 0) {
          args.push(current.trim());
          current = '';
        } else {
          current += ch;
        }
      }
      if (current.trim()) {
        args.push(current.trim());
      }
      return args;
    };

    // Helper: evaluate print arguments (supports f-strings, comma-separated args, variable prints)
    const handlePrint = (argString) => {
      let raw = argString.trim();
      if (!raw) {
        outputs.push('');
        return;
      }

      // Check for f-string: f"..." or f'...'
      if ((raw.startsWith('f"') && raw.endsWith('"')) || (raw.startsWith("f'") && raw.endsWith("'"))) {
        let template = raw.slice(2, -1);
        let resolved = template.replace(/\{([^}]+)\}/g, (match, expr) => {
          try {
            const val = evaluateExpr(expr);
            if (typeof val === 'boolean') return val ? 'True' : 'False';
            return val;
          } catch (e) {
            return `[${e.message}]`;
          }
        });
        outputs.push(resolved);
        return;
      }

      // Comma-separated arguments: print("Student:", name, "Age:", age)
      const args = splitArgs(raw);
      if (args.length > 1) {
        const printedParts = args.map(arg => {
          try {
            const val = evaluateExpr(arg);
            if (typeof val === 'boolean') return val ? 'True' : 'False';
            return String(val);
          } catch (err) {
            return `[${err.message}]`;
          }
        });
        outputs.push(printedParts.join(' '));
        return;
      }

      // Single argument print
      try {
        const val = evaluateExpr(raw);
        if (typeof val === 'boolean') {
          outputs.push(val ? 'True' : 'False');
        } else {
          outputs.push(String(val));
        }
      } catch (err) {
        outputs.push(err.message);
      }
    };

    // Helper: execute a single general statement
    const executeStatement = (stmt) => {
      let trimmed = stmt.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
        handlePrint(trimmed.slice(6, -1));
        return;
      }

      if (trimmed.includes('=')) {
        const eqIdx = trimmed.indexOf('=');
        const varName = trimmed.slice(0, eqIdx).trim();
        const valExpr = trimmed.slice(eqIdx + 1).trim();

        if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(varName)) {
          env[varName] = evaluateExpr(valExpr);
          return;
        }
      }

      evaluateExpr(trimmed);
    };

    try {
      while (i < lines.length) {
        stepCount++;
        if (stepCount > maxIterations) {
          outputs.push(`\n[Execution halted: Loop limit exceeded to prevent browser freeze]`);
          break;
        }

        const rawLine = lines[i];
        const trimmed = rawLine.trim();

        // Skip comments or blank lines
        if (!trimmed || trimmed.startsWith('#')) {
          i++;
          continue;
        }

        // 1. Try - Except block
        if (trimmed.startsWith('try:')) {
          let tryBlock = [];
          let exceptBlock = [];
          let exceptType = null;
          let exceptVar = null;
          i++;

          // Collect lines indented under try
          while (i < lines.length && (lines[i].startsWith(' ') || lines[i].startsWith('\t') || lines[i].trim() === '')) {
            if (lines[i].trim()) tryBlock.push(lines[i].trim());
            i++;
          }

          // Check if followed by except
          if (i < lines.length && lines[i].trim().startsWith('except')) {
            const exceptLine = lines[i].trim();
            const m = exceptLine.match(/^except(?:\s+([A-Za-z0-9_]+))?(?:\s+as\s+([A-Za-z0-9_]+))?:?$/);
            if (m) {
              exceptType = m[1] || 'Exception';
              exceptVar = m[2] || null;
            } else {
              exceptType = 'Exception';
            }

            i++;
            while (i < lines.length && (lines[i].startsWith(' ') || lines[i].startsWith('\t') || lines[i].trim() === '')) {
              if (lines[i].trim()) exceptBlock.push(lines[i].trim());
              i++;
            }
          }

          // Execute statements inside tryBlock
          let errorOccurred = null;
          for (let stmt of tryBlock) {
            try {
              executeStatement(stmt);
            } catch (err) {
              errorOccurred = err;
              break; // Stop try block immediately on error
            }
          }

          if (errorOccurred) {
            // Check if except block is present and catches this error type
            const errName = errorOccurred.message.split(':')[0].trim();
            const isCaught = !exceptType || exceptType === 'Exception' || exceptType === 'BaseException' || errName === exceptType || errorOccurred.message.includes(exceptType);

            if (isCaught && exceptBlock.length > 0) {
              // Handled gracefully: DO NOT output [Caught Error] - standard Python suppresses handled errors
              if (exceptVar) {
                const rawMsg = errorOccurred.message.includes(':') 
                  ? errorOccurred.message.split(':').slice(1).join(':').trim() 
                  : errorOccurred.message;
                env[exceptVar] = rawMsg;
              }
              for (let stmt of exceptBlock) {
                try {
                  executeStatement(stmt);
                } catch (exceptErr) {
                  outputs.push(`RuntimeError in except handler: ${exceptErr.message}`);
                }
              }
            } else {
              // Uncaught exception!
              outputs.push(errorOccurred.message);
            }
          }

          continue;
        }

        // 2. If - Else block
        if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
          const conditionStr = trimmed.slice(3, -1);
          let conditionResult = false;
          try {
            conditionResult = Boolean(evaluateExpr(conditionStr));
          } catch (e) {
            outputs.push(`Condition Error: ${e.message}`);
          }

          let ifBlock = [];
          let elseBlock = [];
          i++;

          // Collect lines inside if block
          while (i < lines.length && (lines[i].startsWith(' ') || lines[i].startsWith('\t') || lines[i].trim() === '')) {
            if (lines[i].trim()) ifBlock.push(lines[i].trim());
            i++;
          }

          // Check if followed by else:
          if (i < lines.length && lines[i].trim().startsWith('else:')) {
            i++;
            while (i < lines.length && (lines[i].startsWith(' ') || lines[i].startsWith('\t') || lines[i].trim() === '')) {
              if (lines[i].trim()) elseBlock.push(lines[i].trim());
              i++;
            }
          }

          const targetBlock = conditionResult ? ifBlock : elseBlock;
          for (let stmt of targetBlock) {
            executeStatement(stmt);
          }
          continue;
        }

        // 3. For loop: for i in range(...)
        const loopMatch = trimmed.match(/^for\s+([A-Za-z0-9_]+)\s+in\s+range\((.+)\)\s*:$/);
        if (loopMatch) {
          const iterVar = loopMatch[1];
          const rangeCount = Math.min(50, Math.max(0, parseInt(evaluateExpr(loopMatch[2]), 10) || 0));

          let loopBody = [];
          i++;
          while (i < lines.length && (lines[i].startsWith(' ') || lines[i].startsWith('\t') || lines[i].trim() === '')) {
            if (lines[i].trim()) loopBody.push(lines[i].trim());
            i++;
          }

          outputs.push(`Running loop for ${rangeCount} iteration(s):`);
          for (let iter = 0; iter < rangeCount; iter++) {
            env[iterVar] = iter;
            for (let stmt of loopBody) {
              executeStatement(stmt);
            }
          }
          continue;
        }

        // 4. Any other statement (print, variable assignment, expression)
        executeStatement(trimmed);
        i++;
      }
    } catch (err) {
      const msg = err.message || String(err);
      outputs.push(msg.includes('Error:') ? msg : `RuntimeError: ${msg}`);
    }

    if (outputs.length === 1) {
      outputs.push(`[Execution finished with code 0 - No output printed]`);
    }

    return outputs.join('\n');
  }
}

// ==========================================
// 7. APP INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Presentation App
  window.presentation = new PresentationApp();

  // Slide 2: Flip the Circle Game
  new FlipGame();

  // Slide 4: Motivation Runner
  initMotivationRunner();

  // Slide 5: Interactive IDE
  new InteractiveIDE();

  // Slide 7: Application solution reveal & interactive penalty test
  document.getElementById('toggle-solution-btn')?.addEventListener('click', () => {
    const preview = document.getElementById('solution-preview-box');
    preview?.classList.toggle('blurred');
  });

  document.getElementById('test-penalty-btn')?.addEventListener('click', () => {
    const val = document.getElementById('input-overdue-days')?.value.trim();
    const out = document.getElementById('penalty-console-out');
    if (!out) return;
    const parsed = Number(val);
    if (isNaN(parsed) || val === '') {
      out.textContent = ">>> Invalid input!";
      out.style.color = "#f43f5e";
    } else {
      const days = parseInt(parsed, 10);
      if (days > 0) {
        out.textContent = `>>> Fine: ${days * 10} Pesos`;
        out.style.color = "#4ade80";
      } else {
        out.textContent = `>>> Fine: 0 Pesos (No overdue)`;
        out.style.color = "#38bdf8";
      }
    }
  });

  // Slide 8: Evaluation Quiz Reveals
  document.querySelectorAll('.reveal-ans-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playTone(600, 'sine', 0.08, 0.06);
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.toggle('show');
        btn.textContent = target.classList.contains('show') ? 'Hide Answer' : 'Show Answer';
      }
    });
  });

  document.getElementById('reveal-all-quiz-btn')?.addEventListener('click', () => {
    sfx.match();
    const drawers = document.querySelectorAll('.quiz-ans-drawer');
    const allShown = Array.from(drawers).every(d => d.classList.contains('show'));
    drawers.forEach(d => {
      d.classList.toggle('show', !allShown);
    });
    document.querySelectorAll('.reveal-ans-btn').forEach(b => {
      b.textContent = !allShown ? 'Hide Answer' : 'Show Answer';
    });
  });
});
