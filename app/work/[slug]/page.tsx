import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ArrowDown, Play } from 'lucide-react';
import { projects } from '@/lib/projects';
import { SiteHeader, SiteFooter } from '@/components/site-header';
import { ProjectGallery } from '@/components/project-gallery';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.name,
    description: project.overview,
    openGraph: {
      title: `${project.name} — Ravi Kiran`,
      description: project.overview,
      images: [],
    },
    twitter: {
      title: `${project.name} — Ravi Kiran`,
      description: project.overview,
      images: [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main id="main" className={`case-study case-${project.id}`}>
        <section className="case-hero wrap">
          <Link className="text-link back-link" href="/#work">
            <ArrowLeft size={16} /> All projects
          </Link>
          <p className="eyebrow case-category">
            {project.number} / {project.category}
          </p>
          <h1>
            {project.name}
            <span className="brand-dot">.</span>
          </h1>
          <div className="case-intro">
            <h2>{project.headline}</h2>
            <p>{project.overview}</p>
          </div>
          <div className="case-meta">
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="case-actions">
              <a
                href={project.video ? '#demo' : '#interface'}
                className="text-link"
              >
                {project.video ? (
                  <>
                    <Play size={15} /> Watch walkthrough
                  </>
                ) : (
                  <>
                    Explore the interface <ArrowDown size={16} />
                  </>
                )}
              </a>
              {project.repository && (
                <a
                  href={project.repository}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
          <img
            className="case-cover"
            src={project.image}
            alt={project.alt}
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </section>
        <section className="case-story wrap" aria-labelledby="challenge-title">
          <p className="eyebrow">THE THINKING</p>
          <div>
            <h2 id="challenge-title">Start with the problem.</h2>
            <p>{project.challenge}</p>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
        </section>
        <section
          className="case-interface"
          id="interface"
          aria-labelledby="interface-title"
        >
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow section-kicker">UP CLOSE</p>
                <h2 id="interface-title">Inside the experience.</h2>
              </div>
              <p className="section-aside">
                A closer look at the actual interface.
              </p>
            </div>
            <ProjectGallery
              images={project.gallery}
              name={project.name}
              portrait={project.id === 'tejai'}
            />
          </div>
        </section>
        <section
          className="case-engineering wrap"
          aria-labelledby="engineering-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow section-kicker">UNDER THE SURFACE</p>
              <h2 id="engineering-title">The details that matter.</h2>
            </div>
          </div>
          <div className="engineering-grid">
            {project.details.map((detail, index) => (
              <article key={detail.title}>
                <span className="eyebrow">0{index + 1}</span>
                <h3>{detail.title}</h3>
                <p>{detail.body}</p>
              </article>
            ))}
          </div>
        </section>
        {project.video && (
          <section
            className="case-demo wrap"
            id="demo"
            aria-labelledby="demo-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow section-kicker">SEE IT IN MOTION</p>
                <h2 id="demo-title">Take a quick tour.</h2>
              </div>
            </div>
            <video
              controls
              playsInline
              preload="none"
              poster={project.image}
              width={1920}
              height={1080}
              aria-label={`${project.name} walkthrough with on-screen feature descriptions`}
            >
              <source src={project.video} type="video/mp4" />
              {project.captions && (
                <track
                  kind="captions"
                  src={project.captions}
                  srcLang="en"
                  label="English"
                />
              )}
              <a href={project.video}>
                Download the {project.name} walkthrough
              </a>
            </video>
            <p className="media-note">
              Silent walkthrough with on-screen feature descriptions.{' '}
              <a href={project.video} download>
                Download video <ArrowDown size={13} />
              </a>
            </p>
          </section>
        )}
        <aside className="case-disclosure wrap">
          <p className="eyebrow">ABOUT THE DEMO</p>
          <p>{project.disclosure}</p>
        </aside>
        <section className="next-project">
          <div className="wrap">
            <p className="eyebrow">UP NEXT / {next.category}</p>
            <Link href={`/work/${next.id}`}>
              <h2>
                {next.name}
                <span>↗</span>
              </h2>
              <p>{next.description}</p>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
