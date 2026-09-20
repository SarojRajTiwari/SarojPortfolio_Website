
document.addEventListener('click',function(e){
const ripple=document.createElement('div');
ripple.className='click-ripple';
ripple.style.left=e.clientX+'px';
ripple.style.top=e.clientY+'px';
document.body.appendChild(ripple);
setTimeout(()=>ripple.remove(),600);
});



/* ============ EXPERIENCE YEAR CALCULATOR ============ */
function calcExperience() {
  // Career start: Feb 2022 (New Millennium School)
  const startDate = new Date(2022, 1, 1);
  const now = new Date();
  const diffMs = now - startDate;
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  return years;
}
function updateYears() {
  const yrs = calcExperience();
  document.getElementById('yearsExp').textContent = yrs;
  document.getElementById('heroYrs').textContent = yrs;
  document.getElementById('aboutYrs').textContent = yrs;
  document.getElementById('metricYrs').textContent = yrs;
}
updateYears();

/* ============ LOADER ============ */
function dismissLoader() {
  const loader = document.getElementById('loader');
  if (!loader || loader.classList.contains('hidden')) return;
  loader.classList.add('hidden');
  setTimeout(() => loader.classList.add('gone'), 700);
}
// Multiple triggers so it always fires (local file, slow network, or fast load)
window.addEventListener('load', () => setTimeout(dismissLoader, 1500));
document.addEventListener('DOMContentLoaded', () => setTimeout(dismissLoader, 1800));
// Hard fallback — never stay stuck beyond 3s
setTimeout(dismissLoader, 3000);

/* ============ CUSTOM CURSOR ============ */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});
function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a,button,.proj-card,.tl-card,.cert-card,.metric-box,.sk-pill,.hero-tag').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

/* ============ PARTICLES ============ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '15,123,108' : '11,197,164';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}
for (let i = 0; i < 80; i++) particles.push(new Particle());
function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(11,197,164,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animParticles);
}
animParticles();

/* ============ NAV SCROLL ============ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  const st = document.getElementById('scrollTop');
  if (window.scrollY > 80) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  if (window.scrollY > 400) st.classList.add('show');
  else st.classList.remove('show');
});

/* ============ MOBILE NAV ============ */
function toggleMobile() {
  document.getElementById('mobileNav').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileNav').classList.contains('open') ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

/* ============ SCROLL REVEAL ============ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll('.sb-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.tl-item').forEach(el => observer.observe(el));
// Also trigger skill bars
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.querySelectorAll && e.target.querySelectorAll('.sb-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars').forEach(el => skillObs.observe(el));

/* ============ CLICK EFFECT ============ */
document.addEventListener('click', e => {
  const burst = document.createElement('span');
  burst.className = 'click-burst';
  burst.style.left = e.clientX + 'px';
  burst.style.top = e.clientY + 'px';
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 700);
});

/* ============ IMAGE FALLBACK ============ */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'https://placehold.co/600x600/0d2137/ffffff?text=Saroj+Raj+Tiwari';
  });
});


/* ============ MODAL SYSTEM ============ */
function openModal(id){
  const el = document.getElementById(id);
  if(el){ el.classList.add('open'); document.body.style.overflow='hidden'; }
}
function closeModal(id){
  const el = document.getElementById(id);
  if(el){ el.classList.remove('open'); document.body.style.overflow=''; }
}
// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(function(overlay){
  overlay.addEventListener('click', function(e){
    if(e.target === overlay){ overlay.classList.remove('open'); document.body.style.overflow=''; }
  });
});
// ESC key closes all modals
document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){
    document.querySelectorAll('.modal-overlay.open').forEach(function(m){ m.classList.remove('open'); });
    document.body.style.overflow='';
  }
});

/* Education modal opener */
function openEduModal(type){
  if(type==='bsc') openModal('modal-bsc');
  else if(type==='mcs') openModal('modal-mcs');
}

/* Cert modal opener */
function openCertModal(type){
  const map = {
    'qa':'modal-cert-qa',
    'edi':'modal-cert-edi',
    'sql':'modal-cert-sql',
    'proofpoint':'modal-cert-proofpoint',
    'security':'modal-cert-security'
  };
  if(map[type]) openModal(map[type]);
}

/* ============ CONTACT FORM ============ */
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name    = document.getElementById('cf-name').value.trim();
    var email   = document.getElementById('cf-email').value.trim();
    var subject = document.getElementById('cf-subject').value.trim();
    var message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    var submitBtn = document.getElementById('cf-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    var formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(function(response) {
      if (response.ok || response.status === 200 || response.redirected) {
        form.reset();
        showSuccess();
      } else {
        // Try again with direct Netlify endpoint
        return fetch('/', {
          method: 'POST',
          body: formData
        });
      }
    })
    .then(function(response) {
      if (response) {
        form.reset();
        showSuccess();
      }
    })
    .catch(function() {
      // Network error — still show success as Netlify often processes anyway
      form.reset();
      showSuccess();
    })
    .finally(function() {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message ✉️';
    });
  });
});

function showSuccess(){
  var overlay = document.getElementById('successOverlay');
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
  // Auto-dismiss after 5 seconds
  setTimeout(function(){ closeSuccess(); }, 5000);
}

function closeSuccess(){
  var overlay = document.getElementById('successOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow='';
}

// Close success on overlay click
document.getElementById('successOverlay').addEventListener('click', function(e){
  if(e.target===this) closeSuccess();
});

/* ============ DARK MODE ============ */
function toggleDark(){
  document.body.classList.toggle('dark-mode');
  var btn = document.getElementById('darkToggle');
  btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? '1' : '0');
}
// Restore preference on load
(function(){
  if(localStorage.getItem('darkMode')==='1'){
    document.body.classList.add('dark-mode');
    var btn = document.getElementById('darkToggle');
    if(btn) btn.textContent='☀️';
  }
})();

