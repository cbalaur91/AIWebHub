// Location page data — the data/presentation seam decided on issue #12,
// promoted from the prototype's lib/prototype-location-data.ts. One typed
// object per city, consumed by a concrete static route
// (app/web-design-detroit/page.tsx). Deliberately NO [city] dynamic route:
// Detroit is the only location page in scope (Ann Arbor was ruled out on the
// map), so a generic route would be abstraction for one consumer. The seam
// stays because it keeps the copy out of JSX where it can be reviewed as copy,
// and survives the deferred cities if they are ever revived.
//
// Every factual field here traces to lib/portfolio-data.ts or a live client
// site. No ratings, no review counts, no outcome percentages, no AIWebHub
// prices. See the visibility map's standing constraints (issue #6).

export interface LocationClient {
  name: string
  city: string
  county: string
  /** What was built — checkable against the live site and the case study. */
  work: string
  /** /portfolio/<slug> */
  slug: string
  url: string
}

export interface LocationFaq {
  q: string
  a: string
  /** Optional in-page link rendered after the answer (also mirrored in schema text). */
  link?: { href: string; label: string }
}

export interface LocationPageData {
  city: string
  metro: string
  state: string
  h1: string
  /** One paragraph under the H1. Also seeds the meta description. */
  intro: string
  clients: LocationClient[]
  counties: { name: string; places: string[] }[]
  faqs: LocationFaq[]
}

const banquetHall: LocationClient = {
  name: 'Romanian Banquet Hall',
  city: 'Warren',
  county: 'Macomb County',
  work: 'A single-page venue site built in React, with full-width hero imagery, smooth scroll navigation and an animated gallery of past events. The booking inquiry form sits directly in the page flow rather than behind a menu, images lazy-load so the page stays fast on phones, and local business structured data helps the venue surface for event searches across Warren and Metro Detroit.',
  slug: 'romanian-banquet-hall',
  url: 'https://www.romanianbanquethall.com/',
}

const divineRetreat: LocationClient = {
  name: 'Divine Retreat Salon',
  city: 'Utica',
  county: 'Macomb County',
  work: 'A multi-page Next.js site for a salon and spa, with dedicated pages for hair services and massage treatments, a detailed service menu, and booking integrated into the contact page. The design uses generous white space, soft palettes and subtle scroll animations to match the calm of the physical space, with local SEO for Utica and Macomb County built in from the start.',
  slug: 'divine-retreat-salon',
  url: 'https://www.divineretreatsalon.com/',
}

const salinair: LocationClient = {
  name: 'Salinair Salt Room & Wellness Spa',
  city: 'Rochester Hills',
  county: 'Oakland County',
  work: 'A wellness site covering six services — halotherapy, massage, Halo-Reiki, mindfulness meditation, breath and movement classes, and group sessions — with Arketa booking integration so clients schedule directly from the page. An educational section explains how dry salt therapy works, a gallery carries more than a dozen photographs of the salt rooms, and structured data targets Rochester Hills and the wider Oakland County area.',
  slug: 'salinair',
  url: 'https://salinair.com',
}

const foodFestival: LocationClient = {
  name: 'Romanian Food Festival',
  city: 'Rochester Hills',
  county: 'Oakland County',
  work: 'An event landing page in Next.js with a countdown to the next festival, a scrollable menu of traditional Romanian dishes, an entertainment schedule, location details and a newsletter signup. The content structure lets the organizers update dates, menus and schedules for each year themselves, without waiting on a developer.',
  slug: 'romanian-food-festival',
  url: 'https://www.romanianfoodfestival.org/',
}

export const detroit: LocationPageData = {
  city: 'Detroit',
  metro: 'Metro Detroit',
  state: 'Michigan',
  h1: 'Web design in Detroit, built by someone who works here',
  intro:
    'AIWebHub is a web design studio working across Metro Detroit. Four of the businesses in our portfolio are within half an hour of downtown — a banquet hall in Warren, a salon in Utica, a wellness spa and a cultural festival in Rochester Hills. Every one of those sites is live and linked below. Open them on your phone, time the load, try the booking flow — and judge the work before you ever talk to us.',
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
  faqs: [
    {
      q: 'Do you have an office in Detroit?',
      a: 'No storefront. AIWebHub is a Michigan studio that works with businesses across Metro Detroit — Wayne, Oakland and Macomb counties. Meetings happen at your place of business or on a call. If a physical address matters to you more than the work, that is a fair thing to weigh; the four live sites above are our answer to it.',
    },
    {
      q: 'What does a website cost in Detroit?',
      a: 'Small-business websites in the Detroit market generally run from the low four figures for a focused single-page site to the mid five figures for a large custom build with integrations. The two best 2026 industry surveys disagree by design: agencies worldwide quote $1,000–$3,000 for a basic site, while US buyers report paying $6,500–$15,000 for the same tier. Where a specific project lands depends on page count, whether copy and photography already exist, and what has to connect to it — booking, payments, a POS. We built a free website cost calculator that shows both survey ranges side by side, with no email gate. For your own number, we quote per project after a short call, because a published tier list is almost always wrong for the business reading it.',
      link: { href: '/tools/website-cost-calculator', label: 'Open the website cost calculator' },
    },
    {
      q: 'How long does a build take?',
      a: 'A focused landing page is usually two to three weeks from kickoff. A multi-page business site with a service menu, gallery and booking integration is typically four to eight weeks. The variable that moves the date most is content — sites wait on copy and photos far more often than they wait on code. When there is a hard date on the calendar, the way a festival has an opening weekend, we plan the build backward from it and say early whether it is realistic.',
    },
    {
      q: 'What do you build sites with?',
      a: 'Next.js, React and TypeScript, deployed as static files to a global CDN. That is why aiwebhub.io itself loads in a fraction of a second. The same stack is behind the client sites linked on this page, so you can measure the result rather than take the claim.',
    },
    {
      q: 'Will my site show up on Google?',
      a: 'Every site ships with the technical groundwork: clean titles and descriptions, canonical URLs, structured data, a sitemap, fast Core Web Vitals. That is the floor, not a ranking guarantee — anyone who guarantees you a position is selling something else. What we can point to is the pattern in the case studies on this page: client sites surfacing in local results for terms like banquet hall Warren MI, salon Utica MI and salt therapy Rochester Hills. Local visibility in Detroit also depends on your Google Business Profile and consistent listings, which we will walk you through whether or not we do the ongoing work.',
    },
    {
      q: 'Do you work with businesses outside Metro Detroit?',
      a: 'Yes — the portfolio includes work in Chicago and elsewhere, and everything we build works the same whether you are in Sterling Heights or another state. This page exists because most of our client base happens to be within half an hour of Detroit.',
    },
  ],
}
