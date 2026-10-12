/* =========================================================
   Basag Katahimikan — VAWC Awareness Website
   Interactivity: menu, quick exit, animations, cards,
   accordion, tabs, self-check quiz, pledge wall
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. QUICK EXIT (safety feature) ----------
     Replaces this page in history so "Back" won't return here. */
  const SAFE_URL = "https://www.google.com/search?q=weather+today";
  const quickExit = () => window.location.replace(SAFE_URL);
  document.getElementById("quickExit").addEventListener("click", quickExit);

  let escCount = 0, escTimer;
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      escCount++;
      clearTimeout(escTimer);
      if (escCount >= 2) quickExit();
      escTimer = setTimeout(() => (escCount = 0), 800);
    }
  });

  /* ---------- 2. MOBILE MENU ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- 3. SCROLL REVEAL + COUNTERS + BARS ---------- */
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const bars = document.querySelectorAll(".bar");
  const maxBar = Math.max(...[...bars].map((b) => +b.dataset.value));
  const animateBars = () =>
    bars.forEach((b) => (b.style.width = (b.dataset.value / maxBar) * 100 + "%"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        el.querySelectorAll(".counter").forEach(animateCounter);
        if (el.querySelector(".bar")) animateBars();
        observer.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* ---------- 4. FORMS OF VIOLENCE (expand cards) ---------- */
  document.querySelectorAll(".form-card").forEach((card) =>
    card.addEventListener("click", () => {
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", open);
    })
  );

  /* ---------- 5. LAWS ACCORDION ---------- */
  document.querySelectorAll(".acc-head").forEach((head) =>
    head.addEventListener("click", () => {
      const item = head.parentElement;
      const open = item.classList.toggle("open");
      head.setAttribute("aria-expanded", open);
    })
  );

  /* ---------- 6. PROTECTION ORDER TABS ---------- */
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById(tab.dataset.tab).classList.add("active");
    })
  );

  /* ---------- 7. MYTH / FACT FLIP CARDS ---------- */
  document.querySelectorAll(".flip").forEach((card) =>
    card.addEventListener("click", () => card.classList.toggle("flipped"))
  );

  /* ---------- 8. SELF-CHECK QUIZ (nothing is saved or sent) ---------- */
  const quiz = document.getElementById("quiz");
  const result = document.getElementById("quizResult");
  quiz.addEventListener("submit", (e) => {
    e.preventDefault();
    const checked = quiz.querySelectorAll("input:checked").length;
    if (checked === 0) {
      result.innerHTML = `
        <div class="box ok">
          <p><strong>None of these signs were selected.</strong></p>
          <p>Healthy relationships are built on respect, trust, and safety. Keep learning the warning signs so you can help others who may need it.</p>
        </div>`;
    } else {
      result.innerHTML = `
        <div class="box warn">
          <p><strong>You selected ${checked} warning sign${checked > 1 ? "s" : ""}.</strong></p>
          <p>Some of these behaviors may count as psychological, economic, physical, or sexual abuse under RA 9262. What is happening is not your fault, and you deserve to be safe.</p>
          <p>You can talk to someone you trust, visit your Barangay VAW Desk, or call the <a href="tel:09197777377">Aleng Pulis Hotline (0919-777-7377)</a>. If you are in danger right now, call <a href="tel:911">911</a>.</p>
          <p><small>This self-check is for awareness only and is not a diagnosis or legal advice.</small></p>
        </div>`;
    }
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  document.getElementById("quizReset").addEventListener("click", () => (result.innerHTML = ""));

  /* ---------- 9. PLEDGE WALL (saved only in this browser) ---------- */
  const KEY = "vawc_pledges";
  const pledgeForm = document.getElementById("pledgeForm");
  const pledgeName = document.getElementById("pledgeName");
  const pledgeWall = document.getElementById("pledgeWall");
  const pledgeCount = document.getElementById("pledgeCount");

  const loadPledges = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  };
  const savePledges = (list) => {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* storage unavailable */ }
  };
  let pledges = loadPledges();

  const renderPledges = () => {
    pledgeWall.innerHTML = "";
    pledges.slice(-30).reverse().forEach((name) => {
      const li = document.createElement("li");
      li.textContent = "💜 " + name;   // textContent prevents HTML injection
      pledgeWall.appendChild(li);
    });
    pledgeCount.textContent = pledges.length;
  };
  renderPledges();

  pledgeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = pledgeName.value.trim();
    if (!name) return;
    pledges.push(name);
    savePledges(pledges);
    renderPledges();
    pledgeName.value = "";
  });

  /* ---------- 10. BACK TO TOP BUTTON ---------- */
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () =>
    toTop.classList.toggle("show", window.scrollY > 600)
  );
});