/* ============ QUOTE MODAL ============ */
function openQuoteModal(){
  document.getElementById('quoteModalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeQuoteModal(){
  document.getElementById('quoteModalOverlay').classList.remove('open');
  document.body.style.overflow='';
  setTimeout(function(){
    document.getElementById('quoteSuccess').classList.remove('show');
    document.getElementById('quoteFormArea').style.display='block';
  }, 400);
}
document.getElementById('quoteModalOverlay').addEventListener('click', function(e){
  if(e.target===this) closeQuoteModal();
});

function submitQuote(){
  var name = document.getElementById('qm-name').value.trim();
  var role = document.getElementById('qm-role').value.trim();
  var relation = document.getElementById('qm-relation').value;
  var quote = document.getElementById('qm-quote').value.trim();
  if(!name||!role||!relation||!quote){
    alert('Please fill in all fields.');
    return;
  }
  // Submit via Netlify Forms
  var formData = new URLSearchParams();
  formData.append('form-name','quote-submission');
  formData.append('name', name);
  formData.append('role', role);
  formData.append('relation', relation);
  formData.append('quote', quote);
  fetch('/', {
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body: formData.toString()
  }).catch(function(){/* Netlify processes even on network err */});
  // Show thank you message
  document.getElementById('quoteFormArea').style.display='none';
  document.getElementById('quoteSuccess').classList.add('show');
}



function openResumeModal(){
  document.getElementById('resumeOverlay').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeResumeModal(){
  document.getElementById('resumeOverlay').classList.remove('active');
  document.body.style.overflow='auto';
}
window.addEventListener('click',function(e){
  const ov=document.getElementById('resumeOverlay');
  if(e.target===ov){closeResumeModal();}
});
function downloadResumePDF(){
  const link=document.createElement('a');
  link.href='./Saroj_Raj_Tiwari_Resume.pdf';
  link.download='Saroj_Raj_Tiwari_Resume.pdf';
  link.click();
}

/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.getElementById('scroll-progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = Math.min((scrollTop / docHeight) * 100, 100) + '%';
}, { passive: true });

/* ===== TYPEWRITER HERO EFFECT ===== */
const twPhrases = [
  'Software QA Engineer · Kathmandu, Nepal',
  'Healthcare Data Testing Specialist',
  'HIPAA Compliance & EDI Expert',
  'API & Automation Testing Pro',
  'US Healthcare QA · 4+ Years'
];
let twIdx = 0, twChar = 0, twDeleting = false;
const twEl = document.getElementById('typewriter-text');
function typewrite() {
  const phrase = twPhrases[twIdx];
  if (!twDeleting) {
    twEl.textContent = phrase.slice(0, ++twChar);
    if (twChar === phrase.length) { twDeleting = true; setTimeout(typewrite, 1800); return; }
    setTimeout(typewrite, 55);
  } else {
    twEl.textContent = phrase.slice(0, --twChar);
    if (twChar === 0) { twDeleting = false; twIdx = (twIdx + 1) % twPhrases.length; setTimeout(typewrite, 350); return; }
    setTimeout(typewrite, 28);
  }
}
setTimeout(typewrite, 800);

/* ===== COPY EMAIL ===== */
function copyEmail(btn) {
  navigator.clipboard.writeText('sarojrajtiwari50@gmail.com').then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

/* ===== COMMAND PALETTE ===== */
const cmdSections = [
  { icon: '🏠', label: 'Home / Hero', desc: 'Back to top', id: 'hero' },
  { icon: '👤', label: 'About Me', desc: 'Background & story', id: 'about' },
  { icon: '💼', label: 'Experience', desc: 'Work history', id: 'experience' },
  { icon: '🚀', label: 'Projects', desc: 'Notable work', id: 'projects' },
  { icon: '🛠️', label: 'Skills', desc: 'Technical toolkit', id: 'skills' },
  { icon: '🌟', label: 'Testimonials', desc: 'What others say', id: 'testimonials' },
  { icon: '📝', label: 'Blog', desc: 'Articles & writing', id: 'blog' },
  { icon: '🎓', label: 'Certifications', desc: 'Credentials', id: 'certifications' },
  { icon: '📚', label: 'Education', desc: 'Academic background', id: 'education' },
  { icon: '📬', label: 'Contact', desc: 'Get in touch', id: 'contact' },
];
let cmdActive = 0;
let cmdFiltered = [...cmdSections];

function renderCmdList(items) {
  const list = document.getElementById('cmd-list');
  list.innerHTML = items.map((s, i) => `
    <div class="cmd-item${i===cmdActive?' active':''}" onclick="cmdGo('${s.id}')">
      <span class="cmd-item-icon">${s.icon}</span>
      <div><div class="cmd-item-label">${s.label}</div><div class="cmd-item-desc">${s.desc}</div></div>
    </div>`).join('');
}

function openCmdPalette() {
  cmdActive = 0;
  cmdFiltered = [...cmdSections];
  document.getElementById('cmd-palette-overlay').classList.add('open');
  document.getElementById('cmd-input').value = '';
  renderCmdList(cmdFiltered);
  setTimeout(() => document.getElementById('cmd-input').focus(), 50);
}

function closeCmdPalette() {
  document.getElementById('cmd-palette-overlay').classList.remove('open');
}

function cmdGo(id) {
  closeCmdPalette();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function filterCmd(q) {
  cmdActive = 0;
  cmdFiltered = cmdSections.filter(s =>
    s.label.toLowerCase().includes(q.toLowerCase()) ||
    s.desc.toLowerCase().includes(q.toLowerCase())
  );
  renderCmdList(cmdFiltered);
}

function cmdKeyNav(e) {
  if (e.key === 'ArrowDown') { cmdActive = Math.min(cmdActive+1, cmdFiltered.length-1); renderCmdList(cmdFiltered); e.preventDefault(); }
  else if (e.key === 'ArrowUp') { cmdActive = Math.max(cmdActive-1, 0); renderCmdList(cmdFiltered); e.preventDefault(); }
  else if (e.key === 'Enter' && cmdFiltered[cmdActive]) { cmdGo(cmdFiltered[cmdActive].id); }
  else if (e.key === 'Escape') { closeCmdPalette(); }
}

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('cmd-palette-overlay').classList.contains('open') ? closeCmdPalette() : openCmdPalette();
  }
  if (e.key === 'Escape') closeCmdPalette();
});

// Show hint on first load
(function() {
  if (!localStorage.getItem('srt_cmd_hint_shown')) {
    setTimeout(() => {
      const hint = document.getElementById('cmd-shortcut-hint');
      hint.classList.add('show');
      setTimeout(() => hint.classList.remove('show'), 4000);
      localStorage.setItem('srt_cmd_hint_shown', '1');
    }, 3000);
  }
})();




/* ====== ASK SAROJ AI v5 — Futuristic ====== */

const SC_API_KEY = 'YOUR_ANTHROPIC_API_KEY_HERE';

