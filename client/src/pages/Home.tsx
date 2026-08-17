import { ArrowUpRight, FileText, Github, Linkedin, Mail, Menu, MessageCircle, Moon, Phone, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PwaInstall } from "../components/PwaInstall";

/* Design: Reference-led dark build log with editorial data panels, amber status accents, and responsive reveal motion. */

type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  results?: { title: string; detail: string }[];
  status: "live" | "shipped" | "wip";
  statusLabel: string;
  theme: "luxury" | "industrial" | "warm" | "civic";
  link: string | null;
  linkLabel: string;
};

const roles = [
  "Building web products that ship",
  "Studying AI & ML at IEC College, AKTU",
  "Freelancing on real client projects",
  "Shipping on a zero-budget stack",
];

const stats = [
  { count: 7, label: "projects built" },
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
    name: "Crocksy",
    tagline: "Full-stack luxury crockery e-commerce platform",
    description: "Personal flagship project — a deployed storefront with authentication, cart, wishlist, checkout, and a full admin dashboard, backed by Supabase/PostgreSQL.",
    stack: ["HTML/CSS/JS", "Supabase", "PostgreSQL", "Vercel"],
    status: "live",
    statusLabel: "live",
    theme: "luxury",
    link: "https://crocksy.vercel.app",
    linkLabel: "view project",
  },
  {
    name: "IRONCLASP",
    tagline: "E-commerce store for a hardware manufacturer client",
    description: "Full-stack build with Razorpay and UPI checkout, a password-protected admin panel, automated backups, and security hardening throughout.",
    stack: ["Vanilla JS", "Node.js", "Express", "Razorpay"],
    status: "shipped",
    statusLabel: "client build",
    theme: "industrial",
    link: null,
    linkLabel: "private client site",
  },
  {
    name: "Pizza Connect",
    tagline: "Production ordering PWA for a local pizzeria & bakery in Khurja",
    description: "A live, mobile-first ordering PWA with a 54-item vegetarian menu, food photography, persistent cart, COD and UPI options, and WhatsApp confirmation. The release includes offline support, install-ready PWA assets, responsive typography, and hardened production metadata.",
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
    tagline: "Civic-tech chatbot for Indian revenue-office services",
    description: "Helps citizens navigate tehsil/revenue office processes, with bilingual support and fuzzy search — iterated through a backend AI integration before settling on a fast static front-end architecture.",
    stack: ["JavaScript", "Fuzzy Search", "Bilingual UX"],
    status: "wip",
    statusLabel: "in progress",
    theme: "civic",
    link: null,
    linkLabel: "write-up coming soon",
  },
];

const moreProjects = [
  { name: "WebClient Hunter AI", status: "shipped", description: "SaaS lead-gen platform for freelancers and agencies — full CRM pipeline with AI-powered site audits." },
  { name: "Build Before You're Ready", status: "shipped", description: "Self-published ebook guiding beginner developers from first line of code to junior-ready." },
  { name: "Birthday Surprise Site", status: "live", description: "A single-file interactive site built for my brother — animations, sound effects, and SVG art." },
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

  return (
    <div className="site-shell">
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
            <PwaInstall />
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
              <h1>I ship things<br /><em>people actually use.</em></h1>
              <div className="rotating-line" aria-live="polite">{roleText}<span aria-hidden="true">_</span></div>
              <p className="hero-lede">I'm a B.Tech Computer Science (AI & ML) student who builds real, working products for real clients — e-commerce stores, civic-tech tools, and lean SaaS side projects — usually on a zero-budget stack with a clear path to scale.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">View projects <ArrowUpRight className="btn-icon" size={15} /></a>
                <a className="btn" href="#resume">Download résumé ↓</a>
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
                  ["Stack", "JS · Node · Supabase"],
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
                    <p className="project-description">{project.description}</p>
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
                    {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={14} /></a> : <span className="project-link">{project.linkLabel}</span>}
                  </div>
                </article>
              ))}
            </div>
            <div className="more-grid">
              {moreProjects.map((project) => (
                <article className="more-card" key={project.name}>
                  <span className="more-status"><span className="status-dot" />{project.status}</span>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
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
                  <li>7 shipped projects, from solo builds to client-facing e-commerce stores</li>
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
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="contact-title">Let's build something.</h2>
                <p className="contact-subtitle">Open to freelance projects, internships, and anything interesting in between.</p>
              </div>
              <div className="contact-actions">
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
