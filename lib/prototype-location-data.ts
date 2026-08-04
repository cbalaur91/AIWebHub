// PROTOTYPE — issue #12. Throwaway. Do not import from production code.
//
// The proposed reuse mechanism: one typed data object per city, one shared
// template. All three variants in app/prototype/location-page consume THIS
// object unchanged, which is the point — if a variant needs a field the others
// don't, the contract is wrong.
//
// Every factual field here traces to lib/portfolio-data.ts or a live site.
// No ratings, no review counts, no outcome percentages. See map Notes.

export interface LocationClient {
  name: string
  city: string
  county: string
  /** What was built. Present tense, checkable against the live site. */
  work: string
  /** /portfolio/<slug> */
  slug: string
  url: string
}

export interface LocationFaq {
  q: string
  a: string
}

export interface LocationIndustry {
  label: string
  /** The real project that earns the claim. Empty string = we can't claim it. */
  evidence: string
}

export interface LocationPageData {
  /** URL segment. Shape decision is open — see the ticket. */
  slug: string
  city: string
  /** How locals name the region: "Metro Detroit", "the Ann Arbor area". */
  metro: string
  state: string
  h1: string
  /** One paragraph under the H1. Also the meta description seed. */
  intro: string
  /**
   * Clients we can honestly attach to this page. Detroit has four. Ann Arbor
   * has zero — the template has to degrade without lying, which is the whole
   * reason this field is an array and not a required block.
   */
  clients: LocationClient[]
  /** Shown when clients is empty: the honest wider-region framing. */
  proofFallback?: string
  counties: { name: string; places: string[] }[]
  industries: LocationIndustry[]
  faqs: LocationFaq[]
}

const banquetHall: LocationClient = {
  name: 'Romanian Banquet Hall',
  city: 'Warren',
  county: 'Macomb County',
  work: 'Mobile-first venue site with an event gallery and a booking inquiry form built into the page flow.',
  slug: 'romanian-banquet-hall',
  url: 'https://www.romanianbanquethall.com/',
}

const salinair: LocationClient = {
  name: 'Salinair Salt Room & Wellness Spa',
  city: 'Rochester Hills',
  county: 'Oakland County',
  work: 'Six-service wellness site with Arketa booking integration and local business structured data.',
  slug: 'salinair',
  url: 'https://salinair.com',
}

const divineRetreat: LocationClient = {
  name: 'Divine Retreat Salon',
  city: 'Utica',
  county: 'Macomb County',
  work: 'Multi-page salon and spa site with a full service menu and local SEO built in from the start.',
  slug: 'divine-retreat-salon',
  url: 'https://www.divineretreatsalon.com/',
}

const foodFestival: LocationClient = {
  name: 'Romanian Food Festival',
  city: 'Rochester Hills',
  county: 'Oakland County',
  work: 'Event landing page with menu, schedule and map, structured so organizers can update it without a developer.',
  slug: 'romanian-food-festival',
  url: 'https://www.romanianfoodfestival.org/',
}

