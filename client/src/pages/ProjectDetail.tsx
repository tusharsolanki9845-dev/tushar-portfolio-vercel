import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { useRoute } from "wouter";

import { projects } from "./Home";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const project = projects.find((entry) => entry.slug === params?.slug);

  if (!project) {
    return (
      <main className="detail-shell">
        <nav className="detail-nav"><div className="wrap detail-nav-inner"><a className="brand" href="/">tushar<span className="brand-accent">.dev</span></a><a className="detail-back" href="/#projects"><ArrowLeft size={15} /> Back to build log</a></div></nav>
        <section className="detail-hero"><div className="wrap"><p className="detail-kicker">Project not found</p><h1 className="detail-title">This case study is not available.</h1><p className="detail-tagline">Return to the Build Log to explore the published project collection.</p></div></section>
      </main>
    );
  }

  return (
    <main className="detail-shell">
      <nav className="detail-nav"><div className="wrap detail-nav-inner"><a className="brand" href="/">tushar<span className="brand-accent">.dev</span></a><a className="detail-back" href="/#projects"><ArrowLeft size={15} /> Back to build log</a></div></nav>
      <section className="detail-hero"><div className="wrap"><p className="detail-kicker">Portfolio case study · release {project.releaseDate}</p><h1 className="detail-title">{project.name}</h1><p className="detail-tagline">{project.tagline}</p></div></section>
      <section className="detail-section"><div className="wrap">
        <article className="detail-summary-grid">
          <div><p className="detail-copy">{project.description}</p><p className="detail-contribution"><b>My contribution:</b> {project.contribution}</p><div className="detail-actions"><a className="project-link" href="/#projects"><ArrowLeft size={14} /> All projects</a>{project.link && <a className="project-link project-link-primary" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} <ExternalLink size={14} /></a>}</div></div>
          <aside className="detail-facts"><span>Release status</span><strong>{project.statusLabel}</strong><span>Speciality</span><strong>{project.speciality}</strong><span>Release date</span><strong>{project.releaseDate}</strong></aside>
        </article>
      </div></section>
      <section className="detail-section"><div className="wrap"><p className="detail-kicker">Evidence</p><h2 className="detail-section-title">What the project delivers</h2><div className="detail-results">{project.results?.map((result) => <article className="detail-result" key={result.title}><h3>{result.title}</h3><p>{result.detail}</p></article>)}</div><div className="project-stack" style={{ marginTop: 28 }}>{project.stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div><a className="project-link" href="/#projects">Back to Build Log <ArrowUpRight size={14} /></a></div></section>
    </main>
  );
}
