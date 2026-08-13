// Server component. The only client code on this page is the GradientButton
// leaf; the words are all server-rendered, which is what an SEO page needs
// under `output: 'export'` (learned on #12).
//
// The three pillars are written as self-contained passages rather than teasers,
// so that if the deferred sub-page programme is ever authorised each one can be
// lifted onto its own route without a rewrite.

import Link from 'next/link'
import {
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Layers,
  Map,
  PhoneCall,
  Rocket,
  Workflow,
} from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { FaqBlock } from '@/components/FaqBlock'
import { QuoteCta } from '@/components/QuoteCta'
import { abs, SITE_URL } from '@/lib/site'

// Facts about how we work, not claims about the market. Nothing here is a
// turnaround promise or an outcome percentage — see the sourcing rule in
// tasks/lessons.md.
const stats = [
  { value: '3', label: 'Ways to start', icon: Layers },
  { value: 'Quote-only', label: 'No fixed packages', icon: ClipboardCheck },
  { value: 'Your stack', label: 'Tools you already run', icon: Workflow },
]

const pillars = [
  {
    id: 'training',
    eyebrow: 'Education',
    title: 'Training',
    icon: GraduationCap,
    iconColor: 'text-blue-400',
    summary:
      'We teach your team to build and run AI agents on the work they already do — hands on, with your own processes as the exercises.',
    points: [
      'Sessions built around your workflows, not a generic curriculum',
      'Prompting, agent design, and knowing when not to use a model',
      'Written notes and the working examples your team built',
    ],
  },
  {
    id: 'audit',
    eyebrow: 'Assessment',
    title: 'Automation audit',
    icon: ClipboardCheck,
    iconColor: 'text-emerald-400',
    summary:
      'We sit with how your business actually runs, map the work step by step, and hand back a written view of what is worth automating and what is not.',
    points: [
      'Process mapping from the people doing the work',
      'Each candidate task rated for effort, risk and payoff',
      'A written report you own, useful even if you never hire us again',
    ],
  },
  {
    id: 'implementation',
    eyebrow: 'Delivery',
    title: 'Agentic builds',
    icon: Workflow,
    iconColor: 'text-cyan-400',
    summary:
      'We implement the workflow end to end — the agents, the integrations into your existing tools, and the handover so it keeps running without us.',
    points: [
      'Agents wired into the systems you already pay for',
      'A pilot on one process before anything is rolled out widely',
      'Documentation and handover, so the thing is yours',
    ],
  },
]

const process = [
  {
    step: 'A call',
    icon: PhoneCall,
    body: 'Half an hour on what the business does and where the time goes. No preparation needed — the useful answers usually come from describing an ordinary week.',
  },
  {
    step: 'A map',
    icon: Map,
    body: 'We write down how the work actually flows, step by step, including the parts that live in someone’s head. This is the piece most automation projects skip.',
  },
  {
    step: 'A pilot',
    icon: FlaskConical,
    body: 'One process, built and run alongside the manual version, so the comparison is real rather than theoretical before anything is committed to.',
  },
  {
    step: 'A rollout',
    icon: Rocket,
    body: 'What survived the pilot gets extended, documented and handed over, with your team trained to change it themselves.',
  },
]