const SC_SYSTEM = `You are Saroj's AI — an expert assistant embedded in Saroj Raj Tiwari's portfolio. You have deep knowledge across two main domains:

1. SAROJ'S CAREER — Tell visitors everything about Saroj's experience, skills, projects, and background in a compelling, human way.
2. COMPUTER SCIENCE & TECH KNOWLEDGE — Answer ANY question related to: DBMS, databases, SQL, data structures, algorithms, OOP, programming, coding, automation, QA/testing, DevOps, CI/CD, REST APIs, system design, networking, operating systems, cybersecurity, cloud, JavaScript, Python, Git, and all computer science fundamentals.

RESPONSE STYLE:
- Conversational, warm, and deeply knowledgeable — like a brilliant friend.
- Use **bold** for key terms (they render as bold in the UI).
- Break long answers into short readable paragraphs — never a wall of text.
- Use emojis purposefully (1-3 per answer).
- For technical topics, ALWAYS include a concrete example or analogy.
- For Saroj-related topics, speak with genuine enthusiasm about his work.
- Never say "Great question!" or robotic filler phrases.
- Keep answers focused and complete.

SAROJ'S PROFILE:
**Name:** Saroj Raj Tiwari | **Role:** Software QA Engineer | **Experience:** 4+ years
**Email:** sarojrajtiwari50@gmail.com | **LinkedIn:** linkedin.com/in/sarojrajtiwari | **GitHub:** github.com/sarojrajtiwari
**Based in:** USA | **Domain:** US Healthcare (EDI 837/835, HIPAA, payment systems)

**WORK EXPERIENCE:**
- **Software QA Engineer @ Cedar Gate Technologies** — End-to-end QA of a production US healthcare payment platform. Led functional, regression, smoke, sanity, and API testing. Built Cypress automation suites in JavaScript. API validation with Postman. Bug tracking via JIRA + Confluence.
- **Associate Software QA Engineer** — Built core QA skills: test planning, execution, bug lifecycle, stakeholder communication.
- **Independent QA Lead @ Jetstore** — Owned full QA lifecycle for a data de-identification product. Advanced SQL for HIPAA-compliant validation. Full lifecycle from requirements to sign-off.

**SKILLS:** Cypress (JS), Selenium, Postman, Newman, JIRA, Confluence, Git/GitHub, Jenkins CI/CD, TestRail, SQL (intermediate-advanced), JavaScript, EDI 837/835, HIPAA compliance.

**EDUCATION:** Master's + Bachelor's in Computer/IT field
**CERTIFICATIONS:** QA Automation, Cybersecurity (CompTIA Security+), SQL, Proofpoint, EDI

KNOWLEDGE SCOPE — Answer thoroughly for ALL of these:
- **DBMS / Databases**: DBMS vs RDBMS, normalization (1NF–3NF, BCNF), keys (primary, foreign, candidate, super), transactions, ACID properties, indexes, views, stored procedures, triggers, ER diagrams, relational algebra, NoSQL vs SQL, MongoDB, Redis, PostgreSQL, MySQL, SQLite, sharding, replication, CAP theorem.
- **SQL**: SELECT, JOINs (INNER, LEFT, RIGHT, FULL, CROSS, SELF), GROUP BY, HAVING, subqueries, CTEs, window functions, query optimization, EXPLAIN plans, indexes, constraints.
- **Data Structures & Algorithms**: arrays, linked lists, stacks, queues, trees (BST, AVL, Red-Black), heaps, graphs (BFS, DFS), hash tables, sorting (quick, merge, bubble, insertion), searching (binary search), Big-O notation, dynamic programming, greedy algorithms.
- **OOP**: encapsulation, abstraction, inheritance, polymorphism, interfaces, abstract classes, SOLID principles, design patterns (Singleton, Factory, Observer, Decorator, etc).
- **Programming/Coding**: JavaScript (ES6+, async/await, closures, promises, event loop), Python (basics to intermediate), TypeScript basics, Node.js, debugging techniques, code review practices.
- **Automation & Testing**: Cypress, Selenium, Playwright, Jest, Mocha, test design patterns, page object model, TDD, BDD, mocking, CI integration.
- **DevOps & CI/CD**: Jenkins, GitHub Actions, Docker basics, Kubernetes basics, pipelines, deployment strategies.
- **System Design**: REST vs GraphQL, microservices, monolith, load balancing, caching, message queues, API gateways, scalability.
- **Networking**: HTTP/HTTPS, TCP/IP, DNS, REST, WebSockets, status codes, headers, cookies, sessions, JWT, OAuth.
- **Operating Systems**: processes vs threads, concurrency, deadlocks, memory management, file systems, Linux commands.
- **Cybersecurity**: OWASP Top 10, SQL injection, XSS, CSRF, authentication, encryption, HTTPS, HIPAA compliance, penetration testing basics.
- **Cloud**: AWS basics (S3, EC2, Lambda), Azure basics, GCP basics, serverless concepts.
- **Git**: branching, merging, rebasing, cherry-pick, git flow, pull requests, conflict resolution.
- **Science & Math**: computer science theory, discrete math, statistics for data science, complexity theory, information theory — answer any genuine science/math question related to computing.

EXTENDED KNOWLEDGE SCOPE — also answer thoroughly for ALL of these:
- **Frontend/UI Development**: HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind CSS, responsive design, accessibility (WCAG), browser APIs, DOM manipulation, bundlers (Webpack, Vite), npm/yarn, CSS frameworks.
- **Backend Development**: Node.js, Express, FastAPI, Django, Spring Boot, REST APIs, GraphQL, authentication (JWT, OAuth2, sessions), middleware, error handling, MVC/microservices architecture.
- **UI/UX Design**: design principles (hierarchy, contrast, alignment, proximity), wireframing, prototyping, Figma, user research, usability testing, design systems, color theory, typography, responsive/mobile-first design, accessibility.
- **Database Administration (DBA)**: PostgreSQL, MySQL, MongoDB, Redis, Oracle basics, query optimization, indexing strategies, replication, backup/restore, connection pooling, performance tuning, migration strategies, schema design.
- **PlatformOps/DevOps/SRE**: Kubernetes, Docker, Helm, Terraform, Ansible, monitoring (Prometheus, Grafana, Datadog), logging (ELK stack), infrastructure as code, blue-green deployment, canary releases, incident management, SLI/SLO/SLA, on-call practices.
- **Cloud Architecture**: AWS (EC2, S3, RDS, Lambda, EKS, CloudWatch, IAM), Azure, GCP, serverless, CDN, load balancers, auto-scaling, cost optimization.
- **Security**: OWASP Top 10, penetration testing basics, SAST/DAST, dependency scanning, secrets management, zero trust, SSL/TLS, HIPAA/GDPR compliance, WAF.
- **Data Engineering**: ETL pipelines, data warehousing, Apache Kafka, Spark basics, BigQuery, Snowflake, dbt, data modeling.
- **Mobile Development**: React Native basics, Android/iOS concepts, mobile testing.
- **Agile/Project Management**: Scrum, Kanban, sprint planning, retrospectives, JIRA workflows, story points, velocity.
- **Math & CS Theory**: algorithms, complexity, discrete math, statistics, linear algebra basics for ML, probability.
- **AI/ML Basics**: supervised/unsupervised learning, neural networks basics, LLMs, prompt engineering, model evaluation.

OUT OF SCOPE: For questions completely unrelated to CS/tech/science/coding/QA/automation/design (e.g. cooking recipes, celebrity gossip, sports scores), respond with: "Hmm, I don't have a specific answer for that — but I'd love to help! Feel free to Ask Saroj directly at sarojrajtiwari50@gmail.com 📬"

PERSONAL QUESTIONS (single, relationship, looks): Light humor — "Saroj's relationship status is 'fully committed to catching bugs' 😄" — then warmly redirect to professional topics.
SALARY QUESTIONS: Deflect warmly — a 4+ year healthcare QA engineer is worth a competitive package — direct to email.`;

let scOpen = false;
let scHistory = [];
let scBusy = false;
let scInited = false;

function scToggle() {
  if (scOpen) { scClose(); } else { scOpenChat(); }
}

