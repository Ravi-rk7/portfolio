'use client';

import Link from 'next/link';
import { useRef, type CSSProperties } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Atom,
  Braces,
  Code2,
  Database,
  Hexagon,
  Layers3,
  Radio,
  Server,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { Github } from '@/components/github-icon';
import { projects, type Project } from '@/lib/projects';
import { SiteHeader, SiteFooter } from '@/components/site-header';
import {
  MagneticLink,
  PixelField,
  Reveal,
  ScrambleText,
  useMotionPreference,
} from '@/components/motion-system';

const projectVisuals = {
  intervia: {
    image: '/projects/intervia/analytics.webp',
    accent: '#bdfc7e',
    type: 'AI INTERVIEW PLATFORM',
    line: 'Better practice.\nSharper answers.',
    detail:
      'Role-based interviews, AI feedback, and performance reports. The entire practice loop, connected.',
    features: ['AI evaluation', 'Session history', 'PDF reports'],
  },
  tejai: {
    image: '/projects/tejai/dashboard.png',
    accent: '#c6b0ff',
    type: 'AI SKINCARE WELLNESS',
    line: 'Small rituals.\nA clearer picture.',
    detail:
      'Personalized routines, daily check-ins, and saved cosmetic insights in one focused dashboard.',
    features: ['AI routines', 'Daily check-ins', 'Progress history'],
  },
  yappy: {
    image: '/projects/yappy/desktop-dark.webp',
    accent: '#fb8fd2',
    type: 'REAL-TIME CHAT APPLICATION',
    line: 'Every message.\nRight in the moment.',
    detail:
      'Direct and group conversations with presence, image sharing, and the small details that make chat feel alive.',
    features: ['Socket.IO', 'Optimistic updates', '32 themes'],
  },
};

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const visual = projectVisuals[project.id as keyof typeof projectVisuals];
  const { stopped } = useMotionPreference();
  const rotateX = useMotionValue(0),
    rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 22 });
  return (
    <article
      className={'build-card build-' + project.id}
      style={
        {
          '--project-accent': visual.accent,
          '--card-index': index,
        } as CSSProperties
      }
    >
      <div className="build-topline">
        <span className="mono">
          <span className="small-square" /> BUILD_{project.number}
        </span>
        <span className="mono">{visual.type}</span>
        <span className="build-corner" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="build-body">
        <div className="build-copy">
          <h3>
            <Link href={'/work/' + project.id}>
              <ScrambleText text={project.name.toUpperCase()} />
            </Link>
          </h3>
          <p className="build-pitch">
            {visual.line.split('\n').map((line, i) => (
              <span key={line}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </p>
          <p className="build-description">{visual.detail}</p>
          <div className="build-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <Link className="build-link" href={'/work/' + project.id}>
            Explore the build <ArrowUpRight size={19} />
          </Link>
        </div>
        <Link
          className="build-visual"
          href={'/work/' + project.id}
          aria-label={'Explore the ' + project.name + ' case study'}
          onPointerMove={(event) => {
            if (stopped || event.pointerType !== 'mouse') return;
            const rect = event.currentTarget.getBoundingClientRect();
            rotateX.set(
              (-(event.clientY - rect.top - rect.height / 2) / rect.height) * 7,
            );
            rotateY.set(
              ((event.clientX - rect.left - rect.width / 2) / rect.width) * 8,
            );
          }}
          onPointerLeave={() => {
            rotateX.set(0);
            rotateY.set(0);
          }}
        >
          <div className="visual-grid" aria-hidden="true" />
          <motion.div
            className="project-window"
            style={{
              rotateX: stopped ? 0 : springX,
              rotateY: stopped ? 0 : springY,
            }}
          >
            <div className="window-bar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>{project.name.toLowerCase()} / interface</span>
              <span>↗</span>
            </div>
            <img
              src={visual.image}
              alt={project.alt}
              loading="lazy"
              width={1600}
              height={1000}
            />
          </motion.div>
          <div className="preview-stamp">
            <span className="live-dot" />
            <span className="preview-long">REAL INTERFACE /</span>
            <span>SAMPLE DATA</span>
          </div>
          <span className="visual-open">
            <ArrowUpRight size={27} />
          </span>
        </Link>
      </div>
      <div className="build-bottom">
        <span className="mono">THE DETAILS</span>
        <div>
          {visual.features.map((feature) => (
            <span key={feature}>
              <span>+</span>
              {feature}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

const stack = [
  { name: 'React', icon: Atom, accent: '#70d9ff' },
  { name: 'Next.js', icon: Layers3, accent: '#efede8' },
  { name: 'TypeScript', icon: Braces, accent: '#81b6f9' },
  { name: 'Node.js', icon: Hexagon, accent: '#9ece86' },
  { name: 'MongoDB', icon: Database, accent: '#78c999' },
  { name: 'Socket.IO', icon: Radio, accent: '#d3b3ff' },
  { name: 'Tailwind', icon: Workflow, accent: '#6ed8e8' },
  { name: 'Git', icon: Code2, accent: '#ff9279' },
];

export function PortfolioHome() {
  const heroRef = useRef<HTMLElement>(null);
  const { stopped } = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  return (
    <>
      <SiteHeader home />
      <main id="main" className="portfolio-shell">
        <section
          className="identity-panel"
          ref={heroRef}
          aria-labelledby="hero-title"
        >
          <PixelField />
          <div className="hero-light" aria-hidden="true" />
          <div className="identity-topline mono">
            <span>
              PERSONAL PORTFOLIO <span className="dim">/ 2026</span>
            </span>
            <span className="hero-coordinates">
              IDEAS → INTERFACES → SYSTEMS
            </span>
            <span className="edition-tag">VOL. 02</span>
          </div>
          <motion.div
            className="identity-body"
            style={{
              y: stopped ? 0 : heroY,
              opacity: stopped ? 1 : heroOpacity,
            }}
          >
            <div className="identity-title">
              <p className="mono">
                <span className="live-dot" /> HELLO, WORLD. I’M
              </p>
              <h1 id="hero-title">
                <span className="name-line">
                  <ScrambleText text="RAVI" onMount />
                </span>
                <span className="name-line">
                  <ScrambleText text="KIRAN" onMount />
                  <span className="name-period">.</span>
                </span>
              </h1>
            </div>
            <div className="identity-aside">
              <div className="role-label mono">
                <Terminal size={18} />
                <span>
                  SOFTWARE
                  <br />
                  DEVELOPER<span className="terminal-caret">_</span>
                </span>
              </div>
              <p>
                I turn complex problems into web experiences that feel
                effortless.
              </p>
              <p className="hero-specialty">
                Full-stack applications.
                <br />
                AI-powered workflows.
                <br />A thing for the details.
              </p>
              <MagneticLink href="#work" className="primary-link">
                Dive into my work <ArrowDown size={18} />
              </MagneticLink>
            </div>
          </motion.div>
          <div className="identity-bottom mono">
            <span>
              BASED IN INDIA <span className="dim">/ BUILDING FOR THE WEB</span>
            </span>
            <span className="scroll-cue">
              <span className="scroll-track">
                <i />
              </span>{' '}
              SCROLL TO DISCOVER
            </span>
          </div>
        </section>

        <div className="focus-strip">
          <span className="mono">ACROSS THE STACK</span>
          <div>
            <span>
              <Code2 size={17} /> Frontend craft
            </span>
            <span>
              <Server size={17} /> Backend logic
            </span>
            <span>
              <Sparkles size={17} /> Applied AI
            </span>
            <span>
              <Radio size={17} /> Real-time systems
            </span>
          </div>
          <span className="focus-cross" aria-hidden="true">
            +
          </span>
        </div>

        <section
          id="work"
          className="work-section"
          aria-labelledby="work-title"
        >
          <Reveal className="section-heading">
            <div>
              <p className="mono section-kicker">01 / SELECTED BUILDS</p>
              <h2 id="work-title" className="pixel-heading">
                LESS TALK.
                <br />
                <span className="muted-heading">MORE SHIPPED.</span>
              </h2>
            </div>
            <div className="heading-aside">
              <span className="section-count">[03]</span>
              <p>
                Three projects. Real interfaces.
                <br />
                Every layer, connected.
              </p>
            </div>
          </Reveal>
          <div className="project-stack">
            {projects.map((project, index) => (
              <ProjectPanel project={project} index={index} key={project.id} />
            ))}
          </div>
        </section>

        <section
          className="stack-section"
          id="stack"
          aria-labelledby="stack-title"
        >
          <Reveal className="stack-heading">
            <div>
              <p className="mono section-kicker">02 / THE TOOLKIT</p>
              <h2 id="stack-title" className="pixel-heading">
                STACK IN MOTION<span className="accent">.</span>
              </h2>
            </div>
            <p className="mono">THE TOOLS BEHIND THE WORK</p>
          </Reveal>
          <div className="stack-marquee">
            <div className="stack-track">
              {[0, 1].map((copy) => (
                <div
                  className="stack-copy"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {stack.map((tool) => (
                    <div
                      className="tech-tile"
                      key={tool.name}
                      style={{ '--tech-color': tool.accent } as CSSProperties}
                    >
                      <tool.icon strokeWidth={1.3} />
                      <span>{tool.name}</span>
                      <span className="tech-cross" aria-hidden="true">
                        +
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="stack-caption mono">
            CHOSEN FOR THE PROBLEM. CONNECTED WITH INTENT.
          </p>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <Reveal className="section-heading">
            <div>
              <p className="mono section-kicker">
                03 / THE PERSON AT THE KEYBOARD
              </p>
              <h2 id="about-title" className="pixel-heading">
                CURIOUS MIND.
                <br />
                <span className="muted-heading">BUILDER AT HEART.</span>
              </h2>
            </div>
            <div className="about-symbol" aria-hidden="true">
              <Braces strokeWidth={1} />
            </div>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-terminal">
              <div className="terminal-top">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="mono">ravi / about.ts</span>
                <Terminal size={15} />
              </div>
              <div className="terminal-code mono">
                <div>
                  <span className="line-number">01</span>
                  <span>
                    <b>const</b> developer = {'{'}
                  </span>
                </div>
                <div>
                  <span className="line-number">02</span>
                  <span>
                    {' '}
                    name: <em>"Ravikiran Tandale"</em>,
                  </span>
                </div>
                <div>
                  <span className="line-number">03</span>
                  <span>
                    {' '}
                    focus: <em>"Full-stack engineering"</em>,
                  </span>
                </div>
                <div>
                  <span className="line-number">04</span>
                  <span> approach: [</span>
                </div>
                <div>
                  <span className="line-number">05</span>
                  <span>
                    {' '}
                    <em>"Stay curious"</em>,
                  </span>
                </div>
                <div>
                  <span className="line-number">06</span>
                  <span>
                    {' '}
                    <em>"Build it properly"</em>,
                  </span>
                </div>
                <div>
                  <span className="line-number">07</span>
                  <span>
                    {' '}
                    <em>"Make it feel right"</em>
                  </span>
                </div>
                <div>
                  <span className="line-number">08</span>
                  <span> ]</span>
                </div>
                <div>
                  <span className="line-number">09</span>
                  <span>{'}'};</span>
                </div>
              </div>
              <div className="terminal-footer mono">
                <span>
                  <span className="live-dot" /> ALWAYS LEARNING
                </span>
                <span>UTF-8</span>
              </div>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <h3>
                I like knowing how
                <br />
                the whole thing works.
              </h3>
              <p>
                I’m Ravi, a software developer working across interfaces, APIs,
                and the systems that connect them.
              </p>
              <p>
                That curiosity has led me to build interview practice with AI,
                real-time conversations, and everyday routines. I care about the
                architecture underneath and the experience someone actually gets
                to use.
              </p>
              <MagneticLink
                href="https://github.com/Ravi-rk7"
                className="text-link"
                external
              >
                Follow the work on GitHub <ArrowUpRight size={18} />
              </MagneticLink>
            </Reveal>
          </div>
        </section>

        <section
          className="engineering-section"
          aria-label="How I approach software"
        >
          <Reveal className="engineering-label">
            <span className="mono">HOW I BUILD</span>
            <ArrowRight size={25} />
          </Reveal>
          <div className="principle-list">
            {[
              {
                number: '01',
                icon: Layers3,
                title: 'Think in systems.',
                text: 'Connect the interface, the API, and the data into a coherent product.',
              },
              {
                number: '02',
                icon: Zap,
                title: 'Make it respond.',
                text: 'Keep feedback clear, interactions immediate, and the user in control.',
              },
              {
                number: '03',
                icon: Braces,
                title: 'Care about the edges.',
                text: 'Loading states, failed requests, small screens. They’re part of the experience.',
              },
            ].map((principle) => (
              <Reveal className="principle" key={principle.number}>
                <span className="mono">{principle.number}</span>
                <principle.icon size={24} strokeWidth={1.4} />
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="contact-panel"
          aria-labelledby="contact-title"
        >
          <div className="contact-light" aria-hidden="true" />
          <div className="contact-topline mono">
            <span>04 / OPEN A NEW CONNECTION</span>
            <span className="contact-plus">+</span>
          </div>
          <Reveal>
            <p className="contact-intro">
              An interesting problem? A team building something good?
            </p>
            <h2 id="contact-title" className="pixel-heading">
              LET’S MAKE
              <br />
              IT <span className="contact-outline">HAPPEN.</span>
              <ArrowUpRight aria-hidden="true" />
            </h2>
          </Reveal>
          <div className="contact-bottom">
            <p>Explore the code. Follow what’s next.</p>
            <MagneticLink
              href="https://github.com/Ravi-rk7"
              className="primary-link contact-link"
              external
            >
              <Github size={19} /> Find me on GitHub <ArrowUpRight size={18} />
            </MagneticLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
