export type ProjectImage = { src: string; alt: string; caption: string };
export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  headline: string;
  overview: string;
  challenge: string;
  approach: string;
  details: { title: string; body: string }[];
  gallery: ProjectImage[];
  disclosure: string;
  repository?: string;
  video?: string;
  captions?: string;
};

export const projects: Project[] = [
  {
    id: 'intervia',
    number: '01',
    name: 'Intervia',
    category: 'AI INTERVIEW PRACTICE',
    description: 'A little less guesswork. A lot more preparation.',
    image: '/projects/intervia/intervia-cover.webp',
    alt: 'Intervia interview analytics dashboard with illustrative scores and performance feedback.',
    tags: ['React', 'Express', 'MongoDB', 'OpenRouter'],
    headline: 'Practice with purpose.',
    overview:
      'An interview preparation app that connects role-based questions, timed practice, and actionable feedback in one focused workflow.',
    challenge:
      'Question lists are a starting point, but they leave a gap between knowing a topic and putting an answer into words. The challenge was to connect structured practice with a useful review of each response.',
    approach:
      'A five-question session gives practice a clear beginning and end. Candidates set their role, experience, and interview mode, work through progressively harder questions, then review question-level feedback and an overall report.',
    details: [
      {
        title: 'A connected AI workflow',
        body: 'OpenRouter handles resume context extraction, question generation, and answer evaluation. The React client coordinates those asynchronous requests with the timed interview state.',
      },
      {
        title: 'Feedback worth revisiting',
        body: 'Express and MongoDB store session history and individual feedback. Recharts visualizes the report, with a jsPDF export for a portable copy.',
      },
      {
        title: 'More than the happy path',
        body: 'The application includes text input, browser speech recognition where supported, Firebase Google sign-in, cookie-based API sessions, and a credit balance with Razorpay integration.',
      },
    ],
    gallery: [
      {
        src: '/projects/intervia/setup.webp',
        alt: 'Interview setup for a frontend developer with role, experience, mode, and resume options.',
        caption: '01 / Set the context — role, experience, and interview mode.',
      },
      {
        src: '/projects/intervia/interview.webp',
        alt: 'A timed React interview question with a sample typed answer.',
        caption:
          '02 / Focus on the question, with a visible timer and answer input.',
      },
      {
        src: '/projects/intervia/analytics.webp',
        alt: 'A sample interview report with overall score, question scores, and written feedback.',
        caption: '03 / Review the session through scores and written feedback.',
      },
      {
        src: '/projects/intervia/history.webp',
        alt: 'Three illustrative completed interview sessions in the history view.',
        caption: '04 / Return to past sessions and revisit the feedback.',
      },
    ],
    video: '/projects/intervia/demo.mp4',
    captions: '/projects/intervia/demo.vtt',
    repository: 'https://github.com/Ravi-rk7/Intervia',
    disclosure:
      'Actual application UI with deterministic sample data. Authentication, AI responses, history, and voice events are simulated in the walkthrough. The demo shows one answer and a saved report; it does not verify production authentication, payments, speech recognition, AI quality, or hiring outcomes.',
  },
  {
    id: 'tejai',
    number: '02',
    name: 'TejAi',
    category: 'SKINCARE & DAILY ROUTINES',
    description: 'Small daily rituals, thoughtfully connected.',
    image: '/projects/tejai/cover.webp',
    alt: 'TejAi skincare routine dashboards on desktop and mobile with illustrative data.',
    tags: ['Next.js', 'AI routines', 'Progress tracking'],
    headline: 'Make room for a routine.',
    overview:
      'A personal skincare wellness experience that brings morning and night routines, daily check-ins, and saved cosmetic insights into one clear record.',
    challenge:
      'Routines are easy to plan and harder to keep track of. The experience needed to make a daily check-in feel simple, while separating routine consistency from changes in saved cosmetic scores.',
    approach:
      'The dashboard centers the everyday action: record a routine when it is complete. Streaks and a contribution calendar make the record visible, while saved scan metrics live in a separate progress view. Existing routines can be tracked without taking a scan.',
    details: [
      {
        title: 'One small daily interaction',
        body: 'Morning and night have distinct completion controls. One routine keeps a streak going; both make a perfect day. The interface keeps that rule visible and the action easy to reach.',
      },
      {
        title: 'Two records, clearly separated',
        body: 'The consistency calendar records completed routines. The metric history records saved cosmetic scores. Keeping them separate avoids implying that check-ins caused a change in skin.',
      },
      {
        title: 'A routine that travels with you',
        body: 'Responsive dashboard and results views carry the same information between desktop and mobile, with calm color, readable progress summaries, and straightforward navigation.',
      },
    ],
    gallery: [
      {
        src: '/projects/tejai/02-personalized-insights.webp',
        alt: 'TejAi scan results with an illustrative cosmetic Glow Score and focus areas.',
        caption:
          '01 / Personalized cosmetic insights, with illustrative scan data.',
      },
      {
        src: '/projects/tejai/03-your-daily-routine.webp',
        alt: 'Morning and night routine steps in the TejAi interface.',
        caption: '02 / A clear routine for both sides of the day.',
      },
      {
        src: '/projects/tejai/04-daily-checkins.webp',
        alt: 'Two real check-in states showing one routine completed, then both completed.',
        caption: '03 / Daily check-ins — a small action with clear feedback.',
      },
      {
        src: '/projects/tejai/06-consistency-calendar.webp',
        alt: 'A contribution calendar and consistency summaries with illustrative data.',
        caption:
          '04 / An honest record of consistency, including the empty days.',
      },
      {
        src: '/projects/tejai/07-skin-progress.webp',
        alt: 'Saved cosmetic scores plotted over time with ups and downs.',
        caption:
          '05 / Revisit saved cosmetic scores without implying causation.',
      },
    ],
    disclosure:
      'Real application interfaces with illustrative synthetic data. TejAi offers cosmetic wellness guidance, not medical diagnosis. The screenshots do not show customer records or measured outcomes, and routine check-ins do not establish what caused skin changes.',
  },
  {
    id: 'yappy',
    number: '03',
    name: 'Yappy',
    category: 'REAL-TIME MESSAGING',
    description: 'Good conversations deserve a great home.',
    image: '/projects/yappy/yappy-cover.webp',
    alt: 'Yappy chat application showing fictional direct and group conversations.',
    tags: ['React', 'Socket.IO', 'Zustand', 'MongoDB'],
    headline: 'Small details. Better conversations.',
    overview:
      'A full-stack chat app for direct messages, group conversations, and image sharing, with the little cues that make communication feel natural.',
    challenge:
      'A messaging interface is a collection of changing states: who is online, who is typing, which messages arrived, and what has been read. Those states need to feel immediate while staying coordinated.',
    approach:
      'A focused conversation workspace brings a searchable inbox, last-message previews, and unread counts together. The active chat supports typing indicators and delivery states, and the mobile layout switches naturally between the inbox and a single conversation.',
    details: [
      {
        title: 'A conversation that keeps up',
        body: 'Socket.IO events update messages, presence, typing, and delivery states. Zustand stores coordinate authentication, conversations, the selected chat, and message state.',
      },
      {
        title: 'Immediate, with a fallback',
        body: 'Direct messages appear optimistically while the API request is pending, with rollback if the request fails. Express and MongoDB provide persistence, with JWT authentication and Cloudinary image uploads.',
      },
      {
        title: 'Personal, on every screen',
        body: 'Group conversations, image sharing, avatar updates, and 32 interface themes make the workspace adaptable. On mobile, a dedicated conversation view keeps the composer close at hand.',
      },
    ],
    gallery: [
      {
        src: '/projects/yappy/desktop-dark.webp',
        alt: 'Yappy desktop inbox and direct chat with fictional messages.',
        caption: '01 / A focused inbox and conversation workspace.',
      },
      {
        src: '/projects/yappy/group-chat.webp',
        alt: 'A fictional group conversation in Yappy.',
        caption: '02 / Keep the whole group in the conversation.',
      },
      {
        src: '/projects/yappy/image-sharing.webp',
        alt: 'Image sharing in a fictional Yappy chat.',
        caption: '03 / Share a little more than words.',
      },
      {
        src: '/projects/yappy/themes.webp',
        alt: 'Yappy theme selector and preview.',
        caption: '04 / A workspace with 32 ways to make it your own.',
      },
    ],
    video: '/projects/yappy/demo.mp4',
    disclosure:
      'Actual application UI with fictional sample conversations. API responses and socket events are simulated in the silent, captioned walkthrough. The mobile overview is a still composition. The media demonstrates the interface, not a live end-to-end backend verification.',
  },
];