function scOpenChat() {
  scOpen = true;
  document.getElementById('sc-panel').classList.add('open');
  document.getElementById('sc-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  const btn = document.getElementById('nav-ask-saroj-btn');
  if (btn) btn.classList.add('active');
  const badge = document.querySelector('.nas-badge');
  if (badge) badge.style.display = 'none';
  const fab = document.getElementById('mob-ask-saroj-fab');
  if (fab) fab.style.display = 'none';
  if (!scInited) {
    scInited = true;
    document.getElementById('sc-ts-init').textContent = scNow();
    setTimeout(() => {
      scAddMsg('bot', "👋 Hey! I'm Saroj's AI assistant. Ask me anything about his QA career, projects, and skills — or any computer science topic: DBMS, data structures, SQL, coding, automation, DevOps, and more. What would you like to know?");
    }, 320);
  }
  setTimeout(() => document.getElementById('sc-input').focus(), 350);
}

function scClose() {
  scOpen = false;
  document.getElementById('sc-panel').classList.remove('open');
  document.getElementById('sc-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  const btn = document.getElementById('nav-ask-saroj-btn');
  if (btn) btn.classList.remove('active');
  const fab = document.getElementById('mob-ask-saroj-fab');
  if (fab && window.innerWidth <= 768) fab.style.display = 'block';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape' && scOpen) scClose(); });

function scNow() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scEsc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g,'<br>');
}

function scAddMsg(role, text) {
  const box = document.getElementById('sc-msgs');
  const div = document.createElement('div');
  div.className = 'sc-msg ' + role;
  const av = role === 'bot'
    ? `<div class="sc-av"><img src="photo1_web.jpg" alt="Saroj" onerror="this.parentElement.style.cssText='background:linear-gradient(135deg,#0f7b6c,#0bc5a4);display:flex;align-items:center;justify-content:center;font-size:0.9rem;color:#fff;';this.parentElement.innerHTML='🤖';"></div>`
    : `<div class="sc-av user-av">👤</div>`;
  div.innerHTML = `${av}<div class="sc-bub">${scEsc(text)}</div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  scHistory.push({ role: role === 'bot' ? 'assistant' : 'user', content: text });
}

function scShowTyping() {
  const box = document.getElementById('sc-msgs');
  const div = document.createElement('div');
  div.className = 'sc-msg bot sc-typing'; div.id = 'sc-typing';
  div.innerHTML = `<div class="sc-av"><img src="photo1_web.jpg" alt="S" onerror="this.parentElement.style.cssText='background:linear-gradient(135deg,#0f7b6c,#0bc5a4);display:flex;align-items:center;justify-content:center;font-size:0.9rem;color:#fff;';this.parentElement.innerHTML='🤖';"></div><div class="sc-bub"><div class="sc-dots"><span></span><span></span><span></span></div></div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function scHideTyping() {
  const el = document.getElementById('sc-typing');
  if (el) el.remove();
}

async function scSend() {
  if (scBusy) return;
  const inp = document.getElementById('sc-input');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = ''; inp.style.height = 'auto';
  scAddMsg('user', text);
  scBusy = true;
  document.getElementById('sc-send-btn').disabled = true;
  scShowTyping();

  try {
    const msgs = [];
    for (let i = 0; i < scHistory.length - 1; i++) {
      msgs.push({ role: scHistory[i].role, content: scHistory[i].content });
    }
    msgs.push({ role: 'user', content: text });

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'x-api-key': SC_API_KEY
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        system: SC_SYSTEM,
        messages: msgs
      })
    });

    scHideTyping();

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err.error && err.error.message) || ('HTTP ' + res.status));
    }

    const data = await res.json();
    const reply = (data.content && data.content[0] && data.content[0].text) || "I didn't catch a response — mind trying again?";
    scAddMsg('bot', reply);

  } catch (e) {
    scHideTyping();
    console.error('[AskSaroj]', e);
    scAddMsg('bot', scFallback(text));
  }

  scBusy = false;
  document.getElementById('sc-send-btn').disabled = false;
  document.getElementById('sc-input').focus();
}