const consultingFaqs = [
  {
    question: 'Who should attend the training, and what do they need to know already?',
    answer:
      'The training is aimed at the people who do the work, not only at the technical team. Operations managers, customer support leads, finance and admin staff, marketers and owner-operators all get more out of it than a room of developers would, because they are the ones who know which parts of the week are repetitive. No programming background is required. We start from what an AI agent is and is not, move through prompting and how to give a model access to your own information, and finish with each attendee having built something small that touches their real work — a drafting assistant, a triage step, a summariser for a recurring report. Technical teams are welcome and usually get a separate, deeper session covering APIs, tool definitions and evaluation, because their questions are different. Group size matters more than seniority: small enough that everyone builds something rather than watches a demonstration. We run sessions on site or remotely, and we can split them across several shorter blocks if taking a whole team off the floor at once is not realistic.',
  },
  {
    question: 'What do we actually receive at the end of an automation audit?',
    answer:
      'A written report, and the process map it is built on. The map records how the work moves through your business today — who touches what, in which system, in what order, and where things wait. Much of this has never been written down anywhere, which is why the map is often the more valuable half. The report then goes through each candidate task and gives you our view on three things: how much effort automating it would take, what could go wrong if the automation is imperfect, and what you would get back if it worked. Some tasks come back marked as not worth automating, and we say so plainly rather than padding the list. You also get a suggested order of work, because sequencing matters — some automations only make sense once an earlier one exists. The report is yours to keep and act on, including with a different vendor or your own team. We do not gate it behind a follow-on project.',
  },
  {
    question: 'What happens to our data and documents during an engagement?',
    answer:
      'We work on the minimum we need to see. For an audit that is usually conversation and process observation rather than bulk access to your systems, and where we do need examples, redacted or sample records answer the question as well as live ones. Anything you do share stays with the engagement and is not used to train models. When we build, agents run against your accounts and your infrastructure — the connections belong to you, and the credentials stay yours — so when the work is handed over there is nothing of ours sitting in the middle of your operations. If you work in a regulated area, or you have a client contract that restricts where data can go, tell us at the first call rather than later: it changes which models and hosting options are appropriate, and that is a much cheaper conversation to have before anything is built. We are happy to sign a non-disclosure agreement before you describe your processes in detail.',
  },
  {
    question: 'Which AI models and tools do you build on?',
    answer:
      'We are deliberately not tied to one vendor. The right model for a task depends on what the task needs — reasoning depth, speed, cost per run, whether it has to handle images or long documents, and whether the data can leave your environment at all. We pick per workflow and we tell you why, so the reasoning is on the record rather than in our heads. The same applies to everything around the model: we prefer to build into the tools you already pay for and already know how to use, rather than introducing a new platform your team has to learn and you have to keep subscribing to. Where a workflow needs custom code we build it with the same stack we use for our client sites. One thing we hold to regardless of vendor: the workflow should degrade sensibly. If a model is unavailable or returns something unusable, the process should fall back to a human rather than failing silently, and you should be able to see that it happened.',
  },
  {
    question: 'Do we need to finish training or an audit before you build anything?',
    answer:
      'No. The three are separate engagements and you can start at any of them. Some clients already know exactly which process is costing them and want it built, so we go straight to a pilot. Others have a sense that AI should be useful somewhere but no clear candidate, and for them the audit is the honest starting point, because building the wrong workflow well is an expensive way to learn what you needed. Training tends to be worth doing at some stage regardless of where you start, for a practical reason: a team that understands what these tools do will spot the next ten opportunities without needing us in the room, and will also push back sensibly when something is a bad fit. Where clients do run all three, the usual order is audit, then a pilot build on the highest-value candidate, then training as the rollout reaches the wider team. But that is a common shape, not a required path.',
  },
  {
    question: 'How is an AI consulting engagement priced?',
    answer:
      'The same way everything else here is: scoped first, then quoted, with no fixed packages and no published tiers. Training is priced on the format — how many people, how many sessions, on site or remote. An audit is priced on the size of the operation and how many processes are in scope. Build work is priced on the workflow itself, in the same way a website project is. We write down what is included before any number is attached, so you can see what you would be paying for and remove parts of it if the scope is larger than you wanted. Most quotes go out within a day of the first call. We would rather tell you a piece of work is not worth doing than sell it, which is also why the audit is available as a standalone engagement with no obligation to build anything afterwards.',
  },
]