export const detroit: LocationPageData = {
  slug: 'detroit',
  city: 'Detroit',
  metro: 'Metro Detroit',
  state: 'Michigan',
  h1: 'Web design in Detroit, built by someone who works here',
  intro:
    'AIWebHub is a web design studio working across Metro Detroit. Four of the businesses on our portfolio are within half an hour of downtown — a banquet hall in Warren, a salon in Utica, a wellness spa and a cultural festival in Rochester Hills. Every one of those sites is live and linked below. Open them and judge the work before you talk to us.',
  clients: [banquetHall, divineRetreat, salinair, foodFestival],
  counties: [
    {
      name: 'Wayne County',
      places: ['Detroit', 'Dearborn', 'Livonia', 'Canton', 'Westland', 'Grosse Pointe'],
    },
    {
      name: 'Oakland County',
      places: ['Rochester Hills', 'Troy', 'Royal Oak', 'Southfield', 'Novi', 'Birmingham'],
    },
    {
      name: 'Macomb County',
      places: ['Warren', 'Utica', 'Sterling Heights', 'Shelby Township', 'Clinton Township'],
    },
  ],
  industries: [
    {
      label: 'Event venues and banquet halls',
      evidence: 'Romanian Banquet Hall, Warren — gallery, inquiry flow, mobile-first build.',
    },
    {
      label: 'Salons, spas and wellness studios',
      evidence:
        'Divine Retreat Salon, Utica and Salinair, Rochester Hills — service menus and online booking.',
    },
    {
      label: 'Festivals and community organizations',
      evidence:
        'Romanian Food Festival, Rochester Hills — schedule and menu the organizers update themselves.',
    },
    {
      label: 'Trades and home services',
      evidence: 'Quality Work Granite — stone fabrication portfolio with a quote request flow.',
    },
  ],
  faqs: [
    {
      q: 'Do you have an office in Detroit?',
      a: 'No storefront. AIWebHub is a Michigan studio that works with businesses across Metro Detroit — Wayne, Oakland and Macomb counties. Meetings happen at your place or on a call. If a physical address matters to you more than the work, that is a fair thing to weigh.',
    },
    {
      q: 'What does a website cost in Detroit?',
      a: 'Small-business websites in the Detroit market generally run from the low four figures for a single-page site to the mid five figures for a large custom build with integrations. Where a specific project lands depends on page count, whether copy and photography exist already, and what has to connect to it — booking, payments, a POS. We quote per project after a short call rather than publishing a tier list, because the tier list is almost always wrong for the business reading it.',
    },
    {
      q: 'How long does a build take?',
      a: 'A focused landing page is usually two to three weeks from kickoff. A multi-page business site with a service menu, gallery and booking integration is typically four to eight weeks. The variable that moves the date most is content — sites wait on copy and photos far more often than they wait on code.',
    },
    {
      q: 'What do you build sites with?',
      a: 'Next.js, React and TypeScript, deployed as static files to a global CDN. That is why aiwebhub.io itself loads in a fraction of a second. The same stack is behind the client sites linked on this page, so you can measure the result rather than take the claim.',
    },
    {
      q: 'Will my site show up on Google?',
      a: 'Every site ships with the technical groundwork: clean titles and descriptions, canonical URLs, structured data, a sitemap, fast Core Web Vitals. That is the floor, not a ranking guarantee. Local visibility in Detroit also depends on a Google Business Profile and consistent listings, which we will walk you through whether or not we do the ongoing work.',
    },
    {
      q: 'Do you work with businesses outside Metro Detroit?',
      a: 'Yes — the portfolio includes work in Chicago and elsewhere. This page exists because most of our client base happens to be within half an hour of Detroit.',
    },
  ],
}

export const annArbor: LocationPageData = {
  slug: 'ann-arbor',
  city: 'Ann Arbor',
  metro: 'the Ann Arbor area',
  state: 'Michigan',
  h1: 'Web design in Ann Arbor',
  intro:
    'AIWebHub is a Southeast Michigan web design studio. We build fast, custom sites for small businesses — venues, salons, wellness studios, trades and community organizations — and we work across Washtenaw and the wider Detroit metro.',
  // Deliberately empty: we have no Washtenaw County client. The template has to
  // handle this without inventing one. This is the finding, not an oversight.
  clients: [],
  proofFallback:
    'We have not built for an Ann Arbor business yet. What we can show you is the work an hour east: four live sites for businesses in Warren, Utica and Rochester Hills, each linked so you can open it and judge it yourself.',
  counties: [
    {
      name: 'Washtenaw County',
      places: ['Ann Arbor', 'Ypsilanti', 'Saline', 'Dexter', 'Chelsea', 'Milan'],
    },
    {
      name: 'Wayne County',
      places: ['Canton', 'Plymouth', 'Northville', 'Livonia'],
    },
  ],
  industries: [
    {
      label: 'Salons, spas and wellness studios',
      evidence:
        'Divine Retreat Salon, Utica and Salinair, Rochester Hills — service menus and online booking.',
    },
    {
      label: 'Event venues and banquet halls',
      evidence: 'Romanian Banquet Hall, Warren — gallery, inquiry flow, mobile-first build.',
    },
    {
      label: 'Trades and home services',
      evidence: 'Quality Work Granite — stone fabrication portfolio with a quote request flow.',
    },
  ],
  faqs: detroit.faqs.slice(2),
}

export const prototypeCities: Record<string, LocationPageData> = {
  detroit,
  'ann-arbor': annArbor,
}