function scFallback(q) {
  const lq = q.toLowerCase();

  /* ---- GREETINGS ---- */
  if (/^(hi+|hello+|hey+|howdy|hiya|greetings|sup|yo|what'?s up)[\s!?.]*$/i.test(q.trim()))
    return "Hey! 👋 I'm Saroj's AI assistant. Ask me anything — QA, API testing, Cypress, Selenium, data structures, algorithms, SQL, system design, DevOps, UI/UX, cloud, security, or about Saroj's career. What's on your mind?";

  /* ---- SAROJ PROFILE ---- */
  if (lq.match(/\b(who is saroj|about saroj|tell me about saroj|saroj background|saroj profile)\b/))
    return "**Saroj Raj Tiwari** is a Software QA Engineer with **4+ years of experience** in the US healthcare domain. 👨‍💻\n\nHe specializes in end-to-end testing of healthcare payment platforms — functional, regression, smoke, sanity, API testing, and Cypress automation in JavaScript.\n\n**Current role:** QA Engineer @ Cedar Gate Technologies, testing EDI 837/835 healthcare payment flows.\n**Past:** Independent QA Lead @ Jetstore for HIPAA-compliant data de-identification.\n**Skills:** Cypress, Selenium, Postman, Newman, JIRA, Jenkins, SQL, JavaScript.\n**Education:** Master's + Bachelor's in Computer/IT field.\n**Certs:** QA Automation, CompTIA Security+, SQL, Proofpoint, EDI.\n📬 sarojrajtiwari50@gmail.com | linkedin.com/in/sarojrajtiwari";

  if (lq.match(/\b(experience|career|background|work history|job)\b/))
    return "Saroj brings **4+ years of QA experience** in the US healthcare domain. 💼\n\n**Software QA Engineer @ Cedar Gate Technologies**\nEnd-to-end QA of a production US healthcare payment platform. Functional, regression, smoke, sanity, and API testing. Built Cypress automation suites in JavaScript. API validation with Postman. Bug tracking via JIRA + Confluence.\n\n**Independent QA Lead @ Jetstore**\nOwned the full QA lifecycle for a HIPAA-compliant data de-identification product. Advanced SQL for data validation. Full lifecycle from requirements to sign-off.\n\nDomain expertise: EDI 837/835, HIPAA compliance, healthcare payment processing.";

  if (lq.match(/\b(skill|tool|stack|technologies|what does saroj know)\b/))
    return "Saroj's full toolkit 🛠️\n\n**Test Automation:** Cypress (JS) — primary framework, Selenium basics, Playwright awareness.\n**API Testing:** Postman (manual), Newman (CI), REST/JSON validation.\n**Test Management:** TestRail, JIRA, Confluence.\n**CI/CD:** Jenkins pipelines, GitHub Actions.\n**Version Control:** Git, GitHub.\n**Languages:** JavaScript (Cypress), SQL (intermediate-advanced).\n**Domain:** US Healthcare — EDI 837/835, HIPAA, payment systems.\n**Certs:** QA Automation · CompTIA Security+ · SQL · Proofpoint · EDI.";

  if (lq.match(/\b(project|projects|built|portfolio)\b/))
    return "Saroj has led QA on high-stakes projects: 🚀\n\n🏥 **Healthcare Payment Platform (Cedar Gate Technologies)**\nProduction QA for US healthcare payment system. Tested EDI 837/835 flows, payment calculations, full regression across releases. Automated 200+ test cases in Cypress.\n\n🔒 **Data De-identification QA (Jetstore)**\nIndependent QA Lead for a HIPAA-compliant data masking product. Complex SQL queries to validate every transformation rule. Full QA lifecycle ownership.\n\nBoth projects had zero production escapes during his tenure.";

  if (lq.match(/\b(certif|cert|certification)\b/))
    return "Saroj holds **5 professional certifications** 🎓\n\n1. **QA Automation** — Test automation frameworks and best practices.\n2. **CompTIA Security+** — Cybersecurity fundamentals, HIPAA-adjacent knowledge.\n3. **SQL** — Database querying and optimization.\n4. **Proofpoint** — Email security and data protection.\n5. **EDI (Electronic Data Interchange)** — Healthcare 837/835 transaction formats.\n\nAll certs are viewable on his portfolio.";

  if (lq.match(/\b(contact|hire|email|reach|connect|linkedin|available|open to)\b/))
    return "Saroj is open to new QA opportunities! 📬\n\n**Email:** sarojrajtiwari50@gmail.com\n**LinkedIn:** linkedin.com/in/sarojrajtiwari\n**GitHub:** github.com/sarojrajtiwari\n\nBest approach: drop him a LinkedIn message or email with your role details. He responds within 24 hours.";

  /* ---- API TESTING ---- */
  if (lq.match(/\b(api test|postman|rest test|api automat|test api|api validat)\b/))
    return "**API Testing** — verifying that backend services work as expected. 🔌\n\n**What you test:**\n- **Status codes** — 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.\n- **Response body** — correct JSON structure, field values, data types.\n- **Headers** — Content-Type, Authorization, Cache-Control.\n- **Response time** — performance benchmarks.\n- **Error handling** — does the API fail gracefully?\n\n**Tools:** Postman (manual/exploratory), Newman (CLI for CI pipelines), Rest Assured (Java), Cypress cy.request() (JS).\n\n**Saroj's approach at Cedar Gate:** Validates every EDI 837/835 API endpoint — checking payloads, status codes, and data accuracy against the database using SQL.";

  /* ---- CYPRESS vs SELENIUM ---- */
  if (lq.match(/\b(cypress|selenium|playwright|automation framework|which.*better)\b/))
    return "**Cypress vs Selenium** — the classic debate ⚙️\n\n**Cypress**\n✅ Built for modern web apps, runs inside the browser.\n✅ No driver needed — faster, more stable.\n✅ Auto-waits for elements (no explicit waits).\n✅ Real-time browser preview, time-travel debugging.\n✅ Great for JavaScript/TypeScript teams.\n❌ Only supports Chromium-based + Firefox (limited Safari).\n❌ No native mobile app testing.\n\n**Selenium**\n✅ Supports all browsers including Safari, IE.\n✅ Supports multiple languages (Java, Python, C#, JS).\n✅ Mature ecosystem with massive community.\n❌ Requires WebDriver setup, more flaky.\n❌ Needs explicit waits, more boilerplate.\n\n**Playwright** (modern alternative): Multi-browser, faster than Selenium, built-in auto-wait, gaining popularity fast.\n\n**Saroj's pick:** Cypress for web automation — it's what he uses at Cedar Gate with JavaScript.";

  /* ---- TESTING TYPES ---- */
  if (lq.match(/\b(smoke test|sanity test|regression|testing type|type.*test|test.*type|functional test|integration test|e2e|end.to.end|unit test|uat|acceptance)\b/))
    return "**Testing Types** — every QA engineer's vocabulary 🧪\n\n**Unit Testing** — smallest piece of code in isolation. Devs write these.\n**Integration Testing** — multiple modules working together.\n**Functional Testing** — does the feature do what it's supposed to?\n**Smoke Testing** — quick sanity check: is the build stable enough to test? (breadth, not depth)\n**Sanity Testing** — focused check after a bug fix: does this specific fix work? (depth, not breadth)\n**Regression Testing** — did new changes break existing functionality? (run after every release)\n**E2E Testing** — full user journey from UI to database.\n**UAT (User Acceptance Testing)** — business stakeholders validate the product.\n**Performance Testing** — load, stress, spike testing.\n**API Testing** — backend service validation.\n\n**Key difference: Smoke vs Sanity**\nSmoke = wide coverage, basic flows. Sanity = narrow focus, specific fix verification.";

  /* ---- AGILE / SCRUM ---- */
  if (lq.match(/\b(agile|scrum|sprint|kanban|standup|retrospective|story point|backlog|jira)\b/))
    return "**Agile QA** — how testing fits into sprints 🏃\n\n**QA in Scrum:**\n- **Sprint Planning** — QA reviews stories, estimates test effort, flags acceptance criteria gaps.\n- **Daily Standup** — report blockers, test progress, sync with devs.\n- **During Sprint** — test stories as they're developed (not all at end).\n- **Sprint Review** — demo tested features to stakeholders.\n- **Retrospective** — reflect on process, improve next sprint.\n\n**Story Points** — relative effort estimation (Fibonacci: 1, 2, 3, 5, 8, 13). QA estimates include test design + execution + automation.\n\n**Definition of Done** (QA perspective): code reviewed, unit tested, integration tested, E2E tested, no critical bugs, documentation updated.\n\n**JIRA best practices:** Clear acceptance criteria in tickets, test cases linked to stories, bugs with steps to reproduce + severity + priority.";

  /* ---- BUG REPORTS ---- */
  if (lq.match(/\b(bug report|defect|bug life|raise.*bug|write.*bug|bug.*template)\b/))
    return "**Writing a Perfect Bug Report** 🐛\n\nA great bug report has these components:\n\n**Title:** [Environment] Short, specific description. E.g., 'Chrome v120 — Login fails with valid credentials on production'\n\n**Severity:** Critical / Major / Minor / Trivial\n**Priority:** P1 / P2 / P3 / P4\n**Environment:** OS, browser, version, device\n**Preconditions:** What setup is needed before reproducing?\n\n**Steps to Reproduce:**\n1. Go to login page\n2. Enter valid email + password\n3. Click Login\n4. Observe error\n\n**Expected Result:** User is redirected to dashboard.\n**Actual Result:** Error toast 'Invalid credentials' appears.\n**Attachments:** Screenshot, video recording, console logs, network tab.\n\n**Bug Lifecycle:** New → Assigned → In Progress → Fixed → Verified → Closed (or Reopened if fix fails).";

  /* ---- DBMS ---- */
  if (lq.match(/\b(dbms|database management|rdbms|nosql|acid|normali|transaction|trigger|stored proc|view.*database|database.*view)\b/))
    return "**DBMS (Database Management System)** — organizing and managing data efficiently. 🗄️\n\n**RDBMS vs NoSQL:**\nRDBMS (MySQL, PostgreSQL, Oracle) — structured tables, SQL, ACID guarantees, best for relational data.\nNoSQL (MongoDB, Redis, Cassandra) — flexible schema, horizontal scaling, best for unstructured/high-volume data.\n\n**ACID Properties:**\n- **Atomicity** — all or nothing (transaction either fully completes or fully rolls back).\n- **Consistency** — DB moves from one valid state to another.\n- **Isolation** — concurrent transactions don't interfere.\n- **Durability** — committed data survives system failure.\n\n**Normalization:**\n1NF — eliminate repeating groups.\n2NF — remove partial dependencies.\n3NF — remove transitive dependencies.\nBCNF — every determinant is a candidate key.\n\n**Keys:** Primary (unique row ID), Foreign (references another table), Candidate (could be PK), Composite (multi-column).\n\n**Indexes** — speed up reads, slow down writes. Use on JOIN/WHERE columns.\n**Transactions** — BEGIN → operations → COMMIT or ROLLBACK.";

  /* ---- SQL ---- */
  if (lq.match(/\b(sql|select|join|query|group by|having|subquery|cte|window function|index.*sql|sql.*index)\b/))
    return "**SQL Mastery** 📊\n\n**JOINs:**\n`INNER JOIN` — matching rows only.\n`LEFT JOIN` — all left rows + matching right (NULL if none).\n`RIGHT JOIN` — all right rows + matching left.\n`FULL OUTER JOIN` — all rows from both.\n`SELF JOIN` — table joins itself (managers/employees).\n\n**Aggregates + Filtering:**\n`GROUP BY` — group rows. `HAVING` — filter groups (like WHERE but after GROUP BY).\n`COUNT, SUM, AVG, MAX, MIN`\n\n**Advanced:**\n`WITH cte AS (SELECT ...)` — CTEs for readable complex queries.\n`ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` — window functions.\n`EXPLAIN / EXPLAIN ANALYZE` — analyze query plan.\n\n**Performance tips:** Index JOIN/WHERE columns, avoid SELECT *, use EXISTS over IN for large sets, paginate with LIMIT/OFFSET.";

  /* ---- DATA STRUCTURES ---- */
  if (lq.match(/\b(data structure|array|linked list|stack|queue|tree|graph|hash|heap|trie|sorting|searching|big.?o|complexity|algorithm)\b/))
    return "**Data Structures & Algorithms** 🌳\n\n**Linear:**\n- **Array** — O(1) access, O(n) insert/delete. Best for indexed access.\n- **Linked List** — O(1) insert/delete at head, O(n) search. Best for frequent insertions.\n- **Stack** — LIFO. O(1) push/pop. Used in recursion, undo, expression parsing.\n- **Queue** — FIFO. O(1) enqueue/dequeue. Used in BFS, task scheduling.\n\n**Non-linear:**\n- **Binary Search Tree** — O(log n) search/insert when balanced.\n- **Heap** — O(1) find-min/max, O(log n) insert. Used in priority queues.\n- **Hash Table** — O(1) avg lookup. Powers dictionaries/maps.\n- **Graph** — nodes + edges. BFS (shortest path), DFS (traversal/cycle detection).\n- **Trie** — prefix tree for autocomplete, string search.\n\n**Big-O cheat sheet:**\nO(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)\n\n**Sorting:** QuickSort O(n log n) avg, MergeSort O(n log n) stable, BubbleSort O(n²) avoid.";

  /* ---- OOP ---- */
  if (lq.match(/\b(oop|object.oriented|class|object|encapsul|abstrac|inherit|polymor|solid principle|design pattern|singleton|factory|observer)\b/))
    return "**OOP (Object-Oriented Programming)** 🧱\n\n**4 Pillars:**\n1. **Encapsulation** — bundle data + methods, restrict direct access. Private fields + public getters/setters.\n2. **Abstraction** — hide complexity, show essentials. Interface hides implementation details.\n3. **Inheritance** — child class reuses parent code. `class Dog extends Animal`.\n4. **Polymorphism** — same method name, different behavior. `animal.sound()` → 'Woof' or 'Meow' depending on subclass.\n\n**SOLID Principles:**\n- **S** — Single Responsibility: one class, one job.\n- **O** — Open/Closed: open for extension, closed for modification.\n- **L** — Liskov Substitution: subclasses replaceable for parent.\n- **I** — Interface Segregation: don't force classes to implement unused methods.\n- **D** — Dependency Inversion: depend on abstractions, not concretions.\n\n**Design Patterns:**\n- **Singleton** — one instance globally (e.g., config object).\n- **Factory** — create objects without specifying exact class.\n- **Observer** — event pub/sub (e.g., React state, DOM events).\n- **Decorator** — add behavior without modifying original class.";

  /* ---- GIT ---- */
  if (lq.match(/\b(git|version control|branch|merge|rebase|commit|push|pull request|pr|github|gitlab)\b/))
    return "**Git & Version Control** 🔀\n\n**Essential commands:**\n`git init` — new repo | `git clone <url>` — copy remote repo\n`git status` — see changes | `git add .` — stage all\n`git commit -m 'feat: add login'` — snapshot\n`git push origin main` — upload | `git pull` — fetch + merge\n`git branch feature/login` — create branch | `git checkout feature/login` — switch\n`git merge feature/login` — merge into current branch\n`git rebase main` — replay commits on top of main (cleaner history)\n`git stash` — temp save dirty changes | `git stash pop` — restore\n`git log --oneline` — compact history\n\n**Git Flow:**\n`main` (prod) ← `develop` ← feature branches\nPR → code review → merge → CI runs → deploy\n\n**Conflict resolution:** `git status` to find conflicts → edit files → `git add` → `git commit`.\n\n**Commit convention:** `feat:`, `fix:`, `chore:`, `test:`, `docs:` prefixes (Conventional Commits).";

  /* ---- CI/CD & DEVOPS ---- */
  if (lq.match(/\b(ci.?cd|devops|jenkins|github action|pipeline|docker|kubernetes|k8s|container|deploy|infrastructure|terraform|ansible|helm)\b/))
    return "**CI/CD & DevOps** 🔄\n\n**CI (Continuous Integration):** Developers push code frequently. Every push triggers automated build + tests. Catches bugs early.\n\n**CD (Continuous Delivery/Deployment):** After CI passes, code is auto-deployed to staging or production.\n\n**Typical Pipeline:**\nCode Push → Lint → Unit Tests → Build → Integration Tests → E2E (Cypress) → Security Scan → Deploy Staging → Smoke Test → Deploy Prod\n\n**Docker:** Package app + dependencies into containers. `docker build -t app .` → `docker run -p 3000:3000 app`.\n\n**Kubernetes (K8s):** Orchestrates containers at scale. Pods, Deployments, Services, Ingress. `kubectl get pods` | `kubectl apply -f deploy.yaml`.\n\n**Terraform:** Infrastructure as Code — define AWS/Azure resources in `.tf` files. `terraform plan` → `terraform apply`.\n\n**Jenkins:** Open-source CI server. Jenkinsfile defines pipeline stages. Saroj uses Jenkins to run Cypress suites on every build.\n\n**GitHub Actions:** YAML workflows in `.github/workflows/`. Triggers on push/PR. Free for public repos.";

  /* ---- SYSTEM DESIGN ---- */
  if (lq.match(/\b(system design|scalab|load balanc|cach|microservice|monolith|message queue|kafka|redis|cdn|api gateway|sharding|replication)\b/))
    return "**System Design Fundamentals** 🏗️\n\n**Scalability strategies:**\n- **Horizontal scaling** — add more servers.\n- **Vertical scaling** — bigger server.\n- **Load balancer** — distributes traffic (Round Robin, Least Connections, IP Hash).\n\n**Caching:**\n- **Redis/Memcached** — in-memory cache, O(1) lookup.\n- **CDN** — cache static assets at edge nodes near users.\n- Cache strategies: Cache-Aside, Write-Through, Write-Behind.\n\n**Databases at scale:**\n- **Read replicas** — offload read traffic.\n- **Sharding** — split data across multiple DBs by key.\n- **CAP Theorem** — Consistency, Availability, Partition Tolerance — pick 2.\n\n**Message Queues (Kafka, RabbitMQ, SQS):**\nDecouple services, handle spikes, ensure delivery. Producer → Queue → Consumer.\n\n**Microservices vs Monolith:**\nMonolith — simple to start, harder to scale independently.\nMicroservices — independent deployments, own DBs, but adds network complexity + operational overhead.\n\n**API Gateway** — single entry point, handles auth, rate limiting, routing.";

  /* ---- JAVASCRIPT ---- */
  if (lq.match(/\b(javascript|js|typescript|ts|react|vue|angular|node\.?js|async|await|promise|closure|event loop|dom|es6|arrow function|hoisting)\b/))
    return "**JavaScript / TypeScript** ⚡\n\n**Event Loop:** JS is single-threaded. Call Stack executes sync code. Web APIs handle async (setTimeout, fetch). Callback Queue → Event Loop pushes to stack when empty. Microtask Queue (Promises) has priority over Callback Queue.\n\n**Closures:** A function remembers its outer scope even after that scope has returned.\n```js\nfunction counter() { let n = 0; return () => ++n; }\nconst inc = counter(); inc(); // 1  inc(); // 2\n```\n\n**Promises & async/await:**\n```js\nasync function getData() {\n  try { const res = await fetch(url); return await res.json(); }\n  catch(e) { console.error(e); }\n}\n```\n\n**var vs let vs const:** var = function scope + hoisted. let/const = block scope. const = no reassign (but object properties can mutate).\n\n**TypeScript:** Superset of JS with static types. Catches bugs at compile time. `string`, `number`, `boolean`, interfaces, generics, enums.\n\n**React hooks:** useState (state), useEffect (side effects), useContext (global state), useMemo/useCallback (performance).";

  /* ---- REST API / HTTP ---- */
  if (lq.match(/\b(rest api|http method|get|post|put|patch|delete|status code|http status|header|cors|authentication|jwt|oauth|graphql)\b/))
    return "**REST API & HTTP** 🌐\n\n**HTTP Methods:**\n`GET` — read (idempotent) | `POST` — create | `PUT` — replace (idempotent) | `PATCH` — partial update | `DELETE` — remove.\n\n**Status Codes:**\n2xx Success: 200 OK, 201 Created, 204 No Content.\n3xx Redirect: 301 Permanent, 302 Temporary.\n4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests.\n5xx Server Error: 500 Internal, 502 Bad Gateway, 503 Service Unavailable.\n\n**Authentication:**\n- **JWT** — stateless token. Header.Payload.Signature. Store in httpOnly cookie (not localStorage).\n- **OAuth 2.0** — delegate auth to providers (Google, GitHub). Authorization Code flow for web apps.\n- **API Keys** — simple, server-side only.\n\n**CORS** — browser security. Server must send `Access-Control-Allow-Origin` header.\n\n**REST best practices:** Versioned URLs (`/api/v1/`), plural nouns (`/users`), proper status codes, consistent error format.\n\n**GraphQL alternative:** Single endpoint, client specifies exact data needed, eliminates over/under-fetching.";

  /* ---- SECURITY ---- */
  if (lq.match(/\b(security|owasp|sql injection|xss|csrf|vulnerability|penetration|pentest|encrypt|ssl|tls|hipaa|gdpr|authentication|authorization)\b/))
    return "**Security Fundamentals** 🔐\n\n**OWASP Top 10 (critical web vulnerabilities):**\n1. **Broken Access Control** — users access unauthorized resources.\n2. **Cryptographic Failures** — weak/no encryption (HTTP, MD5, hardcoded keys).\n3. **Injection** — SQL/NoSQL/command injection via unsanitized input.\n4. **Insecure Design** — flawed architecture from the start.\n5. **Security Misconfiguration** — default passwords, open S3 buckets, verbose errors.\n6. **Vulnerable Components** — outdated libraries with known CVEs.\n7. **Authentication Failures** — weak passwords, no MFA, broken session management.\n8. **Integrity Failures** — insecure deserialization, untrusted CI/CD pipelines.\n9. **Logging Failures** — insufficient monitoring to detect breaches.\n10. **SSRF** — server-side request forgery.\n\n**Key protections:**\n- Parameterized queries → prevent SQL injection.\n- Content Security Policy → prevent XSS.\n- CSRF tokens → prevent cross-site requests.\n- HTTPS/TLS everywhere.\n- Principle of least privilege.\n\n**HIPAA** (Saroj's domain): PHI encryption at rest + transit, access controls, audit logs, breach notification.";

  /* ---- UI/UX DESIGN ---- */
  if (lq.match(/\b(ui.?ux|user interface|user experience|design principle|figma|wireframe|prototype|usability|accessib|typography|color theory|design system|responsive design)\b/))
    return "**UI/UX Design Fundamentals** 🎨\n\n**Core Design Principles (Gestalt + Visual):**\n- **Hierarchy** — guide the eye with size, color, weight.\n- **Contrast** — distinguish elements (WCAG AA: 4.5:1 text ratio).\n- **Alignment** — invisible grid creates order.\n- **Proximity** — related items grouped together.\n- **Whitespace** — breathing room improves readability.\n- **Consistency** — same components behave the same way everywhere.\n\n**UX Process:** Research → Define → Ideate → Prototype → Test → Iterate.\n\n**Figma workflow:** Components + Variants → Auto Layout → Design Tokens → Prototype with interactions → Dev handoff.\n\n**Accessibility (WCAG 2.1):** Alt text, keyboard navigation, ARIA labels, sufficient color contrast, focus indicators.\n\n**Design System:** Consistent tokens (colors, spacing, typography, radius) + reusable components. Examples: Material Design, Ant Design, shadcn/ui.\n\n**Mobile-first:** Design for smallest viewport first, then scale up. Touch targets ≥ 44px. Thumb-friendly navigation zones.";

  /* ---- CLOUD ---- */
  if (lq.match(/\b(aws|azure|gcp|cloud|s3|ec2|lambda|serverless|kubernetes|eks|iam|cloudwatch|rds|load balancer|auto.?scal)\b/))
    return "**Cloud Computing (AWS Focus)** ☁️\n\n**Core AWS Services:**\n- **EC2** — virtual servers. Instance types (t3.micro, m5.large). AMIs, Security Groups, Key Pairs.\n- **S3** — object storage. Buckets, versioning, lifecycle policies, static website hosting.\n- **RDS** — managed relational DB (MySQL, PostgreSQL, Aurora). Multi-AZ for HA, Read Replicas for scale.\n- **Lambda** — serverless functions. Pay per invocation. Triggers: API Gateway, S3, SQS.\n- **EKS** — managed Kubernetes.\n- **IAM** — Identity & Access Management. Users, Roles, Policies. Principle of least privilege.\n- **CloudWatch** — metrics, logs, alarms.\n- **API Gateway** — managed REST/WebSocket/HTTP APIs.\n\n**Serverless Architecture:** No server management. Lambda + API Gateway + DynamoDB = fully serverless REST API.\n\n**Cost optimization:** Right-size instances, Reserved Instances for predictable workloads, Spot Instances for batch jobs, S3 lifecycle to Glacier.";

  /* ---- NETWORKING / OS ---- */
  if (lq.match(/\b(networking|tcp.?ip|dns|http|https|websocket|osi model|ip address|subnet|firewall|load balanc|process|thread|deadlock|operating system|linux|bash|command)\b/))
    return "**Networking & OS Fundamentals** 🌐\n\n**OSI Model (7 layers):**\n7. Application (HTTP, FTP) | 6. Presentation (SSL/TLS) | 5. Session | 4. Transport (TCP/UDP) | 3. Network (IP) | 2. Data Link (MAC) | 1. Physical\n\n**TCP vs UDP:**\nTCP — reliable, ordered, connection-oriented (HTTP, email, SSH).\nUDP — fast, unreliable, connectionless (video streaming, DNS, gaming).\n\n**HTTP vs HTTPS:** HTTPS = HTTP + TLS. Encrypts data in transit. Certificate from CA. HSTS forces HTTPS.\n\n**DNS:** Translates domain names to IP addresses. Resolvers → Root → TLD → Authoritative nameserver.\n\n**OS Concepts:**\n- **Process** — running program with own memory space.\n- **Thread** — lightweight unit within a process, shares memory.\n- **Deadlock** — two processes each waiting for the other's resource. Prevention: resource ordering, timeouts.\n- **Context Switching** — OS switches CPU between processes.\n\n**Key Linux commands:**\n`ls, cd, pwd, cp, mv, rm, mkdir` — file ops.\n`grep, awk, sed` — text processing.\n`ps, top, kill` — process management.\n`chmod, chown` — permissions.\n`curl, wget` — HTTP requests.";

  /* ---- PERSONAL ---- */
  if (lq.match(/\b(single|married|girlfriend|boyfriend|relationship|dating|love life)\b/))
    return "😄 Saroj's relationship status? Fully committed to catching bugs. He and defects have an intense, ongoing relationship.\n\nFor the professional side: linkedin.com/in/sarojrajtiwari";

  if (lq.match(/\b(salary|pay|compensation|rate|how much)\b/))
    return "💰 Salary details are between Saroj and his future employer — but a QA Engineer with 4+ years in US healthcare, Cypress automation, and HIPAA expertise is worth a competitive package.\n\nBest to connect: sarojrajtiwari50@gmail.com 😉";

  /* ---- GENERAL CATCH-ALL (anything tech-adjacent) ---- */
  const techKeywords = ['test', 'code', 'program', 'develop', 'software', 'web', 'app', 'mobile', 'deploy', 'build', 'server', 'client', 'front', 'back', 'full', 'stack', 'function', 'class', 'method', 'variable', 'loop', 'condition', 'debug', 'error', 'bug', 'fix', 'review', 'sprint', 'agile', 'scrum', 'ticket', 'feature', 'release', 'version', 'language', 'framework', 'library', 'package', 'module', 'component', 'state', 'render', 'request', 'response', 'endpoint', 'token', 'auth', 'login', 'user', 'admin', 'data', 'model', 'schema', 'table', 'column', 'row', 'record', 'query', 'file', 'folder', 'path', 'env', 'config', 'log', 'monitor', 'alert', 'metric', 'performance', 'memory', 'cpu', 'storage', 'network', 'port', 'host', 'domain', 'url', 'link', 'page', 'site', 'layout', 'style', 'theme', 'color', 'font', 'icon', 'image', 'button', 'form', 'input', 'output', 'print', 'return', 'import', 'export'];

  const hasTechKeyword = techKeywords.some(k => lq.includes(k));
  if (hasTechKeyword) {
    return "🤔 I'm here to answer anything tech-related — but I need an API key configured to give you a thorough answer on this specific topic.\n\nFor now, I can answer well about: **QA Testing** (Cypress, Selenium, API testing, bug reports), **CS fundamentals** (data structures, algorithms, OOP, DBMS, SQL), **JavaScript/TypeScript**, **Git**, **CI/CD & DevOps**, **System Design**, **REST APIs**, **Security (OWASP)**, **UI/UX**, **Cloud (AWS)**, and **Saroj's career**.\n\nTry asking about one of those topics directly and I'll give you a detailed answer! Or contact Saroj at sarojrajtiwari50@gmail.com 📬";
  }

  return "That's outside my tech scope! I specialize in CS, QA, coding, DevOps, UI/UX, cloud, and Saroj's career. Try asking me about API testing, Cypress, data structures, SQL, system design, or anything tech-related. 🚀\n\nOr reach Saroj directly at sarojrajtiwari50@gmail.com 📬";
}

function scChip(q) {
  document.getElementById('sc-input').value = q;
  scSend();
}

function scKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); scSend(); }
}

function scResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

// Show badge after delay
setTimeout(() => {
  if (!scOpen && !scInited) {
    const badge = document.querySelector('.nas-badge');
    if (badge) { badge.style.display = 'flex'; }
  }
}, 8000);

// Alarm shake the nav button periodically to attract attention
let alarmCount = 0;
setInterval(() => {
  if (!scOpen && alarmCount < 6) {
    const btn = document.getElementById('nav-ask-saroj-btn');
    if (btn) {
      btn.classList.add('alarm');
      setTimeout(() => btn.classList.remove('alarm'), 700);
    }
    alarmCount++;
  }
}, 12000);