export default function AiConsultingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: consultingFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Consulting - AIWebHub',
    description:
      'AI consulting from AIWebHub — training teams to build AI agents, auditing business processes for automation, and implementing end-to-end agentic workflows.',
    url: abs('/ai-consulting'),
    datePublished: '2026-08-12',
    dateModified: '2026-08-12',
    mainEntity: {
      '@type': 'Organization',
      name: 'AIWebHub',
      url: SITE_URL,
      description:
        'Web design and AI integration studio creating innovative digital solutions for modern businesses',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Consulting',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Training',
              description:
                'Hands-on training that teaches your team to build and run AI agents on their own processes.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Automation Audit',
              description:
                'Process mapping and a written report on which parts of your business are worth automating.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Agentic Workflow Implementation',
              description:
                'End-to-end implementation of AI agent workflows, integrated with the tools you already use.',
            },
          },
        ],
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI Consulting', item: abs('/ai-consulting') },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero — transform-only entrance animations above the fold. An
          opacity-reveal here makes Chrome record no FCP at all (#38). */}
      <section className="relative z-10 sm:p-8 animate-enterScale animation-delay-200 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-0 top-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-enterUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">AI Consulting</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">training, audits and agentic builds</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mt-6 sm:mt-8">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-enterLeft animation-delay-300">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl leading-[1.05] font-light text-zinc-100 tracking-tighter">
              AI consulting for businesses that run on process
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-[48ch]">
              Three ways in. We train your team to build AI agents, we audit how your business
              actually runs and tell you what is worth automating, and we implement the workflows
              end to end. Start at whichever one you need.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: August 2026</p>
            <div className="flex gap-4 mt-6 items-center flex-wrap">
              <GradientButton href="/contact" variant="primary">
                Book a call
              </GradientButton>
              <GradientButton href="#pillars" variant="secondary">
                How it works
              </GradientButton>
            </div>
          </div>

          {/* Right stats */}
          <div className="lg:col-span-5 animate-enterRight animation-delay-400">
            <div className="grid grid-cols-1 gap-4 stagger-animation">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="sm:p-6 hover-lift bg-zinc-900/60 border-white/10 border rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-white/5">
                    <stat.icon className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The three pillars */}
      <section
        id="pillars"
        className="relative z-10 sm:p-8 animate-scaleIn animation-delay-300 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur"
      >
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute right-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tl from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Three ways in</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">train, audit, build</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative mt-8">
          <h2 className="text-[36px] sm:text-5xl md:text-6xl leading-[1.05] font-light text-zinc-100 tracking-tighter animate-fadeInUp animation-delay-200 max-w-[20ch]">
            Teach the team, map the work, or ship the workflow
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-[70ch] animate-fadeInUp animation-delay-300">
            These are separate engagements, not stages of one long programme. Take the one that
            matches where you are.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 stagger-animation">
          {pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 hover-lift hover:border-white/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex p-2.5 rounded-xl bg-white/5">
                  <pillar.icon className={`w-5 h-5 ${pillar.iconColor}`} strokeWidth={1.5} />
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {pillar.eyebrow}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white tracking-tight">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{pillar.summary}</p>
              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                {pillar.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-zinc-400">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* One passage per pillar. Written self-contained so each can be lifted
          onto its own route later without a rewrite. */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-400 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Header */}
        <div className="flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">In detail</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">what each engagement involves</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="mt-8 sm:mt-10 divide-y divide-white/10 border-t border-white/10">
          <div id="training" className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 scroll-mt-24">
            <div className="lg:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tighter">
                Training
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Education &amp; enablement
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                Most teams meet AI as a chat box and a vague instruction to use it more. That
                produces a handful of people quietly drafting emails with it and very little else.
                Training closes the gap between knowing these tools exist and being able to point
                one at a piece of your own work.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                We run the sessions against your processes. The exercises are your intake forms,
                your support queue, your monthly reporting — whatever your team already spends its
                week on. People leave having built something small that works, which is a very
                different outcome from having watched a demonstration. We also spend real time on
                the limits: what a model gets confidently wrong, where a human has to stay in the
                loop, and how to tell the difference before it costs you a customer.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                It works remotely or on site, in one block or split across shorter sessions so you
                are not taking a whole team off the floor at once. You keep the notes and the
                working examples.
              </p>
            </div>
          </div>

          <div id="audit" className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 scroll-mt-24">
            <div className="lg:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tighter">
                Automation audit
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Assessment &amp; process mapping
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                The expensive mistake in automation is not picking a bad tool. It is automating the
                wrong step — building something that works perfectly on a task that never cost you
                much in the first place, while the real bottleneck sits untouched two steps
                upstream.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                So we start by watching how the work actually moves, and by talking to the people
                doing it rather than only the people describing it. We write the process down step
                by step, including the parts that currently live in one person&apos;s head and the
                places where work sits waiting on someone. That map is often the first time a
                business has seen its own operations written out end to end.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                Then we go through the candidates and give you a straight view on each: what it
                would take to automate, what happens if the automation gets it wrong, and what you
                get back if it works. Some come back marked not worth doing, and we say so. You get
                the report and the map to keep, in a form you can act on with us, with someone
                else, or on your own.
              </p>
            </div>
          </div>

          <div
            id="implementation"
            className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 scroll-mt-24"
          >
            <div className="lg:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tighter">
                Agentic builds
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                End-to-end delivery
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                An agent that answers questions in a chat window is a demonstration. A workflow that
                reads the inbound enquiry, pulls the customer&apos;s history, drafts the response,
                books the job in your calendar and tells someone when it is unsure — that is the
                thing worth paying for, and it is mostly integration work rather than model work.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                We build into the systems you already run, so your team is not asked to adopt a new
                platform alongside the five they have. We start with one process as a pilot, run it
                next to the manual version, and compare. If it does not hold up, that is a cheap
                thing to have found out. What survives gets extended, documented and handed over
                with your team trained to change it, because a workflow only one vendor understands
                is a liability rather than an asset.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                We also build for the failure case from the start. When a model is unavailable or
                returns something unusable, the workflow should hand the task back to a person and
                make it visible — not fail quietly and leave you to find out from a customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-500 bg-zinc-950/60 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        {/* Soft radial glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute left-0 bottom-0 w-[60%] h-[80%] rounded-[40%] bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative flex gap-6 sm:px-0 px-1 items-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="text-4xl font-medium text-white">Process</span>
          </span>
          <span aria-hidden="true" role="separator" className="w-px h-10 bg-white/10" />
          <span className="text-sm text-neutral-300">how an engagement runs</span>
        </div>
        <div className="h-px bg-white/10 mt-4 animate-fadeIn animation-delay-100" />

        <div className="relative mt-8 sm:mt-10">
          <h2 className="text-[32px] sm:text-4xl md:text-5xl leading-[1.05] font-light text-zinc-100 tracking-tighter max-w-[22ch]">
            A call, a map, a pilot, a rollout
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 stagger-animation">
            {process.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 hover-lift"
              >
                <span className="inline-flex p-2.5 rounded-xl bg-white/5">
                  <item.icon className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 text-lg font-medium text-white tracking-tight">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-[70ch] text-sm sm:text-base leading-relaxed text-zinc-400">
            The map is the step that gets skipped, and skipping it is why so many automation
            projects produce something impressive that nobody uses. Until the work is written down,
            every conversation about automating it is a conversation about a guess. Once it is
            written down, the argument about what to build first usually settles itself.
          </p>
        </div>
      </section>

      {/* Definition passage — one dense, citable paragraph, the same device used
          on the homepage hero and the Detroit page. */}
      <section className="relative z-10 sm:p-8 animate-scaleIn animation-delay-500 bg-zinc-950/10 w-full max-w-7xl border-white/10 border rounded-3xl mt-24 mx-auto px-6 py-6 backdrop-blur">
        <div className="max-w-[74ch]">
          <h2 className="text-[28px] sm:text-3xl leading-[1.15] font-light text-zinc-100 tracking-tighter">
            What AIWebHub&apos;s AI consulting is
          </h2>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-400">
            AIWebHub is a Michigan-based web design and AI integration studio that also works as an
            AI consultancy. Its consulting practice covers three engagements: training, in which a
            client&apos;s team is taught to build and operate AI agents against their own
            processes; an automation audit, in which AIWebHub maps how a business currently works
            and delivers a written assessment of which tasks are worth automating and which are
            not; and implementation, in which end-to-end agentic workflows are built into the
            client&apos;s existing systems, piloted on a single process, then documented and handed
            over. The three are sold separately and can be taken in any order. AIWebHub does not
            publish price tiers or sell fixed packages — every engagement is scoped in writing and
            quoted individually. The studio was founded in 2024 by Cosmin Balaur and works with
            clients across the United States from Metro Detroit.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="text-sm text-zinc-200 hover:text-white transition-colors duration-200"
            >
              See what we build →
            </Link>
            <Link
              href="/about"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              About the studio →
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock
        eyebrow="FAQ"
        caption="common questions about AI consulting"
        heading="Questions about training, audits and agentic builds"
        items={consultingFaqs}
      />

      <QuoteCta
        heading="Start with a call, not a commitment"
        body="Tell us how the business runs today and which part of the week costs the most. We will come back with a written scope for whichever of the three engagements fits, usually within a day."
        secondary={{ href: '/services', label: 'See what we build' }}
      />
    </>
  )
}
