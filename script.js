const weeks = [
  {
    title: "Digital onboarding & muscle memory",
    focus: "Device confidence · Keyboard and mouse",
    detail:
      "Get comfortable with computer parts, mouse control, keyboard patterns and basic text input. Learners practice creating and editing a simple document, then write a short response using a guided template.",
    bridge: "Children's rights: dignity, protection and participation.",
  },
  {
    title: "Internet navigation & jargon busting",
    focus: "Browser skills · Search · Digital language",
    detail:
      "Practice tabs, search phrases, URLs, browser navigation and evaluating whether a result is useful. Translate unfamiliar digital and learning terms into plain language.",
    bridge:
      "Wellbeing: recognizing academic pressure and mapping trusted support.",
  },
  {
    title: "Structural HTML elements",
    focus: "Web structure · Semantic elements",
    detail:
      "Use a browser-based sandbox to explore headings, paragraphs, links, lists and page sections. Build a simple page about a positive local community idea.",
    bridge:
      "Cyber safety: privacy, respectful conduct and responding to cyberbullying.",
  },
  {
    title: "Creative styling with CSS",
    focus: "Color · Typography · Layout",
    detail:
      "Change colors, text styles, spacing and alignment. Introduce responsive thinking by observing how a layout adapts to different screen sizes.",
    bridge:
      "Gender respect: inclusive participation and structured discussion.",
  },
  {
    title: "Interaction logic with JavaScript",
    focus: "Variables · Inputs · Conditions",
    detail:
      "Make a page respond to a button, read a simple input and use conditions to show feedback. Keep examples beginner-friendly and privacy-aware.",
    bridge:
      "Wellbeing: a supportive resource-finder concept, not a diagnostic tool.",
  },
  {
    title: "Capstone build & reflection",
    focus: "Create · Test · Present",
    detail:
      "Plan and build a small standalone project connected to a local learning or advocacy topic, test it, explain design choices and reflect on next steps.",
    bridge:
      "Community showcase: responsible storytelling and respectful collaboration.",
  },
];
const $ = (s) => document.querySelector(s);
const weekList = $("#weekList"),
  weekDetail = $("#weekDetail");
weeks.forEach((w, i) => {
  const b = document.createElement("button");
  b.className = "week-button" + (i === 0 ? " active" : "");
  b.role = "tab";
  b.setAttribute("aria-selected", String(i === 0));
  b.innerHTML = `<span class="week-num">0${i + 1}</span><span>Week ${i + 1}</span>`;
  b.addEventListener("click", () => selectWeek(i));
  weekList.append(b);
});
function selectWeek(i) {
  [...weekList.children].forEach((b, n) => {
    b.classList.toggle("active", n === i);
    b.setAttribute("aria-selected", String(n === i));
  });
  const w = weeks[i];
  weekDetail.innerHTML = `<div class="week-label">WEEK 0${i + 1} / LEARNING PATH</div><h3>${w.title}</h3><p>${w.detail}</p><span class="focus-pill">${w.focus}</span><p style="margin-top:22px"><strong style="color:#d8e8f7">Advocacy connection:</strong> ${w.bridge}</p>`;
}
selectWeek(0);
const menuToggle = $("#menuToggle"),
  nav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
