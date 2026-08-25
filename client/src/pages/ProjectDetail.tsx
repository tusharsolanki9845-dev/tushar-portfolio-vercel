import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";
import { useRoute } from "wouter";

import { projects } from "./Home";

const SITE_URL = "https://tushar-portfolio-live.vercel.app";
const DEFAULT_TITLE = "Tushar Solanki | Full-Stack Web Developer";
const DEFAULT_DESCRIPTION = "Tushar Solanki is an early-career full-stack web developer building verified e-commerce, civic-tech, and SaaS-style web products with JavaScript, React, Node.js, Firebase, and PWA patterns.";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

function restoreHomepageMeta() {
  document.title = DEFAULT_TITLE;
  setMeta("name", "description", DEFAULT_DESCRIPTION);
  setMeta("property", "og:title", DEFAULT_TITLE);
  setMeta("property", "og:description", "Verified project evidence across e-commerce, civic-tech, and SaaS-style web products.");
  setMeta("property", "og:url", `${SITE_URL}/`);
  setMeta("property", "og:type", "website");
  setMeta("property", "og:image", `${SITE_URL}/pwa/icon-512.png`);
  setMeta("name", "twitter:title", DEFAULT_TITLE);
  setMeta("name", "twitter:description", "Verified project evidence across e-commerce, civic-tech, and SaaS-style web products.");
  setCanonical(`${SITE_URL}/`);
}

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const project = projects.find((entry) => entry.slug === params?.slug);

  useEffect(() => {
    if (!project) {
      document.title = `Project not found | ${DEFAULT_TITLE}`;
      setMeta("name", "description", "This portfolio case study is not available. Return to Tushar Solanki’s published project collection.");
      setMeta("property", "og:title", `Project not found | ${DEFAULT_TITLE}`);
      setMeta("property", "og:description", "This portfolio case study is not available.");
      setMeta("property", "og:url", `${SITE_URL}/404`);
      setCanonical(`${SITE_URL}/404`);
      return;
    }

    const url = `${SITE_URL}/projects/${project.slug}`;
    const description = `${project.tagline}. ${project.description}`;
    document.title = `${project.name} | Tushar Solanki`;
    setMeta("name", "description", description);
    setMeta("property", "og:title", `${project.name} | Tushar Solanki`);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:image", project.previewImage ? `${SITE_URL}${project.previewImage}` : `${SITE_URL}/pwa/icon-512.png`);
    setMeta("name", "twitter:title", `${project.name} | Tushar Solanki`);
    setMeta("name", "twitter:description", description);
    setCanonical(url);

    const jsonLdId = "project-jsonld";
    const existingJsonLd = document.getElementById(jsonLdId);
    const jsonLd = (existingJsonLd ?? document.createElement("script")) as HTMLScriptElement;
    jsonLd.id = jsonLdId;
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description,
      url,
      creator: { "@type": "Person", name: "Tushar Solanki", url: SITE_URL },
      keywords: project.stack.join(", "),
      dateCreated: "2026",
    });
    if (!existingJsonLd) document.head.appendChild(jsonLd);

    return () => {
      restoreHomepageMeta();
      document.getElementById(jsonLdId)?.remove();
    };
  }, [project]);

  if (!project) {
    return (
      <main className="detail-shell" aria-labelledby="project-title">
        <nav className="detail-nav" aria-label="Case study navigation"><div className="wrap detail-nav-inner"><a className="brand" href="/">tushar<span className="brand-accent">.dev</span></a><a className="detail-back" href="/#projects"><ArrowLeft size={15} /> Back to build log</a></div></nav>
        <section className="detail-hero"><div className="wrap"><p className="detail-kicker">Project not found</p><h1 className="detail-title" id="project-title">This case study is not available.</h1><p className="detail-tagline">Return to the Build Log to explore the published project collection.</p></div></section>
      </main>
    );
  }

  return (
    <main className="detail-shell" aria-labelledby="project-title">
      <a className="skip-link" href="#case-study-content">Skip to case study</a>
      <nav className="detail-nav" aria-label="Case study navigation"><div className="wrap detail-nav-inner"><a className="brand" href="/">tushar<span className="brand-accent">.dev</span></a><a className="detail-back" href="/#projects"><ArrowLeft size={15} /> Back to build log</a></div></nav>
      <section className="detail-hero"><div className="wrap"><p className="detail-kicker">Portfolio case study · release {project.releaseDate}</p><h1 className="detail-title" id="project-title">{project.name}</h1><p className="detail-tagline">{project.tagline}</p></div></section>
      <section className="detail-section" id="case-study-content"><div className="wrap">
        {project.previewImage && <figure className="detail-preview"><img src={project.previewImage} alt={`${project.name} live interface preview`} /><figcaption>Selected view from the published interface.</figcaption></figure>}
        <article className="detail-summary-grid">
          <div><p className="detail-copy">{project.description}</p><p className="detail-contribution"><b>My contribution:</b> {project.contribution}</p><div className="detail-actions"><a className="project-link" href="/#projects"><ArrowLeft size={14} /> All projects</a>{project.link && <a className="project-link project-link-primary" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} <ExternalLink size={14} /></a>}{project.github && <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={14} /> View source</a>}</div></div>
          <aside className="detail-facts"><span>Release status</span><strong>{project.statusLabel}</strong><span>Speciality</span><strong>{project.speciality}</strong><span>Release date</span><strong>{project.releaseDate}</strong></aside>
        </article>
      </div></section>
      <section className="detail-section"><div className="wrap"><p className="detail-kicker">Evidence</p><h2 className="detail-section-title">What the project delivers</h2><div className="detail-results">{project.results?.map((result) => <article className="detail-result" key={result.title}><h3>{result.title}</h3><p>{result.detail}</p></article>)}</div><div className="project-stack" style={{ marginTop: 28 }}>{project.stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div><a className="project-link" href="/#projects">Back to Build Log <ArrowUpRight size={14} /></a></div></section>
    </main>
  );
}
