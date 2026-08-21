import { ArrowUpRight, Download, FileText, Github, Linkedin, Mail, Menu, MessageCircle, Moon, Phone, Send, Sun, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";
import { useEffect, useState, type FormEvent } from "react";
import { buildContactEmailUrl, type ContactFormPayload } from "@/lib/contact";

/* Design: Reference-led dark build log with editorial data panels, amber status accents, and responsive reveal motion. */

type Project = {
  name: string;
  tagline: string;
  speciality: string;
  description: string;
  contribution: string;
  stack: string[];
  results?: { title: string; detail: string }[];
  status: "live" | "shipped" | "wip";
  statusLabel: string;
  theme: "luxury" | "industrial" | "warm" | "civic";
  link: string | null;
  linkLabel: string;
  github?: string;
};

const roles = [
  "Building web products that ship",
  "Studying AI & ML at IEC College, AKTU",
  "Freelancing on real client projects",
  "Shipping on a zero-budget stack",
];

const stats = [
  { count: 9, label: "projects built" },
  { count: 5, label: "Forage simulations" },
  { count: 2, label: "client builds shipped" },
  { count: 2029, label: "graduation year" },
];

const focusPoints = [
  {
    title: "Build for real users",
    description: "Every project on this page is either live for a client or fully functional end-to-end — not a tutorial clone.",
  },
  {
    title: "Keep the stack lean",
    description: "Static-first, free-tier backends, and an upgrade path — not infrastructure for infrastructure's sake.",
  },
  {
    title: "Own the whole build",
    description: "Frontend, backend, payments, admin panels, SEO — I'd rather learn the missing piece than hand it off.",
  },
];

const skillGroups = [
  { name: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Accessibility"] },
  { name: "Backend & Data", items: ["Node.js", "Express", "Supabase", "PostgreSQL", "SQLite"] },
  { name: "Payments & Deploy", items: ["Razorpay", "UPI", "Vercel", "Netlify", "GitHub Pages"] },
  { name: "AI & Automation", items: ["Prompt Engineering", "GPT-4o-mini API", "Claude API", "Make.com"] },
];

const projects: Project[] = [
  {
    name: "CampusTrack",
    tagline: "Attendance management platform for IEC College",
    speciality: "Campus operations — role-based attendance, secure QR/geofence check-in, reporting, and classroom-ready workflows.",
    description: "I built a full-stack attendance workspace for IEC College with student, teacher, and administrator workflows for check-in, monthly reporting, reminders, and CSV/Excel exports.",
    contribution: "I designed the role-based flows, attendance safeguards, reporting views, and installable experience end to end.",
    stack: ["React", "Node.js", "tRPC", "MySQL", "PWA"],
    results: [
      { title: "Secure attendance flow", detail: "Short-lived QR sessions and geofence validation help teachers record attendance with enrolment and duplicate safeguards." },
      { title: "Role-specific reporting", detail: "Students, teachers, and administrators can review monthly attendance with CSV/Excel exports and department or semester comparisons." },
      { title: "Classroom-ready UX", detail: "Light mode, personalized reminders, installable PWA support, and teacher keyboard shortcuts keep routine attendance work quick and clear." },
    ],
    status: "shipped",
    statusLabel: "managed deployment",
    theme: "civic",
    link: "https://iecattend-ay6ur7my.manus.space",
    linkLabel: "view live app",
  },
  {
    name: "Crocksy",
    tagline: "Full-stack luxury crockery e-commerce platform",
    speciality: "Commerce operations — authentication, cart, wishlist, checkout, and admin control in one storefront.",
    description: "I built and deployed a responsive e-commerce platform with authentication, cart, wishlist, checkout, and an owner administration flow, then moved its customer data path to Firebase.",
    contribution: "I owned the storefront UX, account flows, cart state, protected data migration, and production fixes.",
    stack: ["HTML/CSS/JS", "Supabase", "PostgreSQL", "Vercel"],
    results: [
      { title: "Customer account flow", detail: "Email/password and Google entry points, with mobile-sized password controls tested for clear touch targets." },
      { title: "Commerce workflow", detail: "Catalog, account-scoped cart and wishlist behavior, COD/manual UPI handoff, and protected checkout validation." },
      { title: "Trust-first storefront", detail: "Public ratings and testimonials were removed rather than invented; customer data stays behind Firebase controls." },
    ],
    status: "live",
    statusLabel: "live",
    theme: "luxury",
    link: "https://crocksy.vercel.app",
    linkLabel: "view project",
  },
  {
    name: "IRONCLASP",
    tagline: "E-commerce store for a hardware manufacturer client",
    speciality: "Hardware commerce operations — Firestore-backed catalog and orders, protected admin access, accurate payment states, and free-tier deployment design.",
    description: "I migrated this hardware-store product from local files to Firestore, then deployed its Node/Express storefront on a no-cost Vercel runtime with server-only Firebase credentials.",
    contribution: "I rebuilt persistence, protected admin and order routes, disabled unsafe free-tier uploads, and verified the deployed health and catalog endpoints.",
    stack: ["Vanilla JS", "Node.js", "Express", "Firestore", "Razorpay", "PWA", "Vercel"],
    results: [
      { title: "Firestore-backed state", detail: "Products, orders, stock changes, and backup metadata moved from local JSON into transactional Firestore operations." },
      { title: "Protected operations", detail: "Admin sessions are signed; unauthenticated order-record access is rejected by the deployed service." },
      { title: "Free-host ready", detail: "The production build uses host-managed secrets and approved image references instead of a paid disk or binary upload path." },
    ],
    status: "live",
    statusLabel: "live · Firestore-backed",
    theme: "industrial",
    link: "https://ironclasp-store-live.vercel.app",
    linkLabel: "view live site",
  },
  {
    name: "Pizza Connect",
    tagline: "Production ordering PWA for a local pizzeria & bakery in Khurja",
    speciality: "WhatsApp-first ordering — a 54-item menu, cart, payment intent, and direct outlet confirmation.",
    description: "I built a mobile-first ordering PWA for a Khurja outlet with a 54-item vegetarian menu, persistent cart, COD and UPI options, a WhatsApp confirmation handoff, and offline support.",
    contribution: "I implemented the menu experience, cart and payment-intent flow, offline-ready PWA support, and production typography refinements.",
    stack: ["HTML/CSS/JS", "PWA", "COD / UPI", "WhatsApp Ordering", "Vercel"],
    results: [
      { title: "Offline-ready storefront", detail: "Install-ready assets and a resilient cache keep the core menu experience available when connectivity is intermittent." },
      { title: "Clear WhatsApp handoff", detail: "The cart turns selected items and customer details into one order request for outlet confirmation before preparation." },
      { title: "Flexible payment intent", detail: "COD and UPI choices are captured before the order request, making the intended payment method clear to the outlet." },
    ],
    status: "live",
    statusLabel: "live",
    theme: "warm",
    link: "https://pizza-connect-pwa-crocksy.vercel.app",
    linkLabel: "view live site",
  },
  {
    name: "Tehsil Sahayak",
    tagline: "Bilingual civic-services guidance PWA for Uttar Pradesh residents",
    speciality: "Civic navigation — 20,160 source-traceable Hindi/English search phrasings linked to official service routes for certificates, land records, and grievances.",
    description: "I built a bilingual civic-service PWA that helps Uttar Pradesh residents search for the correct official route before visiting a tehsil office, with 20,160 labelled query phrasings that retrieve cited service cards rather than unsupported policy answers.",
    contribution: "I structured the plain-language service flows, bilingual retrieval index, source disclosures, responsive PWA shell, and official-link handoffs.",
    stack: ["JavaScript", "Bilingual UX", "PWA", "Source-traceable Search", "Official Service Links"],
    results: [
      { title: "20,160 search routes", detail: "Labelled Hindi and English search phrasings guide visitors to source-linked service cards without claiming to provide 20,160 official answers." },
      { title: "Official-route evidence", detail: "Each indexed phrasing maps to an existing service record with an official government URL and a displayed source-review date." },
      { title: "Privacy-first civic guidance", detail: "The product collects no application data, processes no payments, and directs visitors to confirm current requirements with the responsible authority." },
    ],
    status: "live",
    statusLabel: "live",
    theme: "civic",
    link: "https://tehsil-sahayak.vercel.app",
    linkLabel: "view live site",
  },
  {
    name: "NestNavi",
    tagline: "Trust-first hostel, PG & co-living finder for students and working professionals",
    speciality: "Verified listing operations — Firebase-backed public records, a device-only shortlist, and an authorised administrator workspace without fake bookings or sample properties.",
    description: "I built a browser-first hostel and PG finder whose public cards now load only from Firestore records marked as published. Until an authorised administrator reviews a genuine record, the live site presents an honest empty state instead of invented properties.",
    contribution: "I designed the transparent discovery and shortlist flows, owner-review handoff, Google-authenticated administrator workspace, Firestore access controls, and cache-safe PWA delivery.",
    stack: ["JavaScript", "Firebase", "Firestore", "Google Sign-In", "PWA", "Vercel"],
    results: [
      { title: "Genuine public inventory", detail: "The public finder queries only Firestore listings approved for publication; the live empty state is shown when no verified record is available." },
      { title: "Protected listing controls", detail: "A Google-authenticated workspace is restricted to the authorised owner account for creating, editing, publishing, unpublishing, or removing listing records." },
      { title: "Cache-safe release", detail: "The service worker now uses versioned network-first navigation, preventing a returning browser from continuing to receive retired sample-listing code." },
    ],
    status: "live",
    statusLabel: "live · Firestore-backed",
    theme: "civic",
    link: "https://nestnavi-hostel-pg-finder.vercel.app",
    linkLabel: "view live site",
  },
];

const moreProjects = [
  { name: "WebClient Hunter", status: "shipped", speciality: "Evidence-first prospect research", description: "A source-labelled prospect-research workspace with bounded OpenStreetMap discovery, separate heuristic website checks, and a clearly marked sample-data demo. The protected PageSpeed API source is released; its separately hosted production route remains under verification." },
  { name: "Build Before You're Ready", status: "shipped", speciality: "Beginner-first developer roadmap", description: "Self-published ebook guiding beginner developers from first line of code to junior-ready." },
  { name: "Birthday Surprise Site", status: "live", speciality: "Emotional interaction design", description: "A single-file interactive site built for my brother — animations, sound effects, and SVG art." },
];

const releaseSnapshot = [
  { state: "verified live", title: "Public releases", detail: "Pizza Connect, Tehsil Sahayak, NestNavi, IRONCLASP, the portfolio, and the WebClient Hunter frontend are available through their published public URLs." },
  { state: "source + frontend verified", title: "Protected route boundary", detail: "WebClient Hunter’s PageSpeed route is reviewed in source and its evidence-first frontend is live. The separately hosted protected API still needs an authenticated production check." },
  { state: "owner data / account test required", title: "Deliberate follow-up", detail: "NestNavi needs a genuine owner-authorised listing before a public contact link can be exercised. Crocksy’s remaining Google and checkout journey checks require a separate customer account and test-provider session." },
];

function AnimatedStat({ count, label, active }: { count: number; label: string; active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = count > 1000 ? 1000 : 700;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      setValue(Math.floor(progress * count));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, count]);

  return (
    <div className="stat">
      <div className="stat-number">{active ? value : 0}{count < 2029 ? "+" : ""}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ProjectMockup({ theme, name }: { theme: Project["theme"]; name: string }) {
  return (
    <div className={`project-mockup ${theme}`} aria-label={`${name} project preview`}>
      <div className="mockup-window">
        <div className="mockup-top"><span /><span /><span /></div>
        <div className="mockup-content">
          <div className="mockup-kicker">{name} / build-preview</div>
          <div className="mockup-heading">A working product, not a mockup.</div>
          <div className="mockup-lines"><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [contactForm, setContactForm] = useState<ContactFormPayload>({ name: "", email: "", topic: "freelance", message: "" });
  const [contactStarted, setContactStarted] = useState(false);
  const [contactStatus, setContactStatus] = useState("");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  useEffect(() => {
    let timer: number | undefined;
    const role = roles[roleIndex];
    let position = 0;
    setRoleText("");
    const type = () => {
      position += 1;
      setRoleText(role.slice(0, position));
      if (position < role.length) {
        timer = window.setTimeout(type, 38);
      } else {
        timer = window.setTimeout(() => setRoleIndex((index) => (index + 1) % roles.length), 2100);
      }
    };
    timer = window.setTimeout(type, 240);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [roleIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisibleSections((previous) => {
            const next = new Set(previous);
            next.add(entry.target.id);
            return next;
          });
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const trackContactStart = () => {
    if (contactStarted) return;
    setContactStarted(true);
    track("contact_form_started", { placement: "portfolio" });
  };

  const submitContactForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    track("contact_form_submitted", { placement: "portfolio", topic: contactForm.topic, handoff: "email_draft" });
    setContactStatus("Opening your email draft. Your message is not stored on this website.");
    window.location.href = buildContactEmailUrl(contactForm);
  };

  return (
    <div className="site-shell">
      <Analytics />
      <header className="site-nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" onClick={closeMenu}>tushar<span className="brand-accent">.dev</span></a>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
            {[
              ["About Me", "#about"],
              ["Toolkit", "#skills"],
              ["Build Log", "#projects"],
              ["Résumé", "#resume"],
              ["Let's Talk", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <span className="availability"><span className="status-dot" />Available for freelance work</span>
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === "light"}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Sun className="theme-icon theme-icon-sun" size={15} aria-hidden="true" />
              <span className="theme-track" aria-hidden="true"><span className="theme-thumb" /></span>
              <Moon className="theme-icon theme-icon-moon" size={14} aria-hidden="true" />
              <span className="sr-only">Current theme: {theme}. Toggle color theme.</span>
            </button>
            <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="reveal is-visible">
              <p className="eyebrow">Currently building · Khurja, UP, India</p>
              <h1>Tushar Solanki builds<br /><em>web products that work.</em></h1>
              <div className="rotating-line" aria-live="polite">{roleText}<span aria-hidden="true">_</span></div>
              <p className="hero-lede">Early-career Computer Science student and web developer building practical e-commerce, civic-tech, and SaaS products with <b>JavaScript, React, Node.js, Firebase, and responsive PWA patterns.</b></p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">View projects <ArrowUpRight className="btn-icon" size={15} /></a>
                <a className="btn" href="/Tushar_Solanki_Resume.pdf" download>Download résumé <Download className="btn-icon" size={15} /></a>
                <a className="btn" href="#contact">Say hello</a>
              </div>
            </div>

            <div className="profile-card reveal is-visible" aria-label="Tushar profile specification">
              <div className="window-bar"><span className="window-dot" /><span className="window-dot" /><span className="window-dot" /><span className="window-title">Profile.json</span></div>
              <div className="spec-list">
                {[
                  ["Role", "Freelance Web Developer"],
                  ["Study", "B.Tech CSE — AI & ML"],
                  ["Institute", "IEC College (AKTU)"],
                  ["Grad Year", "2029"],
                  ["Based In", "Khurja, UP, India"],
                  ["Stack", "JS · React · Node · Firebase"],
                  ["Status", "Open To Work"],
                ].map(([label, value]) => (
                  <div className="spec-row" key={label}>
                    <span className="spec-label">{label}</span>
                    <span className={`spec-value ${label === "Status" ? "highlight" : ""}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="stats-strip" id="stats" data-reveal>
          <div className="wrap stats-grid">
            {stats.map((stat) => <AnimatedStat key={stat.label} {...stat} active={visibleSections.has("stats")} />)}
          </div>
        </section>

        <section className="section" id="about" data-reveal>
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">About</p>
              <h2 className="section-title">From coursework to client deploys</h2>
              <p className="section-sub">The short version of how I got here, and what I actually spend my time on.</p>
            </div>
            <div className="about-grid">
              <div className="about-copy">
                <p>I'm a Computer Science student specializing in <b>AI & ML</b>, but most of my hands-on hours go into building and shipping <b>web products</b> — often for small, real businesses that just need something that works and doesn't cost them a monthly platform fee.</p>
                <p>That means I default to <b>lean, low-cost architectures</b>: vanilla HTML/CSS/JS, free-tier backends like Supabase, and hosting on Vercel or Netlify — with a deliberate upgrade path once a project actually needs one. I'd rather ship a fast, honest static site than an over-engineered one.</p>
                <p>Outside of client work, I run my own side projects — from a SaaS lead-gen tool for freelancers to a self-published developer ebook — as a way to practice product thinking, not just code.</p>
              </div>
              <div className="focus-list">
                {focusPoints.map((point, index) => (
                  <div className="focus-item" key={point.title}>
                    <span className="focus-index">0{index + 1}</span>
                    <div><h3 className="focus-title">{point.title}</h3><p className="focus-description">{point.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="skills" data-reveal>
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Skills</p>
              <h2 className="section-title">What I actually build with</h2>
              <p className="section-sub">Tools I reach for by default, grouped by what they're for.</p>
            </div>
            <div className="skill-grid">
              {skillGroups.map((group) => (
                <article className="skill-card" key={group.name}>
                  <h3 className="skill-name">{group.name}</h3>
                  <div className="skill-chips">{group.items.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects" data-reveal>
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Projects</p>
              <h2 className="section-title">Build log</h2>
              <p className="section-sub">A running log of what I've shipped — client work and personal builds alike.</p>
            </div>
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <ProjectMockup theme={project.theme} name={project.name} />
                  <div className="project-info">
                    <div className="project-topline"><span className={`project-status ${project.status}`}><span className="status-dot" />{project.statusLabel}</span><span className="project-status">{project.theme}</span></div>
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-tagline">{project.tagline}</p>
                    <div className="project-speciality"><span>Speciality</span><p>{project.speciality}</p></div>
                    <p className="project-description">{project.description}</p>
                    <p className="project-contribution"><b>My contribution:</b> {project.contribution}</p>
                    {project.results && (
                      <section className="project-results" aria-label={`${project.name} project results`}>
                        <p className="project-results-label">Project results</p>
                        <div className="project-results-grid">
                          {project.results.map((result) => (
                            <div className="project-result" key={result.title}>
                              <h4>{result.title}</h4>
                              <p>{result.detail}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    <div className="project-stack">{project.stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
                    <div className="project-evidence-links">
                      {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={14} /></a> : <span className="project-link">{project.linkLabel}</span>}
                      {project.github && <a className="project-link project-github" href={project.github} target="_blank" rel="noreferrer"><Github size={14} /> view source</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="more-grid">
              {moreProjects.map((project) => (
                <article className="more-card" key={project.name}>
                  <span className="more-status"><span className="status-dot" />{project.status}</span>
                  <h4>{project.name}</h4>
                  <p className="more-speciality">Speciality: {project.speciality}</p>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
            <section className="section" aria-labelledby="release-snapshot-title">
              <div className="section-heading">
                <p className="eyebrow">Release snapshot · August 2026</p>
                <h3 className="section-title" id="release-snapshot-title">What is live, and what still needs a real-world check</h3>
                <p className="section-sub">This snapshot separates verified public releases from source-verified work and tasks that legitimately require owner data, a separate customer account, or a provider test session.</p>
              </div>
              <div className="more-grid">
                {releaseSnapshot.map((item) => (
                  <article className="more-card" key={item.title}>
                    <span className="more-status"><span className="status-dot" />{item.state}</span>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="section section-alt" id="resume" data-reveal>
          <div className="wrap">
            <div className="resume-grid">
              <div>
                <div className="section-heading">
                  <p className="eyebrow">Résumé</p>
                  <h2 className="section-title">The one-page version</h2>
                  <p className="section-sub">For the full breakdown — education, project details, and simulations completed.</p>
                </div>
                <p className="resume-summary">B.Tech CSE (AI & ML) student, AKTU, expected 2029 — building and shipping client and personal web projects throughout.</p>
                <ul className="resume-highlights">
                  <li>9 shipped projects, from solo builds to client-facing e-commerce stores</li>
                  <li>Completed 5 professional simulations via Forage: EY, AIG, Tata, Mastercard, and Siemens</li>
                  <li>Comfortable owning a build end-to-end: frontend, backend, payments, and deployment</li>
                </ul>
                <a className="btn btn-primary" href="/Tushar_Solanki_Resume.pdf" download>Download résumé <FileText size={15} /></a>
              </div>
              <div className="resume-file">
                <div className="file-head"><span className="file-type"><FileText size={16} /> PDF</span><span className="file-size">24 KB</span></div>
                <h3 className="file-name">Tushar_Solanki_Resume.pdf</h3>
                <p className="file-meta">Updated Aug 2026</p>
                <a className="project-link" href="/Tushar_Solanki_Resume.pdf" target="_blank" rel="noreferrer">Preview document <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact" data-reveal>
          <div className="wrap">
            <div className="contact-panel">
              <div className="contact-intro">
                <p className="eyebrow">Contact</p>
                <h2 className="contact-title">Let's build something.</h2>
                <p className="contact-subtitle">Open to freelance projects, internships, and anything interesting in between.</p>
                <p className="contact-privacy">Use the form to prepare an email in your own mail app. This site does not store your contact details or message.</p>
              </div>
              <form className="contact-form" onSubmit={submitContactForm} onFocus={trackContactStart}>
                <div className="contact-form-grid">
                  <label>Your name<input required maxLength={80} autoComplete="name" value={contactForm.name} onChange={(event) => setContactForm((form) => ({ ...form, name: event.target.value }))} placeholder="Your name" /></label>
                  <label>Email address<input required type="email" maxLength={120} autoComplete="email" value={contactForm.email} onChange={(event) => setContactForm((form) => ({ ...form, email: event.target.value }))} placeholder="you@example.com" /></label>
                  <label className="contact-form-full">I'm reaching out about<select value={contactForm.topic} onChange={(event) => setContactForm((form) => ({ ...form, topic: event.target.value as ContactFormPayload["topic"] }))}><option value="freelance">A freelance project</option><option value="internship">An internship opportunity</option><option value="collaboration">A collaboration</option><option value="other">Something else</option></select></label>
                  <label className="contact-form-full">Message<textarea required maxLength={1000} rows={5} value={contactForm.message} onChange={(event) => setContactForm((form) => ({ ...form, message: event.target.value }))} placeholder="A few details about what you have in mind." /></label>
                </div>
                <div className="contact-form-footer"><button className="btn btn-primary" type="submit">Create email draft <Send size={15} /></button><p className="contact-status" aria-live="polite">{contactStatus}</p></div>
              </form>
              <div className="contact-actions" aria-label="Other ways to contact Tushar">
                <a className="contact-action" href="mailto:tusharsolanki9845@gmail.com"><span><Mail size={14} /> &nbsp;Email me</span><span>↗</span></a>
                <a className="contact-action" href="https://wa.me/916396015608?text=Hi%20Tushar%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20talk%20about%20a%20project." target="_blank" rel="noreferrer"><span><MessageCircle size={14} /> &nbsp;Chat on WhatsApp</span><span>usually replies within a day ↗</span></a>
                <a className="contact-action" href="tel:+916396015608"><span><Phone size={14} /> &nbsp;+91 63960 15608</span><span>↗</span></a>
                <a className="contact-action" href="https://github.com/tusharsolanki9845-dev" target="_blank" rel="noreferrer"><span><Github size={14} /> &nbsp;@tusharsolanki9845-dev</span><span>↗</span></a>
                <a className="contact-action" href="https://www.linkedin.com/in/tushar-solanki-915048370" target="_blank" rel="noreferrer"><span><Linkedin size={14} /> &nbsp;/in/tushar-solanki-915048370</span><span>↗</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© 2026 Tushar Solanki</span>
          <span className="footer-tagline">Built with HTML, CSS & JS.</span>
          <span>Available for freelance work · Khurja, UP</span>
        </div>
      </footer>
    </div>
  );
}
