import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  Code2,
  Layers3,
  MoveUpRight,
} from 'lucide-react';
import { projects } from '@/lib/projects';
import { SiteHeader, SiteFooter } from '@/components/site-header';

export default function Home() {
  return (
    <>
      <SiteHeader home />
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-topline">
            <p className="eyebrow">
              <span className="status-dot" /> RAVI KIRAN / FULL-STACK DEVELOPER
            </p>
            <p className="eyebrow hero-edition">
              INDEPENDENT MIND. HANDS-ON BUILDER.
            </p>
          </div>
          <h1 id="hero-title">
            Built with logic.
            <br />
            Made to <span className="serif-word">feel.</span>
            <span className="hero-period" aria-hidden="true">
              ✳
            </span>
          </h1>
          <div className="hero-bottom">
            <a className="round-link" href="#work">
              <span className="round-icon">
                <ArrowDown size={23} strokeWidth={1.5} />
              </span>
              <span>Explore selected work</span>
            </a>
            <p className="hero-description">
              I’m Ravi. I build full-stack web experiences with thoughtful
              interfaces and the engineering to back them up.
            </p>
          </div>
          <div className="hero-index">
            <span>DESIGN SENSE. DEVELOPER DNA.</span>
            <span>
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </span>
          </div>
        </section>
        <section
          className="work-section wrap"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow section-kicker">01 / THE WORK</p>
              <h2 id="work-title">
                Ideas, made real<span className="brand-dot">.</span>
              </h2>
            </div>
            <p className="section-aside">
              Three projects. Different problems.
              <br />
              The same attention to detail.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card ${index === 0 ? 'project-featured' : ''}`}
                key={project.id}
              >
                <Link
                  className={`project-image project-${project.id}`}
                  href={`/work/${project.id}`}
                  aria-label={`Explore ${project.name}`}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={1920}
                    height={1080}
                    loading="lazy"
                  />
                  <span className="project-open">
                    <ArrowUpRight size={24} />
                  </span>
                </Link>
                <div className="project-info">
                  <div className="project-info-main">
                    <div className="project-name">
                      <span className="project-number">{project.number}</span>
                      <h3>
                        <Link href={`/work/${project.id}`}>{project.name}</Link>
                      </h3>
                      <span className="project-category">
                        {project.category}
                      </span>
                    </div>
                    <p>{project.description}</p>
                  </div>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="media-note">
            Real application interfaces. Demonstrations use illustrative data.
          </p>
        </section>
        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="wrap about-grid">
            <div>
              <p className="eyebrow section-kicker">02 / BEHIND THE BUILD</p>
              <div className="about-mark" aria-hidden="true">
                <Asterisk strokeWidth={1} />
              </div>
              <p className="about-caption">
                A little curiosity.
                <br />A lot of care.
              </p>
            </div>
            <div className="about-content">
              <h2 id="about-title">
                I care how it works.
                <br />
                And how it <span className="serif-word">feels.</span>
              </h2>
              <p>
                I’m Ravi Kiran, a developer who likes connecting the dots
                between an idea, an interface, and the systems underneath.
              </p>
              <p>
                My work spans AI-powered workflows, real-time communication, and
                everyday digital routines. I enjoy taking a messy problem and
                turning it into something clear, useful, and satisfying to use.
              </p>
              <div className="capabilities">
                <div>
                  <Code2 size={22} />
                  <h3>End to end</h3>
                  <p>
                    From the first screen to the API and the data behind it.
                  </p>
                </div>
                <div>
                  <Layers3 size={22} />
                  <h3>Details included</h3>
                  <p>
                    Responsive layouts, clear feedback, and considered
                    interactions.
                  </p>
                </div>
              </div>
              <a
                className="text-link"
                href="https://github.com/Ravi-rk7"
                target="_blank"
                rel="noopener noreferrer"
              >
                More of my work on GitHub <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="stack-section wrap" aria-label="Tools I build with">
          <p className="eyebrow">IN THE TOOLKIT</p>
          <div className="stack-list">
            {[
              'React',
              'Next.js',
              'Node.js',
              'Express',
              'MongoDB',
              'Socket.IO',
              'Tailwind CSS',
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="wrap">
            <div className="contact-top">
              <p className="eyebrow">03 / WHAT’S NEXT?</p>
              <p>GOOD THINGS START WITH A CONVERSATION.</p>
            </div>
            <a
              href="https://github.com/Ravi-rk7"
              className="contact-title-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 id="contact-title">
                Let’s build
                <br />
                something <span className="serif-word">good.</span>
              </h2>
              <MoveUpRight strokeWidth={1} aria-hidden="true" />
            </a>
            <div className="contact-bottom">
              <p>Have a look around. Follow along. Say hello.</p>
              <a
                className="text-link"
                href="https://github.com/Ravi-rk7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find me on GitHub <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