document.querySelectorAll(".nav-link,.nav-cta,.brand").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }),
);
const topics = {
  wellbeing: [
    "Mental wellness",
    "Stress can affect concentration, sleep and motivation. Try naming what feels difficult, taking a manageable pause, and talking with someone you trust. This page is educational, not a mental-health assessment.",
  ],
  safety: [
    "Safer digital spaces",
    "Pause before sharing personal details. Save evidence of harmful online behavior when safe, block or report abusive accounts, and speak with a trusted adult or responsible support person. You deserve to use digital spaces without harassment.",
  ],
  rights: [
    "Children's rights",
    "Children and young people deserve dignity, protection, education and opportunities to be heard. Rights go together with respect for the safety and dignity of others.",
  ],
};
const dialog = $("#infoDialog");
document.querySelectorAll(".learn-more").forEach((b) =>
  b.addEventListener("click", () => {
    const t = topics[b.dataset.topic];
    $("#dialogTitle").textContent = t[0];
    $("#dialogText").textContent = t[1];
    dialog.showModal();
  }),
);
$("#dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
const starter = $("#codeEditor").value;
function runCode() {
  $("#codePreview").srcdoc = $("#codeEditor").value;
}
$("#runCode").addEventListener("click", runCode);
$("#resetCode").addEventListener("click", () => {
  $("#codeEditor").value = starter;
  runCode();
  toast("Starter example restored.");
});
runCode();
const questions = [
  {
    q: "Which HTML element is commonly used for the main page heading?",
    options: ["<h1>", "<footer>", "<meta>"],
    answer: 0,
    why: "Correct. <h1> represents the primary heading of a page or section.",
  },
  {
    q: "What is a good first response to cyberbullying?",
    options: [
      "Share the post widely",
      "Use platform safety tools and tell a trusted adult",
      "Reply with more insults",
    ],
    answer: 1,
    why: "Correct. Use reporting or blocking tools and seek trusted support rather than escalating.",
  },
  {
    q: "What does CSS mainly help control?",
    options: [
      "The visual presentation of a webpage",
      "The computer's battery",
      "A website's domain registration",
    ],
    answer: 0,
    why: "Correct. CSS controls presentation such as colors, spacing, typography and layout.",
  },
];
let qIndex = 0,
  answered = false,
  score = 0;
function renderQuestion() {
  answered = false;
  const q = questions[qIndex];
  $(".quiz-count").textContent = `QUESTION 0${qIndex + 1} / 03`;
  $("#quizQuestion").textContent = q.q;
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent =
    qIndex === 2 ? "See my result →" : "Next question →";
  $("#quizOptions").innerHTML = "";
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "quiz-option";
    b.textContent = opt;
    b.addEventListener("click", () => answer(i));
    $("#quizOptions").append(b);
  });
}
function answer(i) {
  if (answered) return;
  answered = true;
  const q = questions[qIndex];
  if (i === q.answer) score++;
  [...$("#quizOptions").children].forEach((b, n) => {
    b.disabled = true;
    if (n === i) b.classList.add("selected");
  });
  $("#quizFeedback").textContent =
    (i === q.answer ? "✓ " : "Not quite. ") + q.why;
  $("#nextQuestion").disabled = false;
}
function advanceQuestion() {
  if (!answered) return;
  if (qIndex < 2) {
    qIndex++;
    renderQuestion();
  } else {
    $("#quizBox").innerHTML =
      `<div class="quiz-count">CHECK-IN COMPLETE</div><h3>You scored ${score} out of 3.</h3><p class="quiz-feedback">Keep exploring. Understanding grows with practice, not perfection.</p><button class="button button-primary" id="retryQuiz">Try again ↻</button>`;
    $("#retryQuiz").addEventListener("click", () => {
      qIndex = 0;
      score = 0;
      $("#quizBox").innerHTML =
        '<div class="quiz-count"></div><h3 id="quizQuestion"></h3><div class="quiz-options" id="quizOptions"></div><p id="quizFeedback" class="quiz-feedback" aria-live="polite"></p><button class="button button-primary" id="nextQuestion" disabled>Next question →</button>';
      $("#nextQuestion").addEventListener("click", advanceQuestion);
      renderQuestion();
    });
  }
}
$("#nextQuestion").addEventListener("click", advanceQuestion);
renderQuestion();
$("#interestForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!e.currentTarget.reportValidity()) return;
  const name = $("#appName").value.trim();
  const age = $("#ageBand").value;
  const track = $("#interestTrack").value;
  $("#formMessage").textContent =
    `Demo summary for ${name}: age band ${age}, interest ${track}. No application was sent or saved. Official dates and admissions are not yet confirmed.`;
  toast("Demo summary created locally.");
});
document.querySelectorAll(".card-action").forEach((button) =>
  button.addEventListener("click", () => {
    $("#interestTrack").value = button.dataset.track;
    $("#apply").scrollIntoView({ behavior: "smooth", block: "start" });
    $("#interestTrack").focus({ preventScroll: true });
  }),
);
let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id,
            ),
          );
        }
      }),
    { rootMargin: "-35% 0px -55% 0px" },
  );
  sections.forEach((s) => observer.observe(s));
}
let learnerName = "";
let selectedTrack = "";
const trackOptions = {
  1: "Digital Foundations",
  2: "Web Creators",
  3: "Digital Ready",
};

const welcomeButton = document.getElementById("welcomeBtn");

if (welcomeButton) {
  welcomeButton.addEventListener("click", function (event) {
    event.preventDefault();

    learnerName = prompt("Welcome to Pixel Poa! What is your first name?");
    const cleanName = learnerName ? learnerName.trim() : "";

    if (!cleanName) {
      alert("Please enter your name to continue.");
      return;
    }

    learnerName = cleanName;
    selectedTrack = prompt(
      `Hello ${learnerName}! Which track interests you?\n1. Digital Foundations\n2. Web Creators\n3. Digital Ready`,
    );
    const normalizedTrack = selectedTrack ? selectedTrack.trim() : "";
    const trackLabel = trackOptions[normalizedTrack];

    if (trackLabel) {
      selectedTrack = trackLabel;
      alert(`Welcome to ${trackLabel}, ${learnerName}!`);
    } else {
      alert("Please select a valid track using 1, 2, or 3.");
    }
  });
}
